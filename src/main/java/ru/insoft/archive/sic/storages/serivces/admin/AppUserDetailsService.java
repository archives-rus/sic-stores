package ru.insoft.archive.sic.storages.serivces.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;
import ru.insoft.archive.sic.storages.serivces.CurrentUser;

/**
 * Сервис предоставляет информацию об интересуещем пользователе.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	private AdmUserService service;

	/**
	 * Ищет наличие пользователя в базе данных по логину.
	 *
	 * @param login имя пользователя
	 * @return обертку для работы с данными по пользователю
	 * @throws UsernameNotFoundException если пользователя с таким логином не
	 * существует
	 */
	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		AdmUser user = service.find(login);
		if (user == null) {
			throw new UsernameNotFoundException(
					String.format("Пользователь с именем '%s' не существует", login));
		}
		return new CurrentUser(user);
	}
}
