package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "V_SP_LAST_CHANGE_OP")
public class OrganizationWithChangeOperations implements Serializable {

	@JsonIgnore
	@Id
	@Column(name = "ORGANIZATION_ID", insertable = false, updatable = false)
	private Long id;

	@OneToMany(mappedBy = "lastOperation")
	@OrderBy("date DESC")
	private List<ChangeOperation> operations;

	@Column(name = "ORG_NAME", insertable = false, updatable = false)
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<ChangeOperation> getOperations() {
		return operations;
	}

	public void setOperations(List<ChangeOperation> operations) {
		this.operations = operations;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}