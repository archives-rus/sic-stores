package ru.insoft.archive.sic.storages.dto;

import com.mysema.query.annotations.QueryProjection;
import java.util.Objects;

/**
 * Объект для передачи найденных данных для организаций, для отображения в
 * таблице
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class TableOrgDto {

	private String organization;
	private String archive;
	private String fund;
	private String years;
	private Long orgId;

	@QueryProjection
	public TableOrgDto(String organization, String archive, String fund, String years,
			Long orgId) {
		this.organization = organization;
		this.archive = archive;
		this.fund = fund;
		this.years = years;
		this.orgId = orgId;
	}

	@QueryProjection
	public TableOrgDto(Long orgId) {
		this.orgId = orgId;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public String getArchive() {
		return archive;
	}

	public void setArchive(String archive) {
		this.archive = archive;
	}

	public String getFund() {
		return fund;
	}

	public void setFund(String fund) {
		this.fund = fund;
	}

	public String getYears() {
		return years;
	}

	public void setYears(String years) {
		this.years = years;
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 83 * hash + Objects.hashCode(this.orgId);
		return hash;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final TableOrgDto other = (TableOrgDto) obj;
		if (!Objects.equals(this.orgId, other.orgId)) {
			return false;
		}
		return true;
	}

}
