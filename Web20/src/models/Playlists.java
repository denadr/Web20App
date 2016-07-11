package models;

import java.util.ArrayList;

import com.google.gson.Gson;

public class Playlists extends ArrayList<Playlist>
{
	private static final long serialVersionUID = 1L;
	
	public String toJsonString()
	{
		Gson gson = new Gson();
		int elements = this.size();
		
		String json = "{ \"playlists\" : [ ";
		for (int n = 0; n < elements; n++)
		{
			json += gson.toJson(this.get(n));
			if (n < elements - 1)
			{
				json += ",";
			}
		}
		return json + " ] }";
	}
	
	public String toJsonString(ArrayList<Titles> titlesLists)
	{
		Gson gson = new Gson();
		
		String json = "{ \"playlists\" : [ ";
		for (int n = 0; n < this.size(); n++)
		{
			Playlist playlist = this.get(n);
			json += "{ \"id\" : " + playlist.getId() + 
					", \"userId\" : " + playlist.getUserId() + 
					", \"name\" : \"" + playlist.getName() + "\"" +
					", \"titles\" : [ ";
			Titles titlesList = titlesLists.get(n);
			for (int m = 0; m < titlesList.size(); m++)
			{
				json += gson.toJson(titlesList.get(m));
				if (m < titlesList.size() - 1)
				{
					json += ",";
				}
			}
			json += " ] } ";
			if (n < this.size() - 1)
			{
				json += ",";
			}
		}
		return json + " ] }";
	}
}
