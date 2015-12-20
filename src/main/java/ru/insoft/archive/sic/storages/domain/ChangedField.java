package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Информация по измененным полям
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "SP_CHANGE_FIELD")
public class ChangedField implements Serializable {

	/**
	 * Идентификатор
	 */
	@Id
	@SequenceGenerator(name = "seqChField", sequenceName = "SEQ_SP_CHANGE_FIELD", allocationSize = 1)
	@GeneratedValue(generator = "seqChField", strategy = GenerationType.SEQUENCE)
	@Column(name = "FIELD_ID")
	private Long id;

	/**
	 * Название поля
	 */
	@Column(name = "NAME", updatable = false)
	private String name;

	/**
	 * Новое значение
	 */
	@Column(name = "NEW_VALUE", updatable = false)
	private String newValue;

	/**
	 * Старое значение
	 */
	@Column(name = "OLD_VALUE", updatable = false)
	private String oldValue;

	/**
	 * Родительское поле
	 */
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "PARENT_ID", updatable = false)
	private ChangedField parent;

	/**
	 * Дочерние поля
	 */
	@OneToMany(mappedBy = "parent", cascade = CascadeType.PERSIST)
	private List<ChangedField> kids = new ArrayList<>();

	/**
	 * Операция
	 */
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "OPERATION_ID", updatable = false)
	private ChangeOperation operation;

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

	public ChangeOperation getOperation() {
		return operation;
	}

	public void setOperation(ChangeOperation operation) {
		this.operation = operation;
	}

}
