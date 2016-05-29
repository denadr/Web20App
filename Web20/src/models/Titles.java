package models;

import java.util.ArrayList;

import com.google.gson.Gson;

public class Titles extends ArrayList<Title>
{
	private static final long serialVersionUID = 1L;

	public String toJsonString()
	{
		Gson gson = new Gson();
		int elements = this.size();
		
		String json = "{ \"titles\" : [ ";
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
}
