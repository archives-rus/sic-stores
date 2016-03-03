package ru.insoft.archive.sic.storages;

import java.nio.file.Paths;
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

    public static void main(String[] args) {
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
}
