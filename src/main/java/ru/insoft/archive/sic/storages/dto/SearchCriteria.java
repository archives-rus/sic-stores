package ru.insoft.archive.sic.storages.dto;

/**
 * Критерии поиска получаемые от клиента
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class SearchCriteria {

	/**
	 * Год с
	 */
	private Integer startYear;
	/**
	 * Год по
	 */
	private Integer endYear;
	/**
	 * Наименование организации
	 */
	private String org;
	/**
	 * Вид документов
	 */
	private Long docType;

	/**
	 * Архив
	 */
	private Long archive;
	/**
	 * № Фонда - префикс
	 */
	private String prefix;
	/**
	 * № Фонда - номер
	 */
	private Integer number;
	/**
	 * № Фонда - суффикс
	 */
	private String suffix;

	public Integer getStartYear() {
		return startYear;
	}

	public void setStartYear(Integer startYear) {
		this.startYear = startYear;
	}

	public Integer getEndYear() {
		return endYear;
	}

	public void setEndYear(Integer endYear) {
		this.endYear = endYear;
	}

	public String getOrg() {
		if (org != null) {
			return '%' + org + '%';
		}
		return org;
	}

	public void setOrg(String org) {
		this.org = org;
	}

	public Long getDocType() {
		return docType;
	}

	public void setDocType(Long docType) {
		this.docType = docType;
	}

	public Long getArchive() {
		return archive;
	}

	public void setArchive(Long archive) {
		this.archive = archive;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

}
