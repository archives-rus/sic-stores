package ru.insoft.archive.sic.storages.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.insoft.archive.sic.storages.domain.AdmUser;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public interface UserRepository extends JpaRepository<AdmUser, Long>{

}
