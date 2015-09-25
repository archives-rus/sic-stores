package ru.insoft.archive.sic.storages.route;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.insoft.archive.sic.storages.DictCodes;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;
import ru.insoft.archive.sic.storages.serivces.admin.DescriptorValueService;

/**
 * Предоставляет разные справочные данные
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RestController
@RequestMapping("/dict")
public class DescriptorController {

	@Autowired
	private DescriptorValueService dvs;

	@RequestMapping("/docTypes")
	public List<DescriptorValue> getDocTypes() {
		return dvs.findValuesByGroup(DictCodes.DOCUMENT_TYPE);
	}

	@RequestMapping("/archives")
	public List<DescriptorValue> getArchives() {
		return dvs.findValuesByParent(DictCodes.MEMBER_SIC);
	}
}
