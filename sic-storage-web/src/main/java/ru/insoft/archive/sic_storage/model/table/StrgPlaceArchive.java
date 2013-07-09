package ru.insoft.archive.sic_storage.model.table;

import ru.insoft.archive.core_model.EntityMarker;
import ru.insoft.archive.extcommons.annotation.Additional;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 08.07.13
 * Time: 18:34
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "STRG_PLACE_ARCHIVE")
public class StrgPlaceArchive extends EntityMarker
{
    @Id
    @SequenceGenerator(name = "seqPlaceArchive", sequenceName = "SEQ_STRG_PLACE_ARCHIVE", allocationSize = 1)
    @GeneratedValue(generator = "seqPlaceArchive")
    @Column(name = "STRG_PLACE_ARCH_ID")
    private Long id;

    @Additional
    @Column(name = "ARCHIVE_ID")
    private Long archiveId;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "PHONE_NUMBER")
    private String phone;

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
}
