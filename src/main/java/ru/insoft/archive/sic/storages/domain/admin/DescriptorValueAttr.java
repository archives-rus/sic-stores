package ru.insoft.archive.sic.storages.domain.admin;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Атрибуты справочников
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "DESCRIPTOR_VALUE_ATTR")
public class DescriptorValueAttr implements Serializable {

	/**
	 * ID атрибута значения справочника
	 */
	@Id
	@Column(name = "DESCRIPTOR_VALUE_ATTR_ID", insertable = false, updatable = false)
	private Long id;

	/**
	 * значение справочника
	 */
	@ManyToOne
	@JoinColumn(name = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValue descValue;

	/**
	 * Ссылка на другое значение справочника
	 */
	@ManyToOne
	@JoinColumn(name = "REF_DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValue refDescValue;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DescriptorValue getDescValue() {
		return descValue;
	}

	public void setDescValue(DescriptorValue descValue) {
		this.descValue = descValue;
	}

	public DescriptorValue getRefDescValue() {
		return refDescValue;
	}

	public void setRefDescValue(DescriptorValue refDescValue) {
		this.refDescValue = refDescValue;
	}
}
