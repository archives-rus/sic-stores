package ru.insoft.archive.sic.storages.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.insoft.archive.sic.storages.domain.ChangeOperation;

public interface ChangeOperationRepo extends JpaRepository<ChangeOperation, Long> {

}
