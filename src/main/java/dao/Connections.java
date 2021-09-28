package dao;

import java.sql.Connection;

import javax.sql.DataSource;

import com.google.appengine.api.utils.SystemProperty;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class Connections {
	private static DataSource pool = null;

	public static Connection getConnection() {
		Connection conn = null;
		if (SystemProperty.environment.value() == SystemProperty.Environment.Value.Production) {
			try {
				conn = Connections.getProductionConnection();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			try {
				conn = Connections.getDevConnection();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return conn;
	}

	public static Connection getProductionConnection() throws Exception {
		if (pool != null) {
			return pool.getConnection();
		}
		HikariConfig config = new HikariConfig();
		config.setJdbcUrl(String.format("jdbc:mysql:///%s", System.getProperty("databasename")));
		config.setUsername(System.getProperty("googleusername"));
		config.setPassword(System.getProperty("googlepassword"));

		config.addDataSourceProperty("socketFactory", System.getProperty("socketfactory"));
		config.addDataSourceProperty("cloudSqlInstance", System.getProperty("cloudsqlinstance"));
		config.addDataSourceProperty("useSSL", System.getProperty("usessl"));

		pool = new HikariDataSource(config);

		Connection conn = null;
		conn = pool.getConnection();
		return conn;
	}

	public static Connection getDevConnection() throws Exception {
		if (pool != null) {
			return (Connection) pool.getConnection();
		}
		HikariConfig config = new HikariConfig();
		config.setDriverClassName(System.getProperty("drivername"));
		config.setJdbcUrl("jdbc:mysql://localhost:3306/" + System.getProperty("databasename") + "?useSSL=false");
		config.setUsername(System.getProperty("localusername"));
		config.setPassword(System.getProperty("localpassword"));

		pool = new HikariDataSource(config);

		Connection conn = null;
		conn = pool.getConnection();
		return conn;
	}
}
