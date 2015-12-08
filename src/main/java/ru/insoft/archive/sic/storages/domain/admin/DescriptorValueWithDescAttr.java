package ru.insoft.archive.sic.storages.domain.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Значение справочников для специального использования, а именно когда
 * необходимо получить структуру значений с значениями, служащами атрибутами
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "DESCRIPTOR_VALUE")
@NamedQueries({
	@NamedQuery(name = "DescriptorValueWithDescAttr.findByGroupWithGroupAttr",
			query = "SELECT DISTINCT d FROM DescriptorValueWithDescAttr d JOIN d.group g "
			+ "JOIN d.attrs a JOIN a.attrGroup ag WHERE g.code = :group AND ag.code = :attrGroup")})
public class DescriptorValueWithDescAttr implements Serializable {

	@Id
	@Column(name = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private Long id;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "DESCRIPTOR_VALUE_ATTR",
			joinColumns = {
				@JoinColumn(name = "DESCRIPTOR_VALUE_ID")},
			inverseJoinColumns = {
				@JoinColumn(name = "REF_DESCRIPTOR_VALUE_ID")})
	private List<DescriptorValue> values;

	@JsonIgnore
	@OneToMany(mappedBy = "descValueWA")
	private List<DescriptorValueAttr> attrs;

	@JsonIgnore
	@JoinColumn(name = "DESCRIPTOR_GROUP_ID", insertable = false, updatable = false)
	@ManyToOne
	private DescriptorGroup group;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<DescriptorValue> getValues() {
		return values;
	}

	public void setValues(List<DescriptorValue> values) {
		this.values = values;
	}

	public List<DescriptorValueAttr> getAttrs() {
		return attrs;
	}

	public void setAttrs(List<DescriptorValueAttr> attrs) {
		this.attrs = attrs;
	}

	public DescriptorGroup getGroup() {
		return group;
	}

	public void setGroup(DescriptorGroup group) {
		this.group = group;
	}

}
