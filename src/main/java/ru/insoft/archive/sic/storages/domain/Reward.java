package ru.insoft.archive.sic.storages.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Сведения о награждениях
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "SP_REWARD")
public class Reward extends Document {

	/**
	 * ID сведений о награждениях
	 */
	@Id
	@SequenceGenerator(name = "seqReward", sequenceName = "SEQ_SP_REWARD", allocationSize = 1)
	@GeneratedValue(generator = "seqReward", strategy = GenerationType.SEQUENCE)
	@Column(name = "REWARD_ID")
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
