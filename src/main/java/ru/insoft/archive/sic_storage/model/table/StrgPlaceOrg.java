package ru.insoft.archive.sic_storage.model.table;

import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.*;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 09.07.13
 * Time: 17:14
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "STRG_PLACE_ORG")
public class StrgPlaceOrg implements HasId, JsonIn, JsonOut
{
    @Id
    @SequenceGenerator(name = "seqPlaceOrg", sequenceName = "SEQ_STRG_PLACE_ORG", allocationSize = 1)
    @GeneratedValue(generator = "seqPlaceOrg")
    @Column(name = "STRG_PLACE_ORG_ID")
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "STRG_PLACE_ARCH_ID")
    private StrgPlaceArchive archStrg;

    @JsonExclude
    @ManyToOne
    @JoinColumn(name = "ORGANIZATION_ID")
    private StrgOrganization org;

    @JsonExclude
    @Column(name = "ORGANIZATION_ID", insertable = false, updatable = false)
    private Long orgId;

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
    @OneToMany(mappedBy = "orgStrg", cascade = CascadeType.MERGE)
    private List<StrgDocContents> documents;

    @Column(name = "CONTENTS")
    private String contents;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StrgPlaceArchive getArchStrg() {
        return archStrg;
    }

    public void setArchStrg(StrgPlaceArchive archStrg) {
        this.archStrg = archStrg;
    }

    public StrgOrganization getOrg() {
        return org;
    }

    public void setOrg(StrgOrganization org) {
        this.org = org;
    }

    public Long getOrgId() {
        return orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
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

    public List<StrgDocContents> getDocuments() {
        return documents;
    }

    public void setDocuments(List<StrgDocContents> documents) {
        this.documents = documents;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }
}
