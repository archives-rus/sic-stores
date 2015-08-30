package ru.insoft.archive.sic.storages;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import ru.insoft.archive.sic.storages.domain.AdmUser;
import ru.insoft.archive.sic.storages.serivces.UserService;

@SpringBootApplication
public class Application {

	private static String serverPort = "8991";

	public static void main(String[] args) {

		String port = System.getenv("STORAGES_PORT");
		try {
			serverPort = Integer.valueOf(port).toString();
		} catch (NumberFormatException e) {
		}

		System.setProperty("server.port", serverPort);
		System.setProperty("spring.profiles.active", "prod");
		ApplicationContext ctx = SpringApplication.run(Application.class, args);
		for (AdmUser u : ctx.getBean(UserService.class).findAll()) {
			System.out.println("found: " + u.getId() + ", " + u.getName());
		}
	}

}
