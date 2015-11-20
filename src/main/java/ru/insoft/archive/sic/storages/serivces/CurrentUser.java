package ru.insoft.archive.sic.storages.serivces;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.insoft.archive.sic.storages.domain.admin.AdmAccessRule;
import ru.insoft.archive.sic.storages.domain.admin.AdmGroup;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;

/**
 * Пользователь, который работает сейчас в системе.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class CurrentUser implements UserDetails {

	private final AdmUser user;
	private final Set<AdmAccessRule> roles;

	public CurrentUser(AdmUser user) {
		this.user = user;
		roles = new HashSet<>();
		for (AdmGroup group : user.getGroups()) {
			roles.addAll(group.getRules());
		}
	}

	/**
	 * Возвращает список ролей пользователя
	 *
	 * @return список ролей пользователя
	 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles;
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

	public AdmUser getUser() {
		return user;
	}

}
