package models;

import java.util.ArrayList;

import com.google.gson.Gson;

public class Playlists extends ArrayList<Playlist>
{
	private static final long serialVersionUID = 1L;
	
	public String toJsonString()
	{
		Gson gson = new Gson();
		
		String json = "{ \"playlists\" : [ ";
		for (Playlist playlist : this)
		{
			json += gson.toJson(playlist);
		}
		json += " ] }";
		return json;
	}
}
