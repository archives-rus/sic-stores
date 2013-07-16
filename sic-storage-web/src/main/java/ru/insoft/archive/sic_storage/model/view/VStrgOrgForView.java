package ru.insoft.archive.sic_storage.model.view;

import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 16.07.13
 * Time: 12:26
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "V_STRG_ORG_FOR_VIEW")
public class VStrgOrgForView implements JsonOut
{
    @JsonExclude
    @Id
    @Column(name = "ORGANIZATION_ID")
    private Long id;

    @Column(name = "ARCHIVE_NAME")
    private String archive;

    @Column(name = "FUND_NUMBER_FULL")
    private String fund;

    @Column(name = "FUND_NAME")
    private String fundName;

    @Column(name = "EDGE_DATES")
    private String edgeDates;

    @OneToMany(mappedBy = "org")
    private List<VStrgPlaceOrg> storage;

    @Column(name = "BUSINESS_TRIPS_INFO")
    private String businessTripsInfo;

    @Column(name = "REWARDS_INFO")
    private String rewardsInfo;

    @Column(name = "NOTES")
    private String notes;

    @Column(name = "LAST_MODIF_USER")
    private String userName;

    @Column(name = "LAST_UPDATE_DATE")
    private Date lastUpdateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public String getEdgeDates() {
        return edgeDates;
    }

    public void setEdgeDates(String edgeDates) {
        this.edgeDates = edgeDates;
    }

    public List<VStrgPlaceOrg> getStorage() {
        return storage;
    }

    public void setStorage(List<VStrgPlaceOrg> storage) {
        this.storage = storage;
    }

    public String getBusinessTripsInfo() {
        return businessTripsInfo;
    }

    public void setBusinessTripsInfo(String businessTripsInfo) {
        this.businessTripsInfo = businessTripsInfo;
    }

    public String getRewardsInfo() {
        return rewardsInfo;
    }

    public void setRewardsInfo(String rewardsInfo) {
        this.rewardsInfo = rewardsInfo;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }
}
