package ru.insoft.archive.sic_storage.webmodel;

import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Created with IntelliJ IDEA. User: melnikov Date: 12.07.13 Time: 20:08 To
 * change this template use File | Settings | File Templates.
 */
public class OrgSearchResult implements JsonOut {

	private Long id;
	private Long orgId;
	private String name;
	private String archive;
	private String fund;
	private String dates;

	public OrgSearchResult(Long id, Long orgId, String name,
		String archive, String fund, String dates) {
		this.id = id;
		this.orgId = orgId;
		this.name = name;
		this.archive = archive;
		this.fund = fund;
		this.dates = dates;
	}

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

	public String getArchive() {
		return archive;
	}

	public void setArchive(String archive) {
		this.archive = archive;
	}

	public String getFund() {
		return fund;
	}

	public void setFund(String fund) {
		this.fund = fund;
	}

	public String getDates() {
		return dates;
	}

	public void setDates(String dates) {
		this.dates = dates;
	}
}
