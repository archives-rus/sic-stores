package ru.insoft.archive.sic.storages.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.insoft.archive.sic.storages.domain.Fund;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public interface FundRepo extends JpaRepository<Fund, Long> {

	Fund findOneByArchiveIdAndPrefixAndNumberAndSuffix(Long archiveId,
			String prefix, Integer number, String suffix);
}
