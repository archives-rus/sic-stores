package ru.insoft.archive.sic.storages.domain.admin;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Группа Атрибутов справочников
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "DESCRIPTOR_GROUP_ATTR")
public class DescriptorGroupAttr implements Serializable {

	/**
	 * ID справочника атрибутов
	 */
	@Id
	@Column(name = "DESCRIPTOR_GROUP_ATTR_ID", insertable = false, updatable = false)
	private Long id;

	/**
	 * Код группы атрибутов справочника
	 */
	@Column(name = "ATTR_CODE", insertable = false, updatable = false)
	private String code;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
