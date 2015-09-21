package ru.insoft.archive.sic_storage.webmodel;

import ru.insoft.archive.extcommons.json.JsonIn;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 12.07.13
 * Time: 18:13
 * To change this template use File | Settings | File Templates.
 */
public class OrgSearchCriteria implements JsonIn
{
    private String orgName;
    private Long documentTypeId;
    private Integer yearFrom;
    private Integer yearTo;
    private Long archiveId;
    private FundSearchCriteria fund;

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public Long getDocumentTypeId() {
        return documentTypeId;
    }

    public void setDocumentTypeId(Long documentTypeId) {
        this.documentTypeId = documentTypeId;
    }

    public Integer getYearFrom() {
        return yearFrom;
    }

    public void setYearFrom(Integer yearFrom) {
        this.yearFrom = yearFrom;
    }

    public Integer getYearTo() {
        return yearTo;
    }

    public void setYearTo(Integer yearTo) {
        this.yearTo = yearTo;
    }

    public Long getArchiveId() {
        return archiveId;
    }

    public void setArchiveId(Long archiveId) {
        this.archiveId = archiveId;
    }

    public FundSearchCriteria getFund() {
        return fund;
    }

    public void setFund(FundSearchCriteria fund) {
        this.fund = fund;
    }
}
