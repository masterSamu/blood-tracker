package services;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/bloodservice")
public class BloodService {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getdata")
	public List<String> getData() {
		String string1 = "Samu";
		String string2 = "Joni";
		String string3 = "Markus";
		
		List<String> list = new ArrayList<String>();
		list.add(string1);
		list.add(string2);
		list.add(string3);
		return list;
	}
	
	
	
}
