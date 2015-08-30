package ru.insoft.archive.sic.storages.serivces;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.insoft.archive.sic.storages.domain.AdmUser;
import ru.insoft.archive.sic.storages.repos.UserRepository;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Service
public class UserService {

	@Autowired
	private UserRepository ur;

	public List<AdmUser> findAll() {
		return ur.findAll();
	}
}
