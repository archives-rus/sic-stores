package ru.insoft.archive.sic_storage.model.view;

import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 16.07.13
 * Time: 13:28
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "V_STRG_DOC_CONTENTS")
public class VStrgDocContents implements JsonOut
{
    @JsonExclude
    @Id
    @Column(name = "DOC_CONTENTS_ID")
    private Long id;

    @JsonExclude
    @ManyToOne
    @JoinColumn(name = "STRG_PLACE_ORG_ID")
    private VStrgPlaceOrg storage;

    @Column(name = "DOCUMENT_TYPE")
    private String documentType;

    @Column(name = "DATES")
    private String dates;

    @Column(name = "SERIES")
    private String series;

    @Column(name = "CASE_COUNT")
    private Integer caseCount;

	public Integer getCaseCount() {
		return caseCount;
	}

	public void setCaseCount(Integer caseCount) {
		this.caseCount = caseCount;
	}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VStrgPlaceOrg getStorage() {
        return storage;
    }

    public void setStorage(VStrgPlaceOrg storage) {
        this.storage = storage;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
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
