package rest.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import models.Database;
import models.Playlist;
import models.Playlists;
import models.Titles;
import models.User;

@Path("/DatabaseService")
public class DatabaseService
{
	@GET
	@Path("/dbtest")
	@Produces(MediaType.APPLICATION_JSON)
	public String dbTest()
	{
		try 
		{
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            String url = "jdbc:sqlserver://web20appserver.database.windows.net:1433;database=Web20AppDatabase;user=Web20App@web20appserver;password=Web20Password;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
            Connection connection = DriverManager.getConnection(url);
            Statement statement = connection.createStatement();
            
            ResultSet resultSet = statement.executeQuery("SELECT * FROM [dbo].[User]");
            
            String json = "{ \"testuser\" : ";
            if (resultSet.next()) 
            {
            	json += (new Gson()).toJson(new User(resultSet.getInt("Id"), resultSet.getString("Username"), resultSet.getString("Email")));
            }
            json += " }";
            
            resultSet.close();
            statement.close();
            connection.close();
            
            return json;
        } 
		catch (Exception e)
		{
            return e.toString();
        }
	}
	
	// ===== Services for User =====

	@GET
	@Path("/user/register/{email}/{username}/{password}")
	@Produces(MediaType.APPLICATION_JSON)
	public String register(@PathParam("email") String email, @PathParam("username") String username, @PathParam("password") String password)
	{ // This function will be deleted.
		Database database = null;
		String result = "{\"message\":\"";
		try
		{
			database = new Database();
			result += database.register(email, username, password) ? "success" : "failure";
		}
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{ 
			result += "ClassNotFoundException";
		}
		catch (SQLException e) // Some exception while accessing the SQL database.
		{ 
			result += "SQLException";
		}
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result + "\"}";
	}

	@GET
	@Path("/user/login/{username}/{password}")
	@Produces(MediaType.APPLICATION_JSON)
	public String login(@PathParam("username") String username, @PathParam("password") String password)
	{ // This function will be deleted.
		Database database = null;
		User user = null;
		String result = "{\"message\":\"failed\"}";
		try
		{
			database = new Database();
			user = database.login(username, password);
			if (user != null)
			{
				result = "{ \"user\" : " + (new Gson()).toJson(user) + " }";
			}
		}
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{
			result = "{\"message\":\"ClassNotFoundException\"}";
		}
		catch (SQLException e) // Some exception while accessing the SQL database.
		{
			result = "{\"message\":\"SQLException\"}";
		}
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result;
	}
	
