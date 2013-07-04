package ru.insoft.archive.sic_storage.model.view;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import ru.insoft.archive.core_model.EntityMarker;

@Entity
@Table(name = "V_STRG_ARCHIVE")
public class VStrgArchive extends EntityMarker 
{
	@Id
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "NAME")
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
