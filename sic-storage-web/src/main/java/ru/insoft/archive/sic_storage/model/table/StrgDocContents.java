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
 * Time: 17:22
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "STRG_DOC_CONTENTS")
public class StrgDocContents implements HasId, JsonIn, JsonOut
{
    @Id
    @SequenceGenerator(name = "seqDocContents", sequenceName = "SEQ_STRG_DOC_CONTENTS", allocationSize = 1)
    @GeneratedValue(generator = "seqDocContents")
    @Column(name = "DOC_CONTENTS_ID")
    private Long id;

    @JsonExclude
    @ManyToOne
    @JoinColumn(name = "STRG_PLACE_ORG_ID")
    private StrgPlaceOrg orgStrg;

    @Column(name = "DOC_TYPE_ID")
    private Long documentTypeId;

    @Column(name = "DATES")
    private String dates;

    @Column(name = "SERIES")
    private String series;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StrgPlaceOrg getOrgStrg() {
        return orgStrg;
    }

    public void setOrgStrg(StrgPlaceOrg orgStrg) {
        this.orgStrg = orgStrg;
    }

    public Long getDocumentTypeId() {
        return documentTypeId;
    }

    public void setDocumentTypeId(Long documentTypeId) {
        this.documentTypeId = documentTypeId;
    }

    public String getDates() {
        return dates;
    }

    public void setDates(String dates) {
        this.dates = dates;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }
}
