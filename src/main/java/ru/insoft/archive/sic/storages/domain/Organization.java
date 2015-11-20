package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Calendar;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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

/**
 * Организация
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "STRG_ORGANIZATION")
public class Organization implements Serializable {

	/**
	 * ID организации
	 */
	@Id
	@SequenceGenerator(name = "seqOrganization", sequenceName = "SEQ_STRG_ORGANIZATION", allocationSize = 1)
	@GeneratedValue(generator = "seqOrganization", strategy = GenerationType.SEQUENCE)
	@Column(name = "ORGANIZATION_ID")
	private Long id;

	/**
	 * ID архива TODO: эта информация присутствует в определении фонда, надо
	 * разобраться, и, если ничего не мешает, убрать повторяющиеся данные отсюда
	 */
	@NotNull
	@Column(name = "ARCHIVE_ID")
	private Long archiveId;

	/**
	 * ID фонда
	 */
	@Column(name = "FUND_ID")
	private Long fundId;

	/**
	 * Сведения о загранкомандировках
	 */
	@Column(name = "BUSINESS_TRIPS_INFO")
	private String tripsInfo;

	/**
	 * Сведения о награждениях
	 */
	@Column(name = "REWARDS_INFO")
	private String rewardsInfo;

	/**
	 * Примечание
	 */
	@Column(name = "NOTES")
	private String notes;

	/**
	 * ID пользователя, создавшего запись
	 */
	@NotNull
	@Column(name = "ADD_USER_ID")
	@CreatedBy
	private Long addUserId;

	/**
	 * ID пользователя, обновившего запись
	 */
	@NotNull
	@Column(name = "MOD_USER_ID")
	@LastModifiedBy
	private Long modUserId;

	/**
	 * Дата создания
	 */
	@NotNull
	@Column(name = "INSERT_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Calendar insertDate;

	/**
	 * Дата последнего обновления
	 */
	@NotNull
	@Column(name = "LAST_UPDATE_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Calendar updateDate;

	@JsonIgnore
	@OneToMany(mappedBy = "organization")
	private List<Place> places;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getArchiveId() {
		return archiveId;
	}

	public void setArchiveId(Long archiveId) {
		this.archiveId = archiveId;
	}

	public Long getFundId() {
		return fundId;
	}

	public void setFundId(Long fundId) {
		this.fundId = fundId;
	}

	public String getTripsInfo() {
		return tripsInfo;
	}

	public void setTripsInfo(String tripsInfo) {
		this.tripsInfo = tripsInfo;
	}

	public String getRewardsInfo() {
		return rewardsInfo;
	}

	public void setRewardsInfo(String rewardsInfo) {
		this.rewardsInfo = rewardsInfo;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
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

	public void setPlaces(List<Place> places) {
		this.places = places;
	}

}
