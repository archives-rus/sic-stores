package ru.insoft.archive.sic.storages.dto;

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

	public TableOrgDto(String organization, String archive, String fund, String years) {
		this.organization = organization;
		this.archive = archive;
		this.fund = fund;
		this.years = years;
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

	
}
