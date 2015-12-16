package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.insoft.archive.sic.storages.convert.JsonCalendarSerializer;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;

/**
 * Организация
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "SP_ORGANIZATION")
public class Organization implements Serializable {

	/**
	 * ID организации
	 */
	@Id
	@SequenceGenerator(name = "seqOrganization", sequenceName = "SEQ_SP_ORGANIZATION", allocationSize = 1)
	@GeneratedValue(generator = "seqOrganization", strategy = GenerationType.SEQUENCE)
	@Column(name = "ORGANIZATION_ID")
	private Long id;

	/**
	 * ID пользователя, создавшего запись
	 */
	@JsonIgnore
	@NotNull
	@Column(name = "ADD_USER_ID")
	@CreatedBy
	private Long addUserId;

	/**
	 * ID пользователя, обновившего запись
	 */
	@JsonIgnore
	@NotNull
	@Column(name = "MOD_USER_ID")
	@LastModifiedBy
	private Long modUserId;

	@ManyToOne
	@JoinColumn(name = "MOD_USER_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
	private AdmUser user;

	/**
	 * Дата создания
	 */
	@JsonIgnore
	@NotNull
	@Column(name = "INSERT_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Calendar insertDate;

	/**
	 * Дата последнего обновления
	 */
	@JsonSerialize(using = JsonCalendarSerializer.class)
	@NotNull
	@Column(name = "LAST_UPDATE_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Calendar updateDate;

	/**
	 * Места хранения
	 */
	@OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Place> places = new ArrayList<>();

	/**
	 * Наименования и переименования
	 */
	@OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("sort")
	private List<Name> names = new ArrayList<>();


	public void addPlace(Place place) {
		places.add(place);
		place.setOrganization(this);
	}

	public void removePlace(Place place) {
		place.setOrganization(null);
		places.remove(place);
	}

	public void addName(Name name) {
		names.add(name);
		name.setOrganization(this);
	}

	public void removeName(Name name) {
		name.setOrganization(null);
		names.remove(name);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAddUserId() {
		return addUserId;
	}

	public void setAddUserId(Long addUserId) {
		this.addUserId = addUserId;
	}

	public Long getModUserId() {
		return modUserId;
	}

	public void setModUserId(Long modUserId) {
		this.modUserId = modUserId;
	}

	public Calendar getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Calendar insertDate) {
		this.insertDate = insertDate;
	}

	public Calendar getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Calendar updateDate) {
		this.updateDate = updateDate;
	}

	public List<Place> getPlaces() {
		return places;
	}

	public List<Name> getNames() {
		return names;
	}


	public AdmUser getUser() {
		return user;
	}

	public void setUser(AdmUser user) {
		this.user = user;
	}

	public void setPlaces(List<Place> places) {
		this.places = places;
	}

	public void setNames(List<Name> names) {
		this.names = names;
	}
}
