package models;

import com.google.gson.Gson;

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
	
	@Override
	public String toJsonString()
	{
		return "{ \"playlist\" : " + (new Gson()).toJson(this) + " }";
	}
}
