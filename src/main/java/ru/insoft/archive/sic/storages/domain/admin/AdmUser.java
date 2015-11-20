package ru.insoft.archive.sic.storages.domain.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 * Пользователь системы
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "ADM_USER")
public class AdmUser implements Serializable {

	@JsonIgnore
	@Id
	@Column(name = "USER_ID", insertable = false, updatable = false)
	private Long id;

	@JsonIgnore
	@Column(name = "LOGIN", insertable = false, updatable = false)
	private String name;

	@JsonIgnore
	@Column(name = "PASSWORD", insertable = false, updatable = false)
	private String password;

	@JsonIgnore
	@Column(name = "IS_BLOCKED", insertable = false, updatable = false)
	private Boolean blocked;

	@JsonProperty("fio")
	@Column(name = "DISPLAYED_NAME", insertable = false, updatable = false)
	private String displayedName;

	@JoinTable(name = "ADM_USER_GROUP", joinColumns = @JoinColumn(name = "USER_ID"),
			inverseJoinColumns = @JoinColumn(name="GROUP_ID"))
	@ManyToMany(fetch = FetchType.EAGER)
	List<AdmGroup> groups;

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

	public List<AdmGroup> getGroups() {
		return groups;
	}

	public void setGroups(List<AdmGroup> groups) {
		this.groups = groups;
	}

	public String allFields() {
		return "AdmUser{" + "id=" + id + ", name=" + name + ", password="
				+ password + ", blocked=" + blocked + ", displaedName="
				+ displayedName + '}';
	}

}
