package ru.insoft.archive.sic.storages;

import java.nio.file.Paths;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	private static String serverPort = "8991";
	private static String logFile = Paths.get(System.getProperty("java.io.tmpdir"),
			"ais-storeplaces.log").toAbsolutePath().toString();

	public static void main(String[] args) {

		// Если установлен порт через системную переменную, как правило параметр
		// командной строки, то используем его иначе:
		if (System.getProperty("server.port") == null) {
			// Если установлен порт через переменные среды окружения, то используем его
			String port = System.getenv("STORAGES_PORT");
			try {
				serverPort = Integer.valueOf(port).toString();
			} catch (NumberFormatException e) {
			}
			System.setProperty("server.port", serverPort);
		}

		// Если установлен файл логирования, то используем его.
		// Поумолчанию в spring-boot идет ротация через 10 метров
		String productionLogFile = System.getenv("STORAGES_LOG");
		if (productionLogFile != null) {
			logFile = productionLogFile;
		}
		System.setProperty("logging.file", logFile);

		// Когда разрабатываем, то для запуска используем особое действие: spring-boot:run
		// с дополнительными параметрами для использования особых настроек в файле
		// application-dev.properties.
		// в случае с развертывание используем только профиль 'prod'
		String activeProfile = System.getProperty("spring.profiles.active");
		if (activeProfile != null) {
			activeProfile += ",prod";
		} else {
			activeProfile = "prod";
		}
		System.setProperty("spring.profiles.active", activeProfile);

		SpringApplication.run(Application.class, args);
//		ApplicationContext ctx = SpringApplication.run(Application.class, args);
//		for (AdmUser u : ctx.getBean(UserService.class).findAll()) {
//			System.out.println("found: " + u.allFields());
//		}
	}

}