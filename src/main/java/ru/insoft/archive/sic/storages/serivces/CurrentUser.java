package ru.insoft.archive.sic.storages.serivces;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;

/**
 * Пользователь, который работает сейчас в системе.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class CurrentUser implements UserDetails {

	private final AdmUser user;

	public CurrentUser(AdmUser user) {
		this.user = user;
	}

	/**
	 * На данный момент нет распределения по ролям, поэтому возвращаем пустой
	 * список
	 *
	 * @return список ролей пользователя
	 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList();
	}

	/**
	 * Возвращает md5sum пароля пользователя в виде строки нижнего регистра
	 *
	 * @return пароль
	 */
	@Override
	public String getPassword() {
		return user.getPassword().toLowerCase();
	}

	/**
	 * Возвращает логин
	 *
	 * @return логин
	 */
	@Override
	public String getUsername() {
		return user.getName();
	}

	@Override
	public boolean isAccountNonExpired() {
		return !user.isBlocked();
	}

	@Override
	public boolean isAccountNonLocked() {
		return !user.isBlocked();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return !user.isBlocked();
	}

	@Override
	public boolean isEnabled() {
		return !user.isBlocked();
	}

}
