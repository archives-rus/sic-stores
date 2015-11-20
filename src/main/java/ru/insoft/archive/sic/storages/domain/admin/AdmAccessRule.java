package ru.insoft.archive.sic.storages.domain.admin;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.security.core.GrantedAuthority;

/**
 * Право доступа пользователя системы
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "ADM_ACCESS_RULE")
public class AdmAccessRule implements GrantedAuthority, Serializable {

	@Id
	@Column(name = "ACCESS_RULE_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "RULE_CODE", insertable = false, updatable = false)
	private String authority;

	@Override
	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
