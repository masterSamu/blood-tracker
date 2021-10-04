package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import data.BloodType;

public class Dao {
	
	public static BloodType getDataForOneBloodTypeFromDatabase(String userBloodType) {
		BloodType bloodType = new BloodType();
		try {
			Connection conn = Connections.getConnection();
			PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM bloodStatus WHERE bloodType=?");
			pstmt.setString(1, userBloodType);
			ResultSet RS = pstmt.executeQuery();
			while (RS.next()) {
				bloodType.setId(RS.getInt(1));
				bloodType.setBloodType(RS.getString(2));
				bloodType.setAmount(RS.getInt(3));
			}
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return bloodType;
	}
	
	//Work in progress - Joni
	//Not sure if this is correct
	public static List<BloodType> getDataForAllBloodTypesFromDatabase() {
		List<BloodType> list = new ArrayList<BloodType>();
		try {
			Connection conn = Connections.getConnection();
			PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM bloodStatus");
			ResultSet RS = pstmt.executeQuery();
			
			while (RS.next()) {
				BloodType bloodType = new BloodType();
				bloodType.setId(RS.getInt(1));
				bloodType.setBloodType(RS.getString(2));
				bloodType.setAmount(RS.getInt(3));
				list.add(bloodType);
			}
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}
}
