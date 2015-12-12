package ru.insoft.archive.sic.storages.domain;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 * Таблицы для состава документов, сведения о награждениях, сведения о
 * загранкомандировках
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@MappedSuperclass
public abstract class Document extends OrgProperty {

	/**
	 * ID Вид документа / Название награды
	 */
	@Column(name = "TYPE_ID")
	Long type;

	/**
	 * Дата начальная
	 */
	@Column(name = "START_DATE")
	Short startDate;

	/**
	 * Дата конечная
	 */
	@Column(name = "END_DATE")
	Short endDate;

	/**
	 * Номер описи
	 */
	@Column(name = "OPIS_NUMBER")
	Integer opisNumber;

	/**
	 * Количество дел
	 */
	@Column(name = "DOCS_COUNT")
	Integer docsCount;

	/**
	 * Порядок сортировки
	 */
	@Column(name = "SORT")
	private Long sort;

	public Short getStartDate() {
		return startDate;
	}

	public void setStartDate(Short startDate) {
		this.startDate = startDate;
	}

	public Short getEndDate() {
		return endDate;
	}

	public void setEndDate(Short endDate) {
		this.endDate = endDate;
	}

	public Integer getOpisNumber() {
		return opisNumber;
	}

	public void setOpisNumber(Integer opisNumber) {
		this.opisNumber = opisNumber;
	}

	public Integer getDocsCount() {
		return docsCount;
	}

	public void setDocsCount(Integer docsCount) {
		this.docsCount = docsCount;
	}

	public Long getType() {
		return type;
	}

	public void setType(Long type) {
		this.type = type;
	}

	public Long getSort() {
		return sort;
	}

	public void setSort(Long sort) {
		this.sort = sort;
	}

}
