package services;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import dao.Dao;
import data.BloodType;
@Path("/bloodservice")
public class BloodService {

	@Context
	HttpServletResponse response;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getdataforonebloodtype")
	public BloodType getDataForOneBloodType(BloodType blood) {
		if (!blood.getBloodType().equals("")) {
			response.addHeader("Access-Control-Allow-Origin", "*");
			return Dao.getDataForOneBloodTypeFromDatabase(blood.getBloodType());
		} else {
			return null;
		}
	}
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getdataforallbloodtypes")
	public List<BloodType> getDataForAllBloodTypesFromDatabase() {
		response.addHeader("Access-Control-Allow-Origin", "*");
		return Dao.getDataForAllBloodTypesFromDatabase();
	}
}
