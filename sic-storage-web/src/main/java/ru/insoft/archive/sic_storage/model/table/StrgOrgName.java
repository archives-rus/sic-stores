package ru.insoft.archive.sic_storage.model.table;

import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 09.07.13
 * Time: 16:56
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "STRG_ORG_NAME")
public class StrgOrgName implements HasId, JsonIn, JsonOut
{
    @Id
    @SequenceGenerator(name = "seqOrgName", sequenceName="SEQ_STRG_ORG_NAME", allocationSize = 1)
    @GeneratedValue(generator = "seqOrgName")
    @Column(name = "ORG_NAME_ID")
    private Long id;

    @JsonExclude
    @ManyToOne
    @JoinColumn(name = "ORGANIZATION_ID")
    private StrgOrganization org;

    @Column(name = "FULL_NAME")
    private String fullName;

    @Column(name = "SHORT_NAME")
    private String shortName;

    @Column(name = "SUBORDINATION")
    private String subordination;

    @Column(name = "EDGE_DATES")
    private String edgeDates;

    @Column(name = "SORT_ORDER")
    private Integer sortOrder;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StrgOrganization getOrg() {
        return org;
    }

    public void setOrg(StrgOrganization org) {
        this.org = org;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getSubordination() {
        return subordination;
    }

    public void setSubordination(String subordination) {
        this.subordination = subordination;
    }

    public String getEdgeDates() {
        return edgeDates;
    }

    public void setEdgeDates(String edgeDates) {
        this.edgeDates = edgeDates;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
