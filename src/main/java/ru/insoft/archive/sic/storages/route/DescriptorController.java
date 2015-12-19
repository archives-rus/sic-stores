package ru.insoft.archive.sic.storages.route;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.insoft.archive.sic.storages.DictCodes;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorGroupAttr;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValueAttr;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValueWithDescAttr;
import ru.insoft.archive.sic.storages.repos.AdmUserRepo;
import ru.insoft.archive.sic.storages.repos.DescriptorValueRepo;
import ru.insoft.archive.sic.storages.repos.DescriptorValueWithDescAttrRepo;

/**
 * Предоставляет разные справочные данные
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RestController
@RequestMapping("/dict")
public class DescriptorController {

	@Autowired
	private DescriptorValueRepo repo;

	@Autowired
	private AdmUserRepo userRepo;

	@Autowired
	private DescriptorValueWithDescAttrRepo attrRepo;

	/**
	 * Возвращает список типов документов
	 *
	 * @return список DescriptorValue
	 */
	@RequestMapping("/docTypes")
	public List<DescriptorValue> getDocTypes() {
		return repo.findByGroupCode(DictCodes.DOCUMENT_TYPE);
	}

	/**
	 * Возвращает список архивов (организаций, у которых атрибут
	 * ORG_STRUCTURE_TYPE=ARCHIVE)
	 *
	 * @return список DescriptorValue
	 */
	@RequestMapping("/archives")
	public List<DescriptorValue> getArchives() {
		return repo.findByAttrDescriptor(DictCodes.ARCHIVE);
	}

	/**
	 * Возвращает список типов мест хранения
	 *
	 * @return список DescriptorValue
	 */
	@RequestMapping("/places")
	public List<DescriptorValue> getStrgPlaces() {
		return repo.findByGroupCode(DictCodes.STORE_PLACE);
	}

	/**
	 * Возвращает список уровней архивов
	 *
	 * @return список DescriptorValue
	 */
	@RequestMapping("/levels")
	public List<DescriptorValue> getLevels() {
		return repo.findByGroupCode(DictCodes.ORG_LEVEL);
	}

	/**
	 * Возвращает список названий наград
	 *
	 * @return список DescriptorValue
	 */
	@RequestMapping("/rewardTypes")
	public List<DescriptorValue> getRewardTypes() {
		return repo.findByGroupCode(DictCodes.REWARDS);
	}

	/**
	 * Возвращает список типов документов загранкомандировок
	 *
	 * @return список DescriptorValue
	 */
	@RequestMapping("/tripTypes")
	public List<DescriptorValue> getTripTypes() {
		return repo.findByGroupCode(DictCodes.DOCS_TRIPS);
	}

	/**
	 * Возвращает список адресов относительно архивов
	 *
	 * @return список DescriptorValueWithDescAttr
	 */
	@RequestMapping("/addresses")
	public List<DescriptorValueWithDescAttr> getAddresses() {
		List<DescriptorValueWithDescAttr> result = attrRepo.findByGroupWithGroupAttr(DictCodes.ORG_STRUCTURE,
				DictCodes.STRG_ADDRESS);
		// Не знаю как через запрос отфильтровать ненужные результаты, поэтому пока так
		for (DescriptorValueWithDescAttr d : result) {
			for (DescriptorValueAttr a : d.getAttrs()) {
				DescriptorGroupAttr group = a.getAttrGroup();
				if (!DictCodes.STRG_ADDRESS.equals(group.getCode())) {
					d.getValues().remove(a.getRefDescValue());
				}
			}
		}
		return result;
	}

	/**
	 * Возвращает список телефонов относительно адресов
	 *
	 * @return список DescriptorValueWithDescAttr
	 */
	@RequestMapping("/phones")
	public List<DescriptorValueWithDescAttr> getPhones() {
		return attrRepo.findByGroupWithGroupAttr(DictCodes.ADDRESSES, DictCodes.PHONES);
	}

	/**
	 * Возвращает список всех пользователей
	 *
	 * @return список зарегестрированных в системе пользователей
	 */
	@RequestMapping("/users")
	public List<AdmUser> getUsers() {
		return userRepo.findAll();
	}

}
