package ru.insoft.archive.sic_storage.model.view;

import java.io.Serializable;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "V_STRG_ARCHIVE")
public class VStrgArchive implements JsonOut, Serializable {

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
