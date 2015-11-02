package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Место хранения документов
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "STRG_PLACE_ORG")
public class Place implements Serializable {

	/**
	 * ID места хранения документов
	 */
	@Id
	@SequenceGenerator(name = "seqPlace", sequenceName = "SEQ_STRG_PLACE_ORG", allocationSize = 1)
	@GeneratedValue(generator = "seqPlace", strategy = GenerationType.SEQUENCE)
	@Column(name = "STRG_PLACE_ORG_ID")
	private Long id;

	/**
	 * ID места хранения в архиве
	 */
	@Column(name = "STRG_PLACE_ARCH_ID")
	private Long placeArchid;

	/**
	 * ID организации
	 */
	@NotNull
	@Column(name = "ORGANIZATION_ID", nullable = false)
	private Long orgId;

	@JsonIgnore
	@JoinColumn(name = "ORGANIZATION_ID", referencedColumnName = "ORGANIZATION_ID", insertable = false, updatable = false)
	@ManyToOne
	private Organization organization;

	@JsonIgnore
	@OneToMany(mappedBy = "place")
	private List<Document> documents;

	/**
	 * Название организации
	 */
	@Column(name = "ORG_NAME")
	private String orgName;

	/**
	 * Адрес
	 */
	@Column(name = "ADDRESS")
	private String address;

	/**
	 * Телефон
	 */
	@Column(name = "PHONE_NUMBER")
	private String phone;

	/**
	 * Количество документов
	 */
	@Column(name = "DOCUMENT_COUNT")
	private Long documentsCount;

	/**
	 * Начальный год
	 */
	@Column(name = "BEGIN_YEAR")
	private Short beginYear;

	/**
	 * Конечный год
	 */
	@Column(name = "END_YEAR")
	private Short endYear;

	/**
	 * Состав документов
	 */
	@Column(name = "CONTENTS")
	private String contents;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPlaceArchid() {
		return placeArchid;
	}

	public void setPlaceArchid(Long placeArchid) {
		this.placeArchid = placeArchid;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Long getDocumentsCount() {
		return documentsCount;
	}

	public void setDocumentsCount(Long documentsCount) {
		this.documentsCount = documentsCount;
	}

	public Short getBeginYear() {
		return beginYear;
	}

	public void setBeginYear(Short beginYear) {
		this.beginYear = beginYear;
	}

	public Short getEndYear() {
		return endYear;
	}

	public void setEndYear(Short endYear) {
		this.endYear = endYear;
	}

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}

}
