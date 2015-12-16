package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

/**
 * общие свойства для сущностей, которые завязаны на Место хранения
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@MappedSuperclass
public abstract class PlaceProperty  implements Serializable {


	/**
	 * ID Места хранения
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
