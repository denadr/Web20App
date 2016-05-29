package models;

public class Playlist extends DatabaseObject
{
	private int userId;
	private String name;
	
	public Playlist(int id, int userId, String name)
	{
		this.id = id;
		this.userId = userId;
		this.name = name;
	}
	
	public int getUserId()
	{
		return userId;
	}

	public String getName()
	{
		return name;
	}
}
