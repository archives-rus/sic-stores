package ru.insoft.archive.sic_storage.model.table;

import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 08.07.13
 * Time: 16:19
 * To change this template use File | Settings | File Templates.
 */

@Entity
@Table(name = "STRG_FUND")
public class StrgFund implements HasId, JsonIn, JsonOut
{
    @Id
    @SequenceGenerator(name = "seqFund", sequenceName = "SEQ_STRG_FUND", allocationSize = 1)
    @GeneratedValue(generator = "seqFund")
    @Column(name = "FUND_ID")
    private Long id;

    @JsonExclude
    @Column(name = "ARCHIVE_ID")
    private Long archiveId;

    @Column(name = "FUND_NUM")
    private Integer num;

    @Column(name = "PREFIX")
    private String prefix;

    @Column(name = "SUFFIX")
    private String suffix;

    @Column(name = "FUND_NAME")
    private String name;

    @Column(name = "EDGE_DATES")
    private String dates;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getArchiveId() {
        return archiveId;
    }

    public void setArchiveId(Long archiveId) {
        this.archiveId = archiveId;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDates() {
        return dates;
    }

    public void setDates(String dates) {
        this.dates = dates;
    }
}
