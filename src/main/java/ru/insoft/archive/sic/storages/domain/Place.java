package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
import ru.insoft.archive.sic.storages.DictCodes;
import ru.insoft.archive.sic.storages.FieldNames;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;
import ru.insoft.archive.sic.storages.repos.DescriptorValueRepo;

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
	@JoinColumn(name = "ARCHIVE_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValue archiveDV;

	/**
	 * Уровень архива (для типа "в архиве")
	 */
	@Column(name = "LEVEL_ID")
	private Long level;

	/**
	 * Уровень архива (для типа "в архиве")
	 */
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "LEVEL_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValue levelDV;

	/**
	 * Адрес архива (для типа "в архиве")
	 */
	@Column(name = "ARCHIVE_ADDRESS")
	private Long adres;

	/**
	 * Адрес архива (для типа "в архиве")
	 */
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "ARCHIVE_ADDRESS", referencedColumnName = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValue adresDV;

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
	 * Телефон (для типа "в архиве")
	 */
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "ARCHIVE_PHONE", referencedColumnName = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValue phoneDV;

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

	public DescriptorValue getLevelDV() {
		return levelDV;
	}

	public void setLevelDV(DescriptorValue levelDV) {
		this.levelDV = levelDV;
	}

	public DescriptorValue getAdresDV() {
		return adresDV;
	}

	public void setAdresDV(DescriptorValue adresDV) {
		this.adresDV = adresDV;
	}

	private String getFullFundNumber() {
		String fullFundNumber = "";
		if (prefix != null) {
			fullFundNumber += prefix + "-";
		}
		fullFundNumber += number;
		if (suffix != null) {
			fullFundNumber += "-" + suffix;
		}
		return fullFundNumber;
	}

	private String getYears() {
		return startYear + "-" + endYear;
	}

	public static List<ChangedField> getChangedFields(Place newOne, Place oldOne, DescriptorValueRepo repo) {
		List<ChangedField> fields = new ArrayList<>();
		if (oldOne == null) {
			DescriptorValue typeDV = repo.findOne(newOne.type);
			fields.add(new ChangedField(FieldNames.STORE_PLACE, typeDV.getFullValue(), ""));
			String typeCode = typeDV.getCode();
			if (typeCode.equals(DictCodes.PLACE_ARCHIVE)) {
				fields.add(new ChangedField(FieldNames.ARCHIVE, repo.findOne(newOne.archive).getFullValue(), ""));
				fields.add(new ChangedField(FieldNames.ARCHIVE_LEVEL, repo.findOne(newOne.level).getFullValue(), ""));
				fields.add(new ChangedField(FieldNames.ARCHIVE_ADDRESS, repo.findOne(newOne.adres).getFullValue(), ""));
				fields.add(new ChangedField(FieldNames.FUND_NUMBER, newOne.getFullFundNumber(), ""));
				if (newOne.phone != null) {
					fields.add(new ChangedField(FieldNames.PHONE, repo.findOne(newOne.phone).getFullValue(), ""));
				}
				fields.add(new ChangedField(FieldNames.FUND_NAME, newOne.fondName, ""));
				if (newOne.email != null) {
					fields.add(new ChangedField(FieldNames.EMAIL, newOne.email, ""));
				}
				if (newOne.shron != null) {
					fields.add(new ChangedField(FieldNames.ARCHIVE_STORE, newOne.shron, ""));
				}
				if (newOne.ucount != null) {
					fields.add(new ChangedField(FieldNames.UNIT_COUNT, newOne.ucount.toString(), ""));
				}
			} else {
				fields.add(new ChangedField(FieldNames.ORG_ADDRESS, newOne.orgAdres, ""));
				if (newOne.orgPhone != null) {
					fields.add(new ChangedField(FieldNames.ORG_PHONE, newOne.orgPhone, ""));
				}
				if (newOne.email != null) {
					fields.add(new ChangedField(FieldNames.ORG_EMAIL, newOne.email, ""));
				}
				if (newOne.archive != null) {
					fields.add(new ChangedField(FieldNames.ARCHIVE_COMPLETE, repo.findOne(newOne.archive).getFullValue(), ""));
				}
			}
			fields.add(new ChangedField(FieldNames.YEARS, newOne.getYears(), ""));
			if (newOne.dopInfo != null) {
				fields.add(new ChangedField(FieldNames.DOCS_CONTENT_ADD_INFO, newOne.dopInfo, ""));
			}
			if (newOne.remark != null) {
				fields.add(new ChangedField(FieldNames.REMARK, newOne.remark, ""));
			}

		} else if (newOne == null) {
			DescriptorValue typeDV = repo.findOne(oldOne.type);
			fields.add(new ChangedField(FieldNames.STORE_PLACE, "", typeDV.getFullValue()));
			String typeCode = typeDV.getCode();
			if (typeCode.equals(DictCodes.PLACE_ARCHIVE)) {
				fields.add(new ChangedField(FieldNames.ARCHIVE, "", oldOne.archiveDV.getFullValue()));
				fields.add(new ChangedField(FieldNames.ARCHIVE_LEVEL, "", oldOne.levelDV.getFullValue()));
				fields.add(new ChangedField(FieldNames.ARCHIVE_ADDRESS, "", oldOne.adresDV.getFullValue()));
				fields.add(new ChangedField(FieldNames.FUND_NUMBER, "", oldOne.getFullFundNumber()));
				if (oldOne.phone != null) {
					fields.add(new ChangedField(FieldNames.PHONE, "", oldOne.phoneDV.getFullValue()));
				}
				fields.add(new ChangedField(FieldNames.FUND_NAME, "", oldOne.fondName));
				if (oldOne.email != null) {
					fields.add(new ChangedField(FieldNames.EMAIL, "", oldOne.email));
				}
				if (oldOne.shron != null) {
					fields.add(new ChangedField(FieldNames.ARCHIVE_STORE, "", oldOne.shron));
				}
				if (oldOne.ucount != null) {
					fields.add(new ChangedField(FieldNames.UNIT_COUNT, "", oldOne.ucount.toString()));
				}
			} else {
				fields.add(new ChangedField(FieldNames.ORG_ADDRESS, "", oldOne.orgAdres));
				if (oldOne.orgPhone != null) {
					fields.add(new ChangedField(FieldNames.ORG_PHONE, "", oldOne.orgPhone));
				}
				if (oldOne.email != null) {
					fields.add(new ChangedField(FieldNames.ORG_EMAIL, "", oldOne.email));
				}
				if (oldOne.archive != null) {
					fields.add(new ChangedField(FieldNames.ARCHIVE_COMPLETE, "", oldOne.archiveDV.getFullValue()));
				}
			}
			fields.add(new ChangedField(FieldNames.YEARS, "", oldOne.getYears()));
			if (oldOne.dopInfo != null) {
				fields.add(new ChangedField(FieldNames.DOCS_CONTENT_ADD_INFO, "", oldOne.dopInfo));
			}
			if (oldOne.remark != null) {
				fields.add(new ChangedField(FieldNames.REMARK, "", oldOne.remark));
			}
		} else if (newOne.type.equals(oldOne.type)) {
			String typeCode = repo.findOne(oldOne.type).getCode();
			if (typeCode.equals(DictCodes.PLACE_ARCHIVE)) {
				if (!newOne.archive.equals(oldOne.archive)) {
					fields.add(new ChangedField(FieldNames.ARCHIVE, repo.findOne(newOne.archive).getFullValue(),
							oldOne.archiveDV.getFullValue()));
				}
				if (!newOne.level.equals(oldOne.level)) {
					fields.add(new ChangedField(FieldNames.ARCHIVE_LEVEL, repo.findOne(newOne.level).getFullValue(),
							oldOne.levelDV.getFullValue()));
				}
				if (!newOne.adres.equals(oldOne.adres)) {
					fields.add(new ChangedField(FieldNames.ARCHIVE_ADDRESS, repo.findOne(newOne.adres).getFullValue(),
							oldOne.adresDV.getFullValue()));
				}
				String newFundNumber = newOne.getFullFundNumber();
				String oldFundNumber = oldOne.getFullFundNumber();
				if (!newFundNumber.equals(oldFundNumber)) {
					fields.add(new ChangedField(FieldNames.FUND_NUMBER, newFundNumber, oldFundNumber));
				}
				if (!Objects.equals(newOne.phone, oldOne.phone)) {
					fields.add(new ChangedField(FieldNames.PHONE, newOne.phone == null ? "" : repo.findOne(newOne.phone).getFullValue(),
							oldOne.phoneDV == null ? "" : oldOne.phoneDV.getFullValue()));
				}
				if (!newOne.fondName.equals(oldOne.fondName)) {
					fields.add(new ChangedField(FieldNames.FUND_NAME, newOne.fondName, oldOne.fondName));
				}

				if (!Objects.equals(newOne.email, oldOne.email)) {
					fields.add(new ChangedField(FieldNames.EMAIL, newOne.email, oldOne.email));
				}

				if (!Objects.equals(newOne.shron, oldOne.shron)) {
					fields.add(new ChangedField(FieldNames.ARCHIVE_STORE, newOne.shron, oldOne.shron));
				}

				if (!Objects.equals(newOne.ucount, oldOne.ucount)) {
					fields.add(new ChangedField(FieldNames.UNIT_COUNT, newOne.ucount == null ? "" : newOne.ucount.toString(),
							oldOne.ucount == null ? "" : oldOne.ucount.toString()));
				}
			} else {
				if (!newOne.orgAdres.equals(oldOne.orgAdres)) {
					fields.add(new ChangedField(FieldNames.ORG_ADDRESS, newOne.orgAdres, oldOne.orgAdres));
				}
				if (!Objects.equals(newOne.orgPhone, oldOne.orgPhone)) {
					fields.add(new ChangedField(FieldNames.ORG_PHONE, newOne.orgPhone == null ? "" : newOne.orgPhone,
							oldOne.orgPhone == null ? "" : oldOne.orgPhone));
				}
				if (!Objects.equals(newOne.email, oldOne.email)) {
					fields.add(new ChangedField(FieldNames.ORG_EMAIL, newOne.email == null ? "" : newOne.email,
							oldOne.email == null ? "" : oldOne.email));
				}
				if (!Objects.equals(newOne.archive, oldOne.archive)) {
					fields.add(new ChangedField(FieldNames.ARCHIVE_COMPLETE, newOne.archive == null ? "" : repo.findOne(newOne.archive).getFullValue(),
							oldOne.archiveDV == null ? "" : oldOne.archiveDV.getFullValue()));
				}
			}
			String newYears = newOne.getYears();
			String oldYears = oldOne.getYears();
			if (!newYears.equals(oldYears)) {
				fields.add(new ChangedField(FieldNames.YEARS, newYears, oldYears));
			}
			if (!Objects.equals(newOne.dopInfo, oldOne.dopInfo)) {
				fields.add(new ChangedField(FieldNames.DOCS_CONTENT_ADD_INFO, newOne.dopInfo, oldOne.dopInfo));
			}
			if (!Objects.equals(newOne.remark, oldOne.remark)) {
				fields.add(new ChangedField(FieldNames.REMARK, newOne.remark, oldOne.remark));
			}
		} else {
			fields.add(new ChangedField(FieldNames.STORE_PLACE, repo.findOne(newOne.type).getFullValue(),
					repo.findOne(oldOne.type).getFullValue()));
		}
		return fields;
	}
}
