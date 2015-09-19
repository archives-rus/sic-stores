package ru.insoft.archive.sic.storages.serivces.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;
import ru.insoft.archive.sic.storages.repos.AdmUserRepo;

/**
 * Сервис для работы с данными по пользователям системы.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Service
public class AdmUserService {

	@Autowired
	private AdmUserRepo repo;

	/**
	 * Ищет пользователя системы по его учетному имени.
	 *
	 * @param login имя пользователя
	 * @return пользователя либо null
	 */
	public AdmUser find(String login) {
		return repo.findOneByNameIgnoreCase(login);
	}
}
