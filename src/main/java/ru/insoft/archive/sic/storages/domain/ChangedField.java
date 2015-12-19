package ru.insoft.archive.sic.storages.domain;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class ChangedField {

	private String name;
	private String newValue;
	private String oldValue;
	private ChangedField parent;
	private List<ChangedField> kids = new ArrayList<>();

	public ChangedField() {
		newValue = "";
		oldValue = "";
	}

	public ChangedField(String name) {
		this();
		this.name = name;
	}

	public static ChangedField getInstance(String name, List<ChangedField> kids) {
		ChangedField field = new ChangedField(name);
		for (ChangedField kid : kids) {
			field.addKid(kid);
		}
		return field;
	}

	public ChangedField(String name, String newValue, String oldValue) {
		this.name = name;
		this.newValue = newValue;
		this.oldValue = oldValue;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNewValue() {
		return newValue;
	}

	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}

	public String getOldValue() {
		return oldValue;
	}

	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}

	public ChangedField getParent() {
		return parent;
	}

	public void setParent(ChangedField parent) {
		this.parent = parent;
	}

	public void addKid(ChangedField field) {
		kids.add(field);
		field.setParent(this);
	}

	public void removeKid(ChangedField field) {
		kids.remove(field);
		field.setParent(null);
	}

	public List<ChangedField> getKids() {
		return kids;
	}
}
