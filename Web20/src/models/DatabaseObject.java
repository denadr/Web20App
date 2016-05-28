package models;

public abstract class DatabaseObject
{
	protected int id;
	
	public int getId()
	{
		return id;
	}
	
	public String toJsonString()
	{
		return null;
	}
}
