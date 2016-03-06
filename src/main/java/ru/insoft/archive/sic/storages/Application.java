package ru.insoft.archive.sic.storages;

import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.h2.tools.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import ru.insoft.archive.sic.storages.domain.DocumentContent;
import ru.insoft.archive.sic.storages.domain.Name;
import ru.insoft.archive.sic.storages.domain.Reward;
import ru.insoft.archive.sic.storages.domain.Trip;
import ru.insoft.archive.sic.storages.utils.ChangedFieldsGetter;

@EnableJpaAuditing(dateTimeProviderRef = "auditDateTimeProvider",
        auditorAwareRef = "userAuditorAware")
@SpringBootApplication
@EnableAsync
@EnableCaching
public class Application {

    public static void main(String[] args) throws SQLException {
        boolean inDevelopment = false;
        if ("development".equals(System.getProperty("spring.profiles.active"))) {
            inDevelopment = true;
        } else {
            for (int i = 0; i < args.length; ++i) {
                if (args[i].equals("--spring.profiles.active=development")) {
                    inDevelopment = true;
                    break;
                }
            }
        }
        if (inDevelopment) {
        // В разработке использую сервер h2, чтобы тестовые данные не 
        // пропадали при перезапуске
            runH2Server();
        }

        SpringApplication.run(Application.class, args);
    }

    @Bean
    public ChangedFieldsGetter changedFieldsGetter() {
        ChangedFieldsGetter getter = new ChangedFieldsGetter();
        getter.addFieldsNames(Name.class, Name.getGettersNames());
        getter.addFieldsNames(Trip.class, Trip.getGettersNames());
        getter.addFieldsNames(Reward.class, Reward.getGettersNames());
        getter.addFieldsNames(DocumentContent.class, DocumentContent.getGettersNames());
        return getter;
    }

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager();
    }

    private static void runH2Server() throws SQLException {
        final Server server = Server.createTcpServer("-tcpAllowOthers", "-tcpPort", "9092");
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    server.start();
                } catch (SQLException ex) {
                    Logger.getLogger(Application.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }).start();
    }
}
