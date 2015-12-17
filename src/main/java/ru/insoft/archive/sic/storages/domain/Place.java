package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;

/**
 * Место хранения
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "SP_PLACE")
public class Place extends OrgProperty {

	/**
	 * ID наименования
	 */
	@Id
	@SequenceGenerator(name = "seqPlace", sequenceName = "SEQ_SP_PLACE", allocationSize = 1)
	@GeneratedValue(generator = "seqPlace", strategy = GenerationType.SEQUENCE)
	@Column(name = "PLACE_ID")
	private Long id;

	/**
	 * Тип места хранения
	 */
	@NotNull
	@Column(name = "TYPE_ID")
	private Long type;

	/**
	 * Архив (для типа "в архиве"). Архив источник комплектования (для типа "в
	 * организации")
	 */
	@Column(name = "ARCHIVE_ID")
	private Long archive;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "ARCHIVE_ID", insertable = false, updatable = false)
	private DescriptorValue archiveDV;

	/**
	 * Уровень архива (для типа "в архиве")
	 */
	@Column(name = "LEVEL_ID")
	private Long level;

	/**
	 * Адрес архива (для типа "в архиве")
	 */
	@Column(name = "ARCHIVE_ADDRESS")
	private Long adres;

	/**
	 * Адрес организации (для типа "в организации")
	 */
	@Column(name = "ORG_ADDRESS")
	private String orgAdres;

	/**
	 * Номер фонда - префикс (для типа "в архиве")
	 */
	@Column(name = "FUND_PREFIX")
	private String prefix;

	/**
	 * Номер фонда - номер (для типа "в архиве")
	 */
	@Column(name = "FUND_NUMBER")
	private Integer number;

	/**
	 * Номер фонда - суффикс (для типа "в архиве")
	 */
	@Column(name = "FUND_SUFFIX")
	private String suffix;

	/**
	 * Телефон (для типа "в архиве")
	 */
	@Column(name = "ARCHIVE_PHONE")
	private Long phone;

	/**
	 * Телефон организации (для типа "в организации")
	 */
	@Column(name = "ORG_PHONE")
	private String orgPhone;

	/**
	 * Название фонда (для типа "в архиве")
	 */
	@Column(name = "FUND_NAME")
	private String fondName;

	/**
	 * Электронная почта
	 */
	@Column(name = "EMAIL")
	private String email;

	/**
	 * Начальный год (для типа "в архиве")
	 */
	@Column(name = "START_YEAR")
	private Short startYear;

	/**
	 * Конечный год (для типа "в архиве")
	 */
	@Column(name = "END_YEAR")
	private Short endYear;

	/**
	 * Архивохранилище (для типа "в архиве")
	 */
	@Column(name = "STORE_ARCHIVE")
	private String shron;

	/**
	 * Количество ед. хр.
	 */
	@Column(name = "UNITS_COUNT")
	private Integer ucount;

	/**
	 * Состав документов
	 */
	@OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("sort")
	private List<DocumentContent> docs = new ArrayList<>();

	/**
	 * Дополнительные сведения о составе документов
	 */
	@Column(name = "ADD_INFO")
	private String dopInfo;

	/**
	 * Примечание
	 */
	@Column(name = "REMARK")
	private String remark;

	/**
	 * Награждения
	 */
	@OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("sort")
	private List<Reward> rewards = new ArrayList<>();

	/**
	 * Загранкомандировки
	 */
	@OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("sort")
	private List<Trip> trips = new ArrayList<>();

	public void addDoc(DocumentContent doc) {
		docs.add(doc);
		doc.setPlace(this);
	}

	public void removeDoc(DocumentContent doc) {
		doc.setPlace(null);
		docs.remove(doc);
	}

	public void addReward(Reward reward) {
		rewards.add(reward);
		reward.setPlace(this);
	}

	public void removeReward(Reward reward) {
		reward.setPlace(null);
		rewards.remove(reward);
	}

	public void addTrip(Trip trip) {
		trips.add(trip);
		trip.setPlace(this);
	}

	public void removeTrip(Trip trip) {
		trip.setPlace(null);
		trips.remove(trip);
	}

	public List<Reward> getRewards() {
		return rewards;
	}

	public List<Trip> getTrips() {
		return trips;
	}

	public void setRewards(List<Reward> rewards) {
		this.rewards = rewards;
	}

	public void setTrips(List<Trip> trips) {
		this.trips = trips;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getType() {
		return type;
	}

	public void setType(Long type) {
		this.type = type;
	}

	public Long getArchive() {
		return archive;
	}

	public void setArchive(Long archive) {
		this.archive = archive;
	}

	public Long getLevel() {
		return level;
	}

	public void setLevel(Long level) {
		this.level = level;
	}

	public Long getAdres() {
		return adres;
	}

	public void setAdres(Long adres) {
		this.adres = adres;
	}

	public String getOrgAdres() {
		return orgAdres;
	}

	public void setOrgAdres(String orgAdres) {
		this.orgAdres = orgAdres;
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

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public String getOrgPhone() {
		return orgPhone;
	}

	public void setOrgPhone(String orgPhone) {
		this.orgPhone = orgPhone;
	}

	public String getFondName() {
		return fondName;
	}

	public void setFondName(String fondName) {
		this.fondName = fondName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getShron() {
		return shron;
	}

	public void setShron(String shron) {
		this.shron = shron;
	}

	public Integer getUcount() {
		return ucount;
	}

	public void setUcount(Integer ucount) {
		this.ucount = ucount;
	}

	public List<DocumentContent> getDocs() {
		return docs;
	}

	public String getDopInfo() {
		return dopInfo;
	}

	public void setDopInfo(String dopInfo) {
		this.dopInfo = dopInfo;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public DescriptorValue getArchiveDV() {
		return archiveDV;
	}

	public void setArchiveDV(DescriptorValue archiveDV) {
		this.archiveDV = archiveDV;
	}
}
