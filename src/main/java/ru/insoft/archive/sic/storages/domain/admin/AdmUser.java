package ru.insoft.archive.sic.storages.domain.admin;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "ADM_USER")
public class AdmUser implements Serializable {

	@Id
	@Column(name = "USER_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "LOGIN", insertable = false, updatable = false)
	private String name;

	@Column(name = "PASSWORD", insertable = false, updatable = false)
	private String password;

	@Column(name = "IS_BLOCKED", insertable = false, updatable = false)
	private Boolean blocked;

	@Column(name = "DISPLAYED_NAME", insertable = false, updatable = false)
	private String displayedName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(Boolean blocked) {
		this.blocked = blocked;
	}

	public String getDisplayedName() {
		return displayedName;
	}

	public void setDisplayedName(String displayedName) {
		this.displayedName = displayedName;
	}

	public String allFields() {
		return "AdmUser{" + "id=" + id + ", name=" + name + ", password="
				+ password + ", blocked=" + blocked + ", displaedName="
				+ displayedName + '}';
	}

}
