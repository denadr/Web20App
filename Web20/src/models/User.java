package models;

public class User extends DatabaseObject
{
	private String username;
//	private String password;
	private String email;
	
	public User(int id, String username, /*String password,*/ String email)
	{
		this.id = id;
		this.username = username; 
//		this.password = password;
		this.email = email;
	}

	public String getUsername()
	{
		return username;
	}

//	public String getPassword()
//	{
//		return password;
//	}

	public String getEmail()
	{
		return email;
	}
}
