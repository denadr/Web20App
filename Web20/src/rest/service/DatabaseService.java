package rest.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import models.Database;
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
	{
		Database database = null;
		String result = "{\"message\":\"";
		try
		{
			database = new Database();
			result += database.register(email, username, password) ? "success" : "failure";
		}
		catch (Exception e) { result += "exception"; } // Don't care, this function will be deleted
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
	{
		Database database = null;
		User user = null;
		try
		{
			database = new Database();
			user = database.login(username, password);
		}
		catch (Exception e) { } // Don't care, this function will be deleted
		finally
		{
			if (database != null)
			{
				database.close();
			}
		}
		return "{ \"user\" : " + (user == null ? "\"failure\"" : (new Gson()).toJson(user)) + " }";
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
		catch (Exception e) 
		{
			// TODO: Detailed error handling
			result += "exception";
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
		String result = "{\"message\":\"";
		try
		{
			database = new Database();
			result += database.addPlaylist(Integer.parseInt(userId), playlistName) ? "success" : "failure"; 
        } 
		catch (Exception e) 
		{
			// TODO: Detailed error handling
			result += "exception";
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
		catch (Exception e) 
		{
			// TODO: Detailed error handling
			result += "exception";
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
		catch (Exception e) 
		{
			// TODO: Detailed error handling
			result = "{\"message\":\"exception\"}";
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
	public String getPlaylist(@PathParam("playlistId") String playlistId)
	{
		Database database = null;
		String result = "{\"message\":\"failure\"}";
		try
		{
			database = new Database();
			result = database.getPlaylist(Integer.parseInt(playlistId)).toJsonString();
        } 
		catch (Exception e) 
		{
			// TODO: Detailed error handling
			result = "{\"message\":\"exception\"}";
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
	
	// ===== Services for Title =====
	
	@GET
	@Path("/title/add/{playlistId}/{description}/{url}")
	@Produces(MediaType.APPLICATION_JSON)
	public String addTitle(@PathParam("playlistId") String playlistId, @PathParam("description") String description, @PathParam("url") String url)
	{
		Database database = null;
		String result = "{\"message\":\"";
		try
		{
			database = new Database();
			result += database.addTitle(Integer.parseInt(playlistId), description, url) ? "success" : "failure"; 
        } 
		catch (Exception e) 
		{
			// TODO: Detailed error handling
			result += "exception";
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
		catch (Exception e) 
		{
			// TODO: Detailed error handling
			result += "exception";
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
