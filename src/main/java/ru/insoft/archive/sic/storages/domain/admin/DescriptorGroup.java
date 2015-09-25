package ru.insoft.archive.sic.storages.domain.admin;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Группы справочников
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "DESCRIPTOR_GROUP")
public class DescriptorGroup implements Serializable {

	@Id
	@Column(name = "DESCRIPTOR_GROUP_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "ALPHABETIC_SORT", insertable = false, updatable = false)
	private Short sort;

	@Column(name = "GROUP_CODE", insertable = false, updatable = false)
	private String code;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Short getSort() {
		return sort;
	}

	public void setSort(Short sort) {
		this.sort = sort;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
/*
 CREATE TABLE IF NOT EXISTS DESCRIPTOR_GROUP (
 DESCRIPTOR_GROUP_ID int(10) NOT NULL PRIMARY KEY, 
 SUBSYSTEM_NUMBER int(10), 
 GROUP_NAME VARCHAR(300) NOT NULL, 
 GROUP_CODE VARCHAR(30), 
 SORT_ORDER int(5) NOT NULL, 
 IS_SYSTEM int(1) NOT NULL, 
 IS_HIERARCHICAL int(1) NOT NULL, 
 SHORT_VALUE_SUPPORTED int(1) NOT NULL, 
 ALPHABETIC_SORT int(1) NOT NULL, 
 FOREIGN KEY (SUBSYSTEM_NUMBER) REFERENCES CORE_SUBSYSTEM (SUBSYSTEM_NUMBER)
 );
 */
