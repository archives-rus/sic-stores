package ru.insoft.archive.sic_storage.model.view;

import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.*;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 16.07.13
 * Time: 12:34
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "V_STRG_PLACE_ORG")
public class VStrgPlaceOrg implements JsonOut
{
    @Id
    @Column(name = "STRG_PLACE_ORG_ID")
    private Long id;

    @JsonExclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORGANIZATION_ID")
    private VStrgOrgForView org;

    @Column(name = "STRG_PLACE_TYPE")
    private String storageType;

    @Column(name = "ARCHIVE_NAME")
    private String archive;

    @Column(name = "ORG_NAME")
    private String orgName;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "PHONE_NUMBER")
    private String phone;

    @Column(name = "DOCUMENT_COUNT")
    private Long documentCount;

    @Column(name = "BEGIN_YEAR")
    private Integer beginYear;

    @Column(name = "END_YEAR")
    private Integer endYear;

    @JsonExclude
    @OneToMany(mappedBy = "storage")
    private List<VStrgDocContents> documents;

    @Column(name = "CONTENTS")
    private String contents;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VStrgOrgForView getOrg() {
        return org;
    }

    public void setOrg(VStrgOrgForView org) {
        this.org = org;
    }

    public String getStorageType() {
        return storageType;
    }

    public void setStorageType(String storageType) {
        this.storageType = storageType;
    }

    public String getArchive() {
        return archive;
    }

    public void setArchive(String archive) {
        this.archive = archive;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getDocumentCount() {
        return documentCount;
    }

    public void setDocumentCount(Long documentCount) {
        this.documentCount = documentCount;
    }

    public Integer getBeginYear() {
        return beginYear;
    }

    public void setBeginYear(Integer beginYear) {
        this.beginYear = beginYear;
    }

    public Integer getEndYear() {
        return endYear;
    }

    public void setEndYear(Integer endYear) {
        this.endYear = endYear;
    }

    public List<VStrgDocContents> getDocuments() {
        return documents;
    }

    public void setDocuments(List<VStrgDocContents> documents) {
        this.documents = documents;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }
}
