package ru.insoft.archive.sic.storages.domain.admin;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 * Группа прав доступа
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "ADM_GROUP")
public class AdmGroup implements Serializable {

	@Id
	@Column(name = "GROUP_ID", insertable = false, updatable = false)
	private Long id;

	@JoinTable(name = "ADM_GROUP_RULE", joinColumns = @JoinColumn(name = "GROUP_ID"),
			inverseJoinColumns = @JoinColumn(name = "ACCESS_RULE_ID"))
	@ManyToMany(fetch = FetchType.EAGER)
	private List<AdmAccessRule> rules;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<AdmAccessRule> getRules() {
		return rules;
	}

	public void setRules(List<AdmAccessRule> rules) {
		this.rules = rules;
	}
}
