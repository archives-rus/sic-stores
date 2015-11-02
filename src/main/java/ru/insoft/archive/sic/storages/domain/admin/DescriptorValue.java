package ru.insoft.archive.sic.storages.domain.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Значение справочников
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "DESCRIPTOR_VALUE")

@NamedQueries({
	@NamedQuery(name = "DescriptorValue.findByGroupCode", query
			= "SELECT d from DescriptorValue d JOIN d.group g WHERE g.code = :code "
			+ "ORDER BY CASE WHEN g.sort != 0 THEN d.fullValue ELSE CONCAT(d.order,'') END ASC"),
	@NamedQuery(name = "DescriptorValue.findByParent", query
			= "SELECT d from DescriptorValue d JOIN d.group g WHERE d.parent = :parent "
			+ "ORDER BY CASE WHEN g.sort != 0 THEN d.fullValue ELSE CONCAT(d.order,'') END ASC"),
	@NamedQuery(name = "DescriptorValue.findByAttrDescriptor", query
			= "SELECT d from DescriptorValue d JOIN d.group g JOIN d.attrs a JOIN a.refDescValue rd "
			+ "WHERE rd.code = :code ORDER BY CASE WHEN g.sort != 0 THEN d.fullValue ELSE CONCAT(d.order,'') END ASC")
})
public class DescriptorValue implements Serializable {

	@Id
	@Column(name = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "FULL_VALUE", insertable = false, updatable = false)
	private String fullValue;

	@JsonIgnore
	@Column(name = "SORT_ORDER", insertable = false, updatable = false)
	private Long order;

	@Column(name = "VALUE_CODE", insertable = false, updatable = false)
	private String code;

	@JsonIgnore
	@JoinColumn(name = "PARENT_VALUE_ID", insertable = false, updatable = false)
	@ManyToOne
	private DescriptorValue parent;

	@JsonIgnore
	@JoinColumn(name = "DESCRIPTOR_GROUP_ID", insertable = false, updatable = false)
	@ManyToOne
	private DescriptorGroup group;

	@JsonIgnore
	@OneToMany(mappedBy = "descValue")
	private List<DescriptorValueAttr> attrs;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullValue() {
		return fullValue;
	}

	public void setFullValue(String fullValue) {
		this.fullValue = fullValue;
	}

	public Long getOrder() {
		return order;
	}

	public void setOrder(Long order) {
		this.order = order;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public DescriptorValue getParent() {
		return parent;
	}

	public void setParent(DescriptorValue parent) {
		this.parent = parent;
	}

	public DescriptorGroup getGroup() {
		return group;
	}

	public void setGroup(DescriptorGroup group) {
		this.group = group;
	}

	public List<DescriptorValueAttr> getAttrs() {
		return attrs;
	}

	public void setAttrs(List<DescriptorValueAttr> attrs) {
		this.attrs = attrs;
	}

}
