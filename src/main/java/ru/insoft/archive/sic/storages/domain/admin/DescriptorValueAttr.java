package ru.insoft.archive.sic.storages.domain.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValue descValue;

	/**
	 * значение справочника
	 */
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValueWithDescAttr descValueWA;

	/**
	 * Ссылка на другое значение справочника
	 */
	@ManyToOne
	@JoinColumn(name = "REF_DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private DescriptorValue refDescValue;

	/**
	 * Группа атрибутов
	 */
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "DESCRIPTOR_GROUP_ATTR_ID", insertable = false, updatable = false)
	private DescriptorGroupAttr attrGroup;

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

	public DescriptorGroupAttr getAttrGroup() {
		return attrGroup;
	}

	public void setAttrGroup(DescriptorGroupAttr attrGroup) {
		this.attrGroup = attrGroup;
	}

	public DescriptorValueWithDescAttr getDescValueWA() {
		return descValueWA;
	}

	public void setDescValueWA(DescriptorValueWithDescAttr descValueWA) {
		this.descValueWA = descValueWA;
	}
}
