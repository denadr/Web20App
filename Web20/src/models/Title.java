package models;

public class Title extends DatabaseObject
{
	private String description;
	private String url;
	
	public Title(int id, String description, String url)
	{
		this.id = id;
		this.description = description;
		this.url = url;
	}

	public String getDescription()
	{
		return description;
	}

	public String getUrl()
	{
		return url;
	}
}
