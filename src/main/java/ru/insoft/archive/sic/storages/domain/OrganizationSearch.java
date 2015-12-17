package ru.insoft.archive.sic.storages.domain;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
	@Column(name="PLACE_ID", insertable = false, updatable = false)
	private Long id;

	@OneToOne
	@JoinColumn(name="PLACE_ID", insertable = false, updatable = false)
	private Place place;

	@Column(name="ORGANIZATION_ID", insertable = false, updatable = false)
	private Long organizationId;

	@ManyToOne
	@JoinColumn(name="ORGANIZATION_ID", insertable = false, updatable = false)
	private Organization organization;

	@Column(name="FULL_NAME", insertable = false, updatable = false)
	private String name;

	@Column(name="PLACE", insertable = false, updatable = false)
	private String archive;

	@Column(name="ARCHIVE_ID", insertable = false, updatable = false)
	private Long archiveId;

	@Column(name="LEVEL_ID", insertable = false, updatable = false)
	private Long levelId;

	@Column(name="FUND_PREFIX", insertable = false, updatable = false)
	private String fundPrefix;

	@Column(name="FUND_NUMBER", insertable = false, updatable = false)
	private Integer fundNumber;

	@Column(name="FUND_SUFFIX", insertable = false, updatable = false)
	private String fundSuffix;

	@Column(name="FUNDFULL", insertable = false, updatable = false)
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

	public Integer getFundNumber() {
		return fundNumber;
	}

	public void setFundNumber(Integer fundNumber) {
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

	public Long getArchiveId() {
		return archiveId;
	}

	public void setArchiveId(Long archiveId) {
		this.archiveId = archiveId;
	}

	public Long getLevelId() {
		return levelId;
	}

	public void setLevelId(Long levelId) {
		this.levelId = levelId;
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 41 * hash + Objects.hashCode(this.organizationId);
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
		final OrganizationSearch other = (OrganizationSearch) obj;
		if (!Objects.equals(this.organizationId, other.organizationId)) {
			return false;
		}
		return true;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	}
	
}

