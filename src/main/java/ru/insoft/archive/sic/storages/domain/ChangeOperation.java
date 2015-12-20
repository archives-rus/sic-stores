package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.insoft.archive.sic.storages.convert.JsonCalendarSerializer;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;

/**
 * Операция изменения карточки
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "SP_CHANGE_OPERATION")
@EntityListeners(AuditingEntityListener.class)
public class ChangeOperation implements Serializable {

	/**
	 * Идентификатор
	 */
	@Id
	@SequenceGenerator(name = "seqChOp", sequenceName = "SEQ_SP_CHANGE_OP", allocationSize = 1)
	@GeneratedValue(generator = "seqChOp", strategy = GenerationType.SEQUENCE)
	@Column(name = "OPERATION_ID")
	private Long id;

	/**
	 * Идентификатор карточки
	 */
	@JsonIgnore
	@Column(name = "ORGANIZATION_ID", updatable = false)
	private Long organizationId;

	@JsonIgnore
	@JoinColumn(name = "ORGANIZATION_ID", referencedColumnName = "ORGANIZATION_ID", updatable = false, insertable = false)
	@ManyToOne
	private OrganizationWithChangeOperations lastOperation;

	/**
	 * Измененные поля
	 */
	@OneToMany(mappedBy = "operation", cascade = CascadeType.PERSIST)
	private List<ChangedField> fields = new ArrayList<>();

	/**
	 * ID пользователя, совершившего операцию
	 */
	@JsonIgnore
	@NotNull
	@Column(name = "USER_ID", updatable = false)
	@CreatedBy
	private Long userId;

	@ManyToOne
	@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
	private AdmUser user;

	/**
	 * Дата создания
	 */
	@NotNull
	@JsonSerialize(using = JsonCalendarSerializer.class)
	@Column(name = "OP_DATE", columnDefinition = "DATE", updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Calendar date;

	/**
	 * Идентификатор вида операции
	 */
	@JsonIgnore
	@Column(name = "ACTION_ID", updatable = false)
	private Long actionId;

	/**
	 * Вид операции
	 */
	@ManyToOne
	@JoinColumn(name = "ACTION_ID", insertable = false, updatable = false)
	private DescriptorValue action;

	public void addField(ChangedField field) {
		field.setOperation(this);
		fields.add(field);
	}

	public void remove(ChangedField field) {
		field.setOperation(null);
		fields.remove(field);
	}

	public List<ChangedField> getFields() {
		return fields;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public AdmUser getUser() {
		return user;
	}

	public void setUser(AdmUser user) {
		this.user = user;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public Long getActionId() {
		return actionId;
	}

	public void setActionId(Long actionId) {
		this.actionId = actionId;
	}

	public DescriptorValue getAction() {
		return action;
	}

	public void setAction(DescriptorValue action) {
		this.action = action;
	}

	public OrganizationWithChangeOperations getLastOperation() {
		return lastOperation;
	}

	public void setLastOperation(OrganizationWithChangeOperations lastOperation) {
		this.lastOperation = lastOperation;
	}
	
}
