package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

/**
 * общие свойства для сущностей, которые завязаны на организацию
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@MappedSuperclass
public abstract class OrgProperty implements Serializable {

	/**
	 * ID организации
	 */
	@JsonIgnore
	@Column(name = "ORGANIZATION_ID", insertable = false, updatable = false)
	Long organizationId;

	/**
	 * Организация
	 */
	@JsonIgnore
	@NotNull
	@ManyToOne
	@JoinColumn(name = "ORGANIZATION_ID", referencedColumnName = "ORGANIZATION_ID")
	Organization organization;

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}
}
