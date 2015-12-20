package ru.insoft.archive.sic.storages.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Calendar;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import ru.insoft.archive.sic.storages.convert.JsonCalendarSerializer;

/**
 * Последние операции изменения
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "V_SP_LAST_CHANGE_OP")
public class ChangeOperationLast implements Serializable {

	@JsonIgnore
	@Id
	@Column(name = "ID", insertable = false, updatable = false)
	private Long id;

	@JsonIgnore
	@Column(name = "ORGANIZATION_ID", insertable = false, updatable = false)
	private Long orgId;

	@Column(name = "ORG_NAME", insertable = false, updatable = false)
	private String name;

	@JsonIgnore
	@Column(name = "USER_ID", insertable = false, updatable = false)
	private Long userId;

	@Column(name = "USER_NAME", insertable = false, updatable = false)
	private String user;

	@JsonIgnore
	@Column(name = "ACTION_ID", insertable = false, updatable = false)
	private Long actionId;

	@Column(name = "ACTION", insertable = false, updatable = false)
	private String type;

	@Column(name = "ARCHIVE", insertable = false, updatable = false)
	private String archive;

	@Column(name = "ARCH_LEVEL", insertable = false, updatable = false)
	private String level;

	@JsonSerialize(using = JsonCalendarSerializer.class)
	@Column(name = "OP_DATE", columnDefinition = "DATE", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar date;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public Long getActionId() {
		return actionId;
	}

	public void setActionId(Long actionId) {
		this.actionId = actionId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getArchive() {
		return archive;
	}

	public void setArchive(String archive) {
		this.archive = archive;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

}
