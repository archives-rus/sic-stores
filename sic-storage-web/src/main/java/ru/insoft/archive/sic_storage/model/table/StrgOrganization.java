package ru.insoft.archive.sic_storage.model.table;

import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.entity.HasUserInfo;
import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 09.07.13
 * Time: 12:14
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "STRG_ORGANIZATION")
public class StrgOrganization implements HasId, HasUserInfo, JsonIn, JsonOut
{
    @JsonExclude
    @Id
    @SequenceGenerator(name = "seqOrganization", sequenceName = "SEQ_STRG_ORGANIZATION", allocationSize = 1)
    @GeneratedValue(generator = "seqOrganization")
    @Column(name = "ORGANIZATION_ID")
    private Long id;

    @JsonExclude
    @OneToMany(mappedBy = "org", cascade = CascadeType.ALL)
    @OrderBy("sortOrder")
    private List<StrgOrgName> names;

    @Column(name = "ARCHIVE_ID")
    private Long archiveId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "FUND_ID")
    private StrgFund fund;

    @OneToMany(mappedBy = "org", cascade = CascadeType.ALL)
    private List<StrgPlaceOrg> storage;

    @Column(name = "BUSINESS_TRIPS_INFO")
    private String businessTripsInfo;

    @Column(name = "REWARDS_INFO")
    private String rewardsInfo;

    @Column(name = "NOTES")
    private String notes;

    @Transient
    private String userName;

    @JsonExclude
    @Column(name = "ADD_USER_ID")
    private Long addUserId;

    @JsonExclude
    @Column(name = "MOD_USER_ID")
    private Long modUserId;

    @JsonExclude
    @Column(name = "INSERT_DATE")
    private Date insertDate;

    @Column(name = "LAST_UPDATE_DATE")
    private Date lastUpdateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<StrgOrgName> getNames() {
        return names;
    }

    public void setNames(List<StrgOrgName> names) {
        this.names = names;
    }

    public Long getArchiveId() {
        return archiveId;
    }

    public void setArchiveId(Long archiveId) {
        this.archiveId = archiveId;
    }

    public StrgFund getFund() {
        return fund;
    }

    public void setFund(StrgFund fund) {
        this.fund = fund;
    }

    public List<StrgPlaceOrg> getStorage() {
        return storage;
    }

    public void setStorage(List<StrgPlaceOrg> storage) {
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

    public Long getAddUserId() {
        return addUserId;
    }

    public void setAddUserId(Long addUserId) {
        this.addUserId = addUserId;
    }

    public Long getModUserId() {
        return modUserId;
    }

    public void setModUserId(Long modUserId) {
        this.modUserId = modUserId;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }
}
