package ru.insoft.archive.sic.storages.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import ru.insoft.archive.sic.storages.FieldNames;

/**
 * Наименование организации и ее переименование
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "SP_NAME")
public class Name extends OrgProperty {

	/**
	 * ID наименования
	 */
	@Id
	@SequenceGenerator(name = "seqName", sequenceName = "SEQ_SP_NAME", allocationSize = 1)
	@GeneratedValue(generator = "seqName", strategy = GenerationType.SEQUENCE)
	@Column(name = "NAME_ID")
	private Long id;

	/**
	 * Полное наименование и переименования
	 */
	@Column(name = "FULL_NAME")
	private String full;

	/**
	 * Краткое наименование
	 */
	@Column(name = "SHORT_NAME")
	private String brief;

	/**
	 * Подчинённость
	 */
	@Column(name = "SUBORDINATION")
	private String sub;

	/**
	 * Даты
	 */
	@Column(name = "DATES")
	private String dates;

	/**
	 * Порядок сортировки
	 */
	@NotNull
	@Column(name = "SORT")
	private Long sort;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFull() {
		return full;
	}

	public void setFull(String full) {
		this.full = full;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public String getSub() {
		return sub;
	}

	public void setSub(String sub) {
		this.sub = sub;
	}

	public String getDates() {
		return dates;
	}

	public void setDates(String dates) {
		this.dates = dates;
	}

	public Long getSort() {
		return sort;
	}

	public void setSort(Long sort) {
		this.sort = sort;
	}

	public static List<ChangedField> getChangedFields(Name newOne, Name oldOne) {

		List<ChangedField> fields = new ArrayList<>();
		if (oldOne == null) {
			fields.add(new ChangedField(FieldNames.FULL_NAME, newOne.full, ""));
			if (newOne.brief != null) {
				fields.add(new ChangedField(FieldNames.BRIEF_NAME, newOne.brief, ""));
			}
			if (newOne.sub != null) {
				fields.add(new ChangedField(FieldNames.SUBORDINATION, newOne.sub, ""));
			}
			fields.add(new ChangedField(FieldNames.DATES, newOne.dates, ""));
		} else if (newOne == null) {
			fields.add(new ChangedField(FieldNames.FULL_NAME, "", oldOne.full));
			if (oldOne.brief != null) {
				fields.add(new ChangedField(FieldNames.BRIEF_NAME, "", oldOne.brief));
			}
			if (oldOne.sub != null) {
				fields.add(new ChangedField(FieldNames.SUBORDINATION, "", oldOne.sub));
			}
			fields.add(new ChangedField(FieldNames.DATES, "", oldOne.dates));
		} else {
			if (!Objects.equals(newOne.full, oldOne.full)) {
				fields.add(new ChangedField(FieldNames.FULL_NAME, newOne.full, oldOne.full));
			}
			if (!Objects.equals(newOne.brief, oldOne.brief)) {
				fields.add(new ChangedField(FieldNames.BRIEF_NAME, newOne.brief == null ? "" : newOne.brief,
						oldOne.brief == null ? "" : oldOne.brief));
			}
			if (!Objects.equals(newOne.sub, oldOne.sub)) {
				fields.add(new ChangedField(FieldNames.SUBORDINATION, newOne.sub == null ? "" : newOne.sub,
						oldOne.sub == null ? "" : oldOne.sub));
			}
			if (!Objects.equals(newOne.dates, oldOne.dates)) {
				fields.add(new ChangedField(FieldNames.DATES, newOne.dates, oldOne.dates));
			}
		}
		return fields;
	}
}
