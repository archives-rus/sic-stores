package ru.insoft.archive.sic.storages.domain;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

/**
 * Фонд
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "STRG_FUND", uniqueConstraints
		= @UniqueConstraint(columnNames = {"ARCHIVE_ID", "FUND_NUM", "PREFIX", "SUFFIX"}))
public class Fund implements Serializable {

	/**
	 * ID фонда
	 */
	@Id
	@SequenceGenerator(name = "seqFund", sequenceName = "SEQ_STRG_FUND", allocationSize = 1)
	@GeneratedValue(generator = "seqFund", strategy = GenerationType.SEQUENCE)
	@Column(name = "FUND_ID")
	private Long id;

	/**
	 * ID архива
	 */
	@NotNull
	@Column(name = "ARCHIVE_ID")
	private Long archiveId;

	/**
	 * Номер фонда
	 */
	@NotNull
	@Column(name = "FUND_NUM")
	private Integer number;

	/**
	 * Префикс
	 */
	@Column(name = "PREFIX")
	private String prefix;

	/**
	 * Суффикс
	 */
	@Column(name = "SUFFIX")
	private String suffix;

	/**
	 * Название фонда
	 */
	@NotNull
	@Column(name = "FUND_NAME")
	private String name;

	/**
	 * Крайние даты
	 */
	@Column(name = "EDGE_DATES")
	private String dates;

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

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDates() {
		return dates;
	}

	public void setDates(String dates) {
		this.dates = dates;
	}

}
