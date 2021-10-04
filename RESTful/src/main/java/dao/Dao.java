package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return bloodType;
	}
	
	//Work in progress - Joni
	//Not sure if this is correct
	public static BloodType getDataForAllBloodTypesFromDatabase() {
		BloodType bloodType = new BloodType();
		try {
			Connection conn = Connections.getConnection();
			PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM bloodStatus");
			ResultSet RS = pstmt.executeQuery();
			while (RS.next()) {
				bloodType.setId(RS.getInt(1));
				bloodType.setBloodType(RS.getString(2));
				bloodType.setAmount(RS.getInt(3));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return bloodType;
	}
}
