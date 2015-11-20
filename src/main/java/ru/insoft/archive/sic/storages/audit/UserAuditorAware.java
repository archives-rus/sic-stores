package ru.insoft.archive.sic.storages.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.insoft.archive.sic.storages.serivces.CurrentUser;

/**
 * Возвращает идентификатор пользователя, изменяющего запись
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Component
public class UserAuditorAware implements AuditorAware<Long> {

	@Override
	public Long getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}

		return ((CurrentUser) authentication.getPrincipal()).getUser().getId();
	}

}
