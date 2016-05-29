package models;

public class User extends DatabaseObject
{
	private String username;
	private String email;
	
	public User(int id, String username, String email)
	{
		this.id = id;
		this.username = username; 
		this.email = email;
	}

	public String getUsername()
	{
		return username;
	}

	public String getEmail()
	{
		return email;
	}
}
