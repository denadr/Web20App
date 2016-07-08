package models;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Database
{
	private final String sqlServerDriverClass = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	private final String serverUrl = "jdbc:sqlserver://web20appserver.database.windows.net:1433;" + 
												"database=Web20AppDatabase;" + 
												"user=Web20App@web20appserver;" +
												"password=Web20Password;" +
												"encrypt=true;" + 
												"trustServerCertificate=false;" +
												"hostNameInCertificate=*.database.windows.net;" +
												"loginTimeout=30;";
	
	private final String userTable 		      = "[dbo].[User]";
	private final String playlistTable 		  = "[dbo].[Playlist]";
	private final String titleTable 		  = "[dbo].[Title]";
	private final String playlistToTitleTable = "[dbo].[PlaylistToTitle]";
	
	private Connection serverConnection;
	private Statement sqlStatement;
	
	public Database() throws ClassNotFoundException, SQLException
	{
		// Load driver manager class for MSSQL server first!
		Class.forName(sqlServerDriverClass);
		
		// Connect to database server and initialize resources.
		serverConnection = DriverManager.getConnection(serverUrl);
        sqlStatement = serverConnection.createStatement();
	}
	
	public void close()
	{
		if (sqlStatement != null)
		{
			try
			{
				sqlStatement.close();
			}
			catch (SQLException e) { } // Nothing we can do...
		}
		if (serverConnection != null)
		{
			try
			{
				serverConnection.close();
			}
			catch (SQLException e) { } // Nothing we can do...
		}
	}
	
	// ===== Preparation functions for Users =====
	
	public User login(String username, String password) throws SQLException 
	{
        User user = null;

        // Try to get user information (except of password) by requested username and password.
        ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Id, Username, Email, Password FROM %s WHERE Username = '%s'", userTable, username));
        if (results.next())
        { // User with requested username found -> Check password.
        	String savedPassword = results.getString("Password");
        	if (savedPassword.equals(PasswordUtils.encrypt(password, PasswordUtils.getSalt(savedPassword))))
        	{ // Password correct -> Login successful.
        		user = new User(results.getInt("Id"), results.getString("Username"), results.getString("Email"));
        	}
        }
        results.close();
		
        return user;
	}
	
	public boolean register(String email, String username, String password) throws SQLException 
	{
		// Insert new user to user table with requested username, email and password
		// only, if no user with that username or email exists already.
		return 1 == sqlStatement.executeUpdate(String.format(
				"IF NOT EXISTS (SELECT Id FROM %s WHERE Username = '%s' OR Email = '%s') " + 
				"BEGIN " + 
					"INSERT INTO %s (Username, Password, Email) VALUES('%s', '%s', '%s') " +
				"END", 
				userTable, username, email, userTable, username, PasswordUtils.encrypt(password), email));
	}
	
	public boolean deleteUser(int userId) throws SQLException
	{
		// Get all playlistIds corresponding to userId
		ArrayList<Integer> playlistIds = new ArrayList<Integer>(); 
        ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Id FROM %s WHERE User_Id = %d", playlistTable, userId));
        while (results.next())
        {
        	playlistIds.add(results.getInt("Id"));
        }
        results.close();
        
		// Delete all playlists of user from playlist table.
        for (Integer playlistId : playlistIds)
        {
        	deletePlaylist(playlistId);
        }
        
        // Delete user from user table.
        return 1 == sqlStatement.executeUpdate(String.format(
        		"DELETE FROM %s WHERE Id = %d", userTable, userId));
	}
	
	// ===== Preparation functions for Playlist(s) =====

	public boolean addPlaylist(int userId, String playlistName) throws SQLException
	{
		// Insert new playlist for user with the requested playlistName only,
		// if no playlist with that userId and playlistName exists already.
		return 1 == sqlStatement.executeUpdate(String.format(
    			"IF NOT EXISTS (SELECT Id FROM %s WHERE User_Id = %d AND Name = '%s') " +
    			"BEGIN " +
    				"INSERT INTO %s (User_Id, Name) VALUES(%d, '%s') " +
    			"END",
    			playlistTable, userId, playlistName, playlistTable, userId, playlistName));
	}
	
	public boolean deletePlaylist(int playlistId) throws SQLException
	{
		// Get all associated titleIds
		ArrayList<Integer> titleIds = new ArrayList<Integer>();
        ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Title_Id FROM %s WHERE Playlist_Id = %d", playlistToTitleTable, playlistId));
        while (results.next())
        {
        	titleIds.add(results.getInt("Title_Id"));
        }
        results.close();
		
        // Delete associated entries in PlaylistToTitle table.
        for (Integer titleId : titleIds)
        {
        	deleteTitle(playlistId, titleId);
        }
        
		// Delete playlist from playlist table.
		return 1 == sqlStatement.executeUpdate(String.format(
        		"DELETE FROM %s WHERE Id = %d", playlistTable, playlistId));
	}
	
	public Playlists getPlaylists(int userId) throws SQLException
	{
		Playlists playlists = new Playlists();
		
        ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Id, User_Id, Name FROM %s WHERE User_Id = %d", playlistTable, userId));
        while (results.next())
        {
        	playlists.add(new Playlist(results.getInt("Id"), results.getInt("User_Id"), results.getString("Name")));
        }
        results.close();
        
        return playlists;
	}
	
	public Titles getPlaylist(int playlistId) throws SQLException
	{
		ArrayList<Integer> titleIds = new ArrayList<Integer>();
		
        ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Title_Id FROM %s WHERE Playlist_Id = %d", playlistToTitleTable, playlistId));
        while (results.next())
        {
        	titleIds.add(results.getInt("Title_Id"));
        }
        results.close();
        
        return getTitles(titleIds);
	}
	
	// ===== Preparation functions for Title =====
	
	public boolean addTitle(int playlistId, String description, String url) throws SQLException
	{
		// Insert a new title to title table only, if no title with that description and url exists already.
		sqlStatement.executeUpdate(String.format(
    			"IF NOT EXISTS (SELECT Id FROM %s WHERE Description = '%s' AND URL = '%s') " +
    			"BEGIN " +
    				"INSERT INTO %s (Description, URL) VALUES('%s', '%s') " +
    			"END",
    			titleTable, description, url, titleTable, description, url));
        
		// Get the titleId of the title with the requested description and url.
		int titleId = determineTitleId(description, url);
        if (titleId > 0)
        { // Associate the title with the playlist.
        	return addTitle(playlistId, titleId);
        }
        return false;
	}

	private boolean addTitle(int playlistId, int titleId) throws SQLException
	{
		// Insert a new association to the PlaylistToTitle table with the requested 
		// playlistId and titleId only, if no association between them exists already.
		return 1 == sqlStatement.executeUpdate(String.format(
    			"IF NOT EXISTS (SELECT * FROM %s WHERE Playlist_Id = %d AND Title_Id = %d) " +
    			"BEGIN " +
        			"INSERT INTO %s (Playlist_Id, Title_Id) VALUES(%d, %d) " +
    			"END",
    			playlistToTitleTable, playlistId, titleId, playlistToTitleTable, playlistId, titleId));
	}
	
	private int determineTitleId(String description, String url) throws SQLException
	{
		// Get the title table entry with the requested description and url.
		ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Id FROM %s WHERE URL = '%s' AND Description = '%s'", titleTable, url, description));
		
		int id = -1;
		if (results.next())
        { // Set the titleId if an entry with the requested description and url was found.
        	id = results.getInt("Id");
        }
        results.close();
		
        return id;
	}

	public boolean deleteTitle(int playlistId, int titleId) throws SQLException
	{
		// Delete title from playlist by removing the association in the PlaylistToTitle table.
        boolean success = 1 == sqlStatement.executeUpdate(String.format(
        		"DELETE FROM %s WHERE Playlist_Id = %d AND Title_Id = %d", playlistToTitleTable, playlistId, titleId));
        
        // If the title is not associated anymore, we can remove it from the title table, too.
        sqlStatement.executeUpdate(String.format(
        		"IF NOT EXISTS (SELECT * FROM %s WHERE Title_Id = %d) " +
        		"BEGIN " +
        			"DELETE FROM %s WHERE Id = %d " +
        		"END", 
        		playlistToTitleTable, titleId, titleTable, titleId));
        
        return success;
	}
	
	private Titles getTitles(ArrayList<Integer> ids) throws SQLException
	{
		Titles titles = new Titles();
		for (Integer id : ids)
		{
			Title title = getTitle(id); 
			if (title != null)
			{
				titles.add(title);
			}
		}
		return titles;
	}
	
	private Title getTitle(Integer id) throws SQLException
	{
		Title title = null;
		
		ResultSet results = sqlStatement.executeQuery(String.format(
				"SELECT Id, Description, URL FROM %s WHERE Id = %d", titleTable, id));
		if (results.next())
		{
			title = new Title(results.getInt("Id"), results.getString("Description"), results.getString("URL"));
		}
		results.close();
		
		return title;
	}
}
