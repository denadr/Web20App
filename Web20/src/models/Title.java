package models;

import com.google.gson.Gson;

public class Title
{
	private int id;
	private String description;
	private String url;
	
	public Title(int id, String description, String url)
	{
		this.id = id;
		this.description = description;
		this.url = url;
	}

	public int getId()
	{
		return id;
	}

	public String getDescription()
	{
		return description;
	}

	public String getUrl()
	{
		return url;
	}
	
	public String toJsonString()
	{
		return "{ \"title\" : " + (new Gson()).toJson(this) + " }";
	}
}
