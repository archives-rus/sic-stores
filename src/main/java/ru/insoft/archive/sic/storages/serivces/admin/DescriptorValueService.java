package ru.insoft.archive.sic.storages.serivces.admin;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;
import ru.insoft.archive.sic.storages.repos.DescriptorValueRepo;

/**
 * Сервис для полученя значений справочников
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Service
public class DescriptorValueService {

	@Autowired
	private DescriptorValueRepo repo;

	/**
	 * Возвращает список значений справочника в соответствии с кодом группы.
	 * Если в группе стоит флаг сортировать в алфавитном порядке будет
	 * произведена эта сортировка, если нет, то результат будет отсортирован в
	 * соответствии с порядком, определенным для каждого значения.
	 *
	 * @param group код для группы дескрипторов
	 * @return список значений дескрипторов
	 */
	public List<DescriptorValue> findValuesByGroup(String group) {
		return repo.findByGroupCode(group);
	}

	/**
	 * Возвращает дочерние значения заданного значения
	 *
	 * @param parentCode код значения родителя
	 * @return список значений дескрипторов
	 */
	public List<DescriptorValue> findValuesByParent(String parentCode) {
		return repo.findByParent(repo.findOneByCode(parentCode));
	}
}
