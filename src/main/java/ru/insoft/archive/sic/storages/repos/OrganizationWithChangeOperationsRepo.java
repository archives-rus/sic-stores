package ru.insoft.archive.sic.storages.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.insoft.archive.sic.storages.domain.OrganizationWithChangeOperations;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public interface OrganizationWithChangeOperationsRepo extends JpaRepository<OrganizationWithChangeOperations, Long> {

}
