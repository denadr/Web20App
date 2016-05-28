package models;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

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
	//private final String playlistTable 		  = "[dbo].[Playlist]";
	private final String titleTable 		  = "[dbo].[Title]";
	private final String playlistToTitleTable = "[dbo].[PlaylistToTitle]";
	
	private Connection serverConnection;
	private Statement sqlStatement;
	
	public Database() throws Exception
	{
		Class.forName(sqlServerDriverClass);
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
			catch (SQLException e) { }
		}
		if (serverConnection != null)
		{
			try
			{
				serverConnection.close();
			}
			catch (SQLException e) { }
		}
	}
	
	// ===== Preparation functions for Users =====
	
	public User login(String username, String password) throws Exception
	{
        ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Id, Username, Email FROM %s WHERE Username = '%s' AND Password = '%s'", userTable, username, password));
        
        User user = null;
        if (results.next())
        { // Login successful
        	user = new User(results.getInt("Id"), results.getString("Username"), results.getString("Email"));
        }
        
        results.close();
		return user;
	}
	
	public boolean register(String email, String username, String password) throws Exception
	{
        ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Username, Email FROM %s WHERE Username = '%s' OR Email = '%s'", userTable, username, email));
        boolean alreadyExists = results.next();
        results.close();

        if (!alreadyExists)
        {
        	int rowsAdded = sqlStatement.executeUpdate(String.format(
        			"INSERT INTO %s (Username, Password, Email) VALUES('%s', '%s', '%s')", userTable, username, password, email));
        	return rowsAdded == 1;
        }
		return false;
	}
	
	public void deleteUser(int userId) throws Exception
	{
		// TODO: Delete all playlists of user
		CallableStatement sqlCall = serverConnection.prepareCall("{CALL DeleteUser(?)}");
		sqlCall.setInt(1, userId);
		sqlCall.execute();
		sqlCall.close();
//        sqlStatement.executeUpdate(String.format(
//        		"DELETE FROM %s WHERE Id = %s", userTable, userId));
	}
	
	// ===== Preparation functions for Playlist(s) =====

	public boolean addPlaylist(int userId, String playlistName) throws Exception
	{
        ResultSet results = sqlStatement.executeQuery("");
           
        
        
        results.close();
        return true;
	}
	
	public void deletePlaylist(int playlistId) throws Exception
	{
        ResultSet results = sqlStatement.executeQuery("");
           
        
        
        results.close();
	}
	
	public void getPlaylists(int userId) throws Exception
	{
        ResultSet results = sqlStatement.executeQuery("");
           
        
        
        results.close();
	}
	
	public void getPlaylist(int playlistId) throws Exception
	{
        ResultSet results = sqlStatement.executeQuery("");
           
        
        
        results.close();
	}
	
	// ===== Preparation functions for Title =====
	
	private void addTitle(int playlistId, int titleId) throws Exception
	{
		ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT * FROM %s WHERE Playlist_Id = %s AND Title_Id = %s", playlistToTitleTable, playlistId, titleId));
        boolean titleAlreadyExistsInPlaylist = results.next();
        results.close();
           
        if (!titleAlreadyExistsInPlaylist)
        {
        	sqlStatement.executeQuery(String.format(
            		"INSERT INTO %s (Playlist_Id, Title_Id) VALUES(%s, %s)", playlistToTitleTable, playlistId, titleId));
        }
	}

	public void addTitle(int playlistId, String description, String url) throws Exception
	{
        boolean titleAlreadyExists = false;
        int titleId = 0;
        ResultSet results = sqlStatement.executeQuery(String.format(
        		"SELECT Id FROM %s WHERE URL = '%s' AND Description = '%s'", titleTable, url, description));
        if (results.next())
        {
        	titleAlreadyExists = true;
        	titleId = results.getInt("Id");
        }
        results.close();
           
        if (titleAlreadyExists)
        { 
        	addTitle(playlistId, titleId);
        }
        else // A title with the requested description and url doesn't already exist -> add it first
        {
        	sqlStatement.executeUpdate(String.format(
        			"INSERT INTO %s (Description, URL) VALUES('%s', '%s')", titleTable, description, url));
        }
	}
	
	public void deleteTitle(int playlistId, int titleId) throws Exception
	{
		CallableStatement sqlCall = serverConnection.prepareCall("{CALL DeleteTitle(?, ?)}");
		sqlCall.setInt(1, playlistId);
		sqlCall.setInt(2, titleId);
		sqlCall.execute();
		sqlCall.close();
//        sqlStatement.executeUpdate(String.format(
//        		"DELETE FROM %s WHERE Playlist_Id = %s AND Title_Id = %s", playlistToTitleTable, playlistId, titleId));
//        
//        ResultSet results = sqlStatement.executeQuery(String.format(
//        		"SELECT * FROM %s WHERE Title_Id = %s", playlistToTitleTable, titleId));
//        boolean titleStillUsed = results.next();
//        results.close();
//        
//        if (!titleStillUsed)
//        { // No more playlists contain this title -> delete title from title table, too
//        	sqlStatement.executeUpdate(String.format(
//        			"DELETE FROM %s WHERE Id = %s", titleTable, titleId));
//        }
	}
}
