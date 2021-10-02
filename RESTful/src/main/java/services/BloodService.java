package services;

import java.util.ArrayList;

import java.util.List;

import javax.ws.rs.Consumes;
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
		return Dao.getDataForOneBloodTypeFromDatabase(blood.getId());
	}
	
	
}
