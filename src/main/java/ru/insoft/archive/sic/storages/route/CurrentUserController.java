package ru.insoft.archive.sic.storages.route;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.insoft.archive.sic.storages.serivces.CurrentUser;

/**
 * Возвращает информацию по текущему пользователю
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RestController
public class CurrentUserController {

	@RequestMapping(value = "/userinfo", produces = MediaType.APPLICATION_JSON_VALUE)
	public String getUserInfo() {
		return String.format("{\"fio\": \"%s\"}", ((CurrentUser) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal())
				.getUser().getDisplayedName());
	}

}
