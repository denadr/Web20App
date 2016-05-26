package rest.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.ws.rs.POST;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.ResultSet;
//import java.sql.Statement;
//
//import javax.ws.rs.Consumes;
//import javax.ws.rs.POST;
//import javax.ws.rs.Produces;
import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
//import javax.ws.rs.core.MediaType;
//
//import com.google.gson.Gson;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import models.User;

@Path("/DatabaseService")
public class DatabaseService
{
	@POST
	@Path("/dbtest")
	@Produces(MediaType.APPLICATION_JSON)
	public String getDbData()
	{
		try 
		{
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            String url = "jdbc:sqlserver://web20appserver.database.windows.net:1433;database=Web20AppDatabase;user=Web20App@web20appserver;password=Web20Password;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
            Connection connection = DriverManager.getConnection(url);
            Statement statement = connection.createStatement();
            
            ResultSet resultSet = statement.executeQuery("SELECT * FROM [dbo].[User]");
            
            String json = "{ \"user\" : ";
            while (resultSet.next()) 
            {
            	json += (new Gson()).toJson(new User(resultSet.getString("Username"), resultSet.getString("Password"), resultSet.getString("Email")));
            }
            json += " }";
            
            connection.close();
            return json;
        } 
		catch (Exception e) 
		{
            return e.toString();
        }
	}
}
