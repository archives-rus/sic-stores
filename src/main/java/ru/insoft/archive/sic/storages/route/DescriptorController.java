package ru.insoft.archive.sic.storages.route;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.insoft.archive.sic.storages.DictCodes;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;
import ru.insoft.archive.sic.storages.repos.DescriptorValueRepo;

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

}
