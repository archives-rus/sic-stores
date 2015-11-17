package ru.insoft.archive.sic.storages.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.insoft.archive.sic.storages.domain.Organization;

public interface OrganizationRepo extends JpaRepository<Organization, Long> {

}
