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

/**
 * Состав хранимых документов
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "STRG_DOC_CONTENTS")
public class Document implements Serializable {

	/**
	 * ID коллекции документов
	 */
	@Id
	@SequenceGenerator(name = "seqDocument", sequenceName = "SEQ_STRG_DOC_CONTENTS", allocationSize = 1)
	@GeneratedValue(generator = "seqDocument", strategy = GenerationType.SEQUENCE)
	@Column(name = "DOC_CONTENTS_ID")
	private Long id;

	/**
	 * ID места хранения документов
	 */
	@Column(name = "STRG_PLACE_ORG_ID")
	private Long placeOrgId;

	@JsonIgnore
	@JoinColumn(name = "STRG_PLACE_ORG_ID", insertable = false, updatable = false)
	@ManyToOne
	private Place place;

	/**
	 * Вид документов
	 */
	@Column(name = "DOC_TYPE_ID")
	private Long typeId;
	/**
	 * Даты
	 */
	@Column(name = "DATES")
	private String dates;

	/**
	 * Номера описей
	 */
	@Column(name = "SERIES")
	private String series;

	/**
	 * Количество дел
	 */
	@Column(name = "CASE_COUNT")
	private Long count;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPlaceOrgId() {
		return placeOrgId;
	}

	public void setPlaceOrgId(Long placeOrgId) {
		this.placeOrgId = placeOrgId;
	}

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public String getDates() {
		return dates;
	}

	public void setDates(String dates) {
		this.dates = dates;
	}

	public String getSeries() {
		return series;
	}

	public void setSeries(String series) {
		this.series = series;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	}

}
