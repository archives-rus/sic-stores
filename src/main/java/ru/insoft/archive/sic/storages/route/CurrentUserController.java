package ru.insoft.archive.sic.storages.route;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;
import ru.insoft.archive.sic.storages.serivces.CurrentUser;

/**
 * Возвращает информацию по текущему пользователю
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RestController
public class CurrentUserController {

	@RequestMapping(value = "/userinfo", produces = MediaType.APPLICATION_JSON_VALUE)
	public AdmUser getUserInfo() {
		return ((CurrentUser) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal())
				.getUser();
	}

}
