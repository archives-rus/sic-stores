package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Состав документов
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "SP_DOCUMENT")
public class DocumentContent implements Serializable {

	/**
	 * ID состава документов
	 */
	@Id
	@SequenceGenerator(name = "seqDocument", sequenceName = "SEQ_SP_DOCUMENT", allocationSize = 1)
	@GeneratedValue(generator = "seqDocument", strategy = GenerationType.SEQUENCE)
	@Column(name = "DOCUMENT_ID")
	private Long id;

	/**
	 * ID места хранения
	 */
	@JsonIgnore
	@Column(name = "PLACE_ID", insertable = false, updatable = false)
	Long placeId;

	/**
	 * Место хранения
	 */
	@JsonIgnore
	@NotNull
	@ManyToOne
	@JoinColumn(name = "PLACE_ID", referencedColumnName = "PLACE_ID")
	Place place;

	/**
	 * ID Вид документа 
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
	@NotNull
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPlaceId() {
		return placeId;
	}

	public void setPlaceId(Long placeId) {
		this.placeId = placeId;
	}

	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	}

	
}
