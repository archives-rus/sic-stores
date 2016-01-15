package ru.insoft.archive.sic.storages.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import ru.insoft.archive.sic.storages.FieldNames;

/**
 * Сведения о загранкомандировках
 *
 * @author stikkas<stikkas@yandex.ru>
 */

@Entity
@Table(name = "SP_TRIP")
public class Trip extends Document {
	/**
	 * ID сведений о загранкомандировках
	 */
	@Id
	@SequenceGenerator(name = "seqTrip", sequenceName = "SEQ_SP_TRIP", allocationSize = 1)
	@GeneratedValue(generator = "seqTrip", strategy = GenerationType.SEQUENCE)
	@Column(name = "TRIP_ID")
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public static String[][] getGettersNames() {
		return new String[][]{
			{FieldNames.DOC_TYPE, "getType", ""},
			{FieldNames.START_YEAR, "getStartDate"},
			{FieldNames.END_YEAR, "getEndDate"},
			{FieldNames.OPIS_NUMBER, "getOpisNumber"},
			{FieldNames.DOCS_COUNT, "getDocsCount"}
		};
	}

}
