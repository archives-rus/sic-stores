package ru.insoft.archive.sic.storages.domain;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Модель для поиска организации по критериям
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "V_SP_ORG_SEARCH")
public class OrganizationSearch implements Serializable {

	/**
	 * ID названия организации
	 */
	@Id
	@Column(name = "NAME_ID", insertable = false, updatable = false)
	private Long id;

	/**
	 * ID организации
	 */
	@Column(name="ORGANIZATION_ID", insertable = false, updatable = false)
	private Long organizationId;

	/**
	 * организация
	 */
	@JoinColumn(name="ORGANIZATION_ID", insertable = false, updatable = false)
	@ManyToOne
	private Organization organization;

	/**
	 * Полное наименование
	 */
	@Column(name = "FULL_NAME", insertable = false, updatable = false)
	private String fullName;

	/**
	 * ID архива
	 */
	@Column(name = "ARCHIVE_ID", insertable = false, updatable = false)
	private Long archiveId;

	/**
	 * Наименование архива
	 */
	@Column(name = "ARCHIVE_NAME", insertable = false, updatable = false)
	private String archiveName;

	/**
	 * Номер фонда
	 */
	@Column(name = "FUND_NUM", insertable = false, updatable = false)
	private Integer fundNumber;

	/**
	 * Префикс для номера фонда
	 */
	@Column(name = "FUND_PREFIX", insertable = false, updatable = false)
	private String fundPrefix;

	/**
	 * Суффикс для номера фонда
	 */
	@Column(name = "FUND_SUFFIX", insertable = false, updatable = false)
	private String fundSuffix;

	/**
	 * Полный номер фонда: префикс-номер-суффикс
	 */
	@Column(name = "FUND_NUMBER_FULL", insertable = false, updatable = false)
	private String completeFundNumber;

	/**
	 * Годы
	 */
	@Column(name = "YEARS", insertable = false, updatable = false)
	private String years;

	/**
	 * Начальный год для Места хранения документов
	 */
	@Column(name = "START_YEAR", insertable = false, updatable = false)
	private Short beginYear;

	/**
	 * Конечный год для Места хранения документов
	 */
	@Column(name = "END_YEAR", insertable = false, updatable = false)
	private Short endYear;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Long getArchiveId() {
		return archiveId;
	}

	public void setArchiveId(Long archiveId) {
		this.archiveId = archiveId;
	}

	public String getArchiveName() {
		return archiveName;
	}

	public void setArchiveName(String archiveName) {
		this.archiveName = archiveName;
	}

	public Integer getFundNumber() {
		return fundNumber;
	}

	public void setFundNumber(Integer fundNumber) {
		this.fundNumber = fundNumber;
	}

	public String getFundPrefix() {
		return fundPrefix;
	}

	public void setFundPrefix(String fundPrefix) {
		this.fundPrefix = fundPrefix;
	}

	public String getFundSuffix() {
		return fundSuffix;
	}

	public void setFundSuffix(String fundSuffix) {
		this.fundSuffix = fundSuffix;
	}

	public String getCompleteFundNumber() {
		return completeFundNumber;
	}

	public void setCompleteFundNumber(String completeFundNumber) {
		this.completeFundNumber = completeFundNumber;
	}

	public String getYears() {
		return years;
	}

	public void setYears(String years) {
		this.years = years;
	}

	public Short getBeginYear() {
		return beginYear;
	}

	public void setBeginYear(Short beginYear) {
		this.beginYear = beginYear;
	}

	public Short getEndYear() {
		return endYear;
	}

	public void setEndYear(Short endYear) {
		this.endYear = endYear;
	}

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
