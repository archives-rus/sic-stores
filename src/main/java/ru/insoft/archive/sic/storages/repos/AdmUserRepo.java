package ru.insoft.archive.sic.storages.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;

public interface AdmUserRepo extends JpaRepository<AdmUser, Long> {

	AdmUser findOneByNameIgnoreCase(String login);
}
