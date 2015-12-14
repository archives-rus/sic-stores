package ru.insoft.archive.sic.storages.domain;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Организация
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "V_SP_ORG_SEARCH")
public class OrganizationSearch implements Serializable {

	@Id
	@Column(name="NAME_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name="ORGANIZATION_ID", insertable = false, updatable = false)
	private Long organizationId;

	@Column(name="ORG_NAME", insertable = false, updatable = false)
	private String name;

	@Column(name="ARCHIVE", insertable = false, updatable = false)
	private String archive;

	@Column(name="FUND_PREFIX", insertable = false, updatable = false)
	private String fundPrefix;

	@Column(name="FUND_NUMBER", insertable = false, updatable = false)
	private String fundNumber;

	@Column(name="FUND_SUFFIX", insertable = false, updatable = false)
	private String fundSuffix;

	@Column(name="FULL_FUND_NUMBER", insertable = false, updatable = false)
	private String fullFundNumber;

	@Column(name="START_YEAR", insertable = false, updatable = false)
	private Short startYear;

	@Column(name="END_YEAR", insertable = false, updatable = false)
	private Short endYear;

	@Column(name="YEARS", insertable = false, updatable = false)
	private String years;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getArchive() {
		return archive;
	}

	public void setArchive(String archive) {
		this.archive = archive;
	}

	public String getFundPrefix() {
		return fundPrefix;
	}

	public void setFundPrefix(String fundPrefix) {
		this.fundPrefix = fundPrefix;
	}

	public String getFundNumber() {
		return fundNumber;
	}

	public void setFundNumber(String fundNumber) {
		this.fundNumber = fundNumber;
	}

	public String getFundSuffix() {
		return fundSuffix;
	}

	public void setFundSuffix(String fundSuffix) {
		this.fundSuffix = fundSuffix;
	}

	public String getFullFundNumber() {
		return fullFundNumber;
	}

	public void setFullFundNumber(String fullFundNumber) {
		this.fullFundNumber = fullFundNumber;
	}

	public Short getStartYear() {
		return startYear;
	}

	public void setStartYear(Short startYear) {
		this.startYear = startYear;
	}

	public Short getEndYear() {
		return endYear;
	}

	public void setEndYear(Short endYear) {
		this.endYear = endYear;
	}

	public String getYears() {
		return years;
	}

	public void setYears(String years) {
		this.years = years;
	}
}
