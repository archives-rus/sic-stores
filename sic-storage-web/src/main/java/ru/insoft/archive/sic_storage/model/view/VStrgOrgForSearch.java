package ru.insoft.archive.sic_storage.model.view;

import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 12.07.13
 * Time: 17:47
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "V_STRG_ORG_FOR_SEARCH")
public class VStrgOrgForSearch
{
    @Id
    @Column(name = "ORGANIZATION_ID")
    private Long id;

    @Column(name = "FULL_NAME")
    private String name;

    @Column(name = "ARCHIVE_ID")
    private Long archiveId;

    @Column(name = "NOTES")
    private String indexedName;

    @Column(name = "ARCHIVE_NAME")
    private String archive;

    @Column(name = "FUND_NUM")
    private Integer fundNum;

    @Column(name = "PREFIX")
    private String prefix;

    @Column(name = "SUFFIX")
    private String suffix;

    @Column(name = "FUND_NUMBER_FULL")
    private String fund;

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

    public Long getArchiveId() {
        return archiveId;
    }

    public void setArchiveId(Long archiveId) {
        this.archiveId = archiveId;
    }

    public String getIndexedName() {
        return indexedName;
    }

    public void setIndexedName(String indexedName) {
        this.indexedName = indexedName;
    }

    public String getArchive() {
        return archive;
    }

    public void setArchive(String archive) {
        this.archive = archive;
    }

    public Integer getFundNum() {
        return fundNum;
    }

    public void setFundNum(Integer fundNum) {
        this.fundNum = fundNum;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getFund() {
        return fund;
    }

    public void setFund(String fund) {
        this.fund = fund;
    }
}