	@GET
	@Path("/user/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteUser(@PathParam("id") String id)
	{
		Database database = null;
		String result = "{\"message\":\"";
		try
		{
			database = new Database();
			result += database.deleteUser(Integer.parseInt(id)) ? "success" : "failure"; 
        } 
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{
			// TODO: Detailed error handling
			result += "ClassNotFoundException";
        } 
		catch (NumberFormatException e) // Parsing of id failed.
		{
			// TODO: Detailed error handling
			result += "NumberFormatException";
        }
		catch (SQLException e) // Some exception while accessing the SQL database.
		{
			// TODO: Detailed error handling
			result += "SQLException";
        }
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result + "\"}";
	}
	
	// ===== Services for Playlist(s) =====

	@GET
	@Path("/playlist/add/{userId}/{playlistName}")
	@Produces(MediaType.APPLICATION_JSON)
	public String addPlaylist(@PathParam("userId") String userId, @PathParam("playlistName") String playlistName)
	{
		Database database = null;
		String result = "{\"playlistId\":";
		try
		{
			database = new Database();
			result += database.addPlaylist(Integer.parseInt(userId), playlistName); 
        } 
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{
			// TODO: Detailed error handling
			result += -1;
        }  
		catch (NumberFormatException e) // Parsing of userId failed.
		{
			// TODO: Detailed error handling
			result += -1;
        } 
		catch (SQLException e) // Some exception while accessing the SQL database.
		{
			// TODO: Detailed error handling
			result += -1;
        }
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result + "}";
	}

	@GET
	@Path("/playlist/delete/{playlistId}")
	@Produces(MediaType.APPLICATION_JSON)
	public String deletePlaylist(@PathParam("playlistId") String playlistId)
	{
		Database database = null;
		String result = "{\"message\":\"";
		try
		{
			database = new Database();
			result += database.deletePlaylist(Integer.parseInt(playlistId)) ? "success" : "failure"; 
        } 
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{
			// TODO: Detailed error handling
			result += "ClassNotFoundException";
        }  
		catch (NumberFormatException e) // Parsing of playlistId failed.
		{
			// TODO: Detailed error handling
			result += "NumberFormatException";
        } 
		catch (SQLException e) // Some exception while accessing the SQL database.
		{
			// TODO: Detailed error handling
			result += "SQLException";
        }
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result + "\"}";
	}

	@GET
	@Path("/playlist/getall/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getPlaylists(@PathParam("userId") String userId)
	{
		Database database = null;
		String result = "{\"message\":\"failure\"}";
		try
		{
			database = new Database();
			result = database.getPlaylists(Integer.parseInt(userId)).toJsonString();
        } 
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{
			// TODO: Detailed error handling
			result = "{\"message\":\"ClassNotFoundException\"}";
        } 
		catch (NumberFormatException e) // Parsing of userId failed.
		{
			// TODO: Detailed error handling
			result = "{\"message\":\"NumberFormatException\"}";
        } 
		catch (SQLException e) // Some exception while accessing the SQL database.
		{
			// TODO: Detailed error handling
			result = "{\"message\":\"SQLException\"}";
        }
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result;
	}
	
	@GET
	@Path("/playlist/get/{playlistId}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getPlaylist(@PathParam("playlistId") String userId)
	{
		Database database = null;
		String result = "{\"message\":\"failure\"}";
		try
		{
			database = new Database();
			Playlists playlists = database.getPlaylists(Integer.parseInt(userId));
			ArrayList<Titles> titlesLists = new ArrayList<Titles>();
			for (Playlist playlist : playlists)
			{
				titlesLists.add(database.getPlaylist(playlist.getId()));
			}
			result = playlists.toJsonString(titlesLists);
        } 
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{
			// TODO: Detailed error handling
			result = "{\"message\":\"ClassNotFoundException\"}";
        } 
		catch (NumberFormatException e) // Parsing of playlistId failed.
		{
			// TODO: Detailed error handling
			result = "{\"message\":\"NumberFormatException\"}";
        }
		catch (SQLException e) // Some exception while accessing the SQL database.
		{
			// TODO: Detailed error handling
			result = "{\"message\":\"SQLException\"}";
        }
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result;
	}

//	@GET
//	@Path("/playlist/get/{playlistId}")
//	@Produces(MediaType.APPLICATION_JSON)
//	public String getPlaylist(@PathParam("playlistId") String playlistId)
//	{
//		Database database = null;
//		String result = "{\"message\":\"failure\"}";
//		try
//		{
//			database = new Database();
//			result = database.getPlaylist(Integer.parseInt(playlistId)).toJsonString();
//        } 
//		catch (ClassNotFoundException e) // Java driver for SQL not found.
//		{
//			// TODO: Detailed error handling
//			result = "{\"message\":\"ClassNotFoundException\"}";
//        } 
//		catch (NumberFormatException e) // Parsing of playlistId failed.
//		{
//			// TODO: Detailed error handling
//			result = "{\"message\":\"NumberFormatException\"}";
//        }
//		catch (SQLException e) // Some exception while accessing the SQL database.
//		{
//			// TODO: Detailed error handling
//			result = "{\"message\":\"SQLException\"}";
//        }
//		finally
//		{
//			if (database != null)
//			{
//				database.close();
//			}
//		}
//		return result;
//	}
	
	// ===== Services for Title =====
	
	@POST
	@Path("/title/add")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addTitle(String jsonString)
	{
		Database database = null;
		String result = "{\"message\":\"";
		try
		{
			JsonObject jsonData = (new JsonParser()).parse(jsonString).getAsJsonObject();
			database = new Database();
			result += database.addTitle(
					jsonData.get("playlistId").getAsInt(), 
					jsonData.get("description").getAsString(), 
					jsonData.get("url").getAsString()) ? "success" : "failure"; 
        } 
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{
			result += "ClassNotFoundException";
        }
		catch (SQLException e) // Some exception while accessing the SQL database.
		{
			// TODO: Detailed error handling
			result += "SQLException";
        }
		catch (Exception e)
		{
			result += "Exception";
        }
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result + "\"}";
}

	@GET
	@Path("/title/delete/{playlistId}/{titleId}")
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteTitle(@PathParam("playlistId") String playlistId, @PathParam("titleId") String titleId)
	{
		Database database = null;
		String result = "{\"message\":\"";
		try
		{
			database = new Database();
			result += database.deleteTitle(Integer.parseInt(playlistId), Integer.parseInt(titleId)) ? "success" : "failure"; 
        } 
		catch (ClassNotFoundException e) // Java driver for SQL not found.
		{
			// TODO: Detailed error handling
			result += "ClassNotFoundException";
        }
		catch (NumberFormatException e) // Parsing of playlistId or titleId failed.
		{
			// TODO: Detailed error handling
			result += "NumberFormatException";
        }
		catch (SQLException e) // Some exception while accessing the SQL database.
		{
			// TODO: Detailed error handling
			result += "SQLException";
        }
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return result + "\"}";
	}
}
