package ru.insoft.archive.sic_storage.model.table;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 09.07.13
 * Time: 12:14
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name = "STRG_ORGANIZATION")
public class StrgOrganization
{
    @Id
    @SequenceGenerator(name = "seqOrganization", sequenceName = "SEQ_STRG_ORGANIZATION", allocationSize = 1)
    @GeneratedValue(generator = "seqOrganization")
    @Column(name = "ORGANIZATION_ID")
    private Long id;
}
