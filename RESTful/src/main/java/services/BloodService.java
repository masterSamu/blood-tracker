package services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import dao.Dao;
import data.BloodType;
@Path("/bloodservice")
public class BloodService {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getdataforonebloodtype")
	public BloodType getDataForOneBloodType(BloodType blood) {
		if (!blood.getBloodType().equals("")) {
			return Dao.getDataForOneBloodTypeFromDatabase(blood.getBloodType());
		} else {
			return null;
		}
	}
	
	//Work in progress - Joni
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getdataforallbloodtypes")
	public List<BloodType> getDataForAllBloodTypesFromDatabase() {
		return Dao.getDataForAllBloodTypesFromDatabase();
	}
}
