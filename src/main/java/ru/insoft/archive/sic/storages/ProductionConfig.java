package ru.insoft.archive.sic.storages;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("prod")
public class ProductionConfig {

	@Bean
	public DataSource dataSource(@Value("#{environment.STORAGES_DB_URL?:'jdbc:oracle:thin:@localhost:1521:hawkw'}") String url,
			@Value("#{environment.STORAGES_DB_USER?:'store'}") String username,
			@Value("#{environment.STORAGES_DB_PASSWORD?:'PstoreLace'}") String password,
			@Value("#{environment.STORAGES_DB_DRIVER?:'oracle.jdbc.OracleDriver'}") String driverName) {
		DataSource ds = new DataSource();
		ds.setUrl(url);
		ds.setUsername(username);
		ds.setPassword(password);
		ds.setDriverClassName(driverName);
		return ds;
	}
}
