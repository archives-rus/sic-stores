package ru.insoft.archive.sic.storages.serivces;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ru.insoft.archive.sic.storages.DictCodes;
import ru.insoft.archive.sic.storages.FieldNames;
import ru.insoft.archive.sic.storages.domain.ChangeOperation;
import ru.insoft.archive.sic.storages.domain.ChangedField;
import ru.insoft.archive.sic.storages.domain.Name;
import ru.insoft.archive.sic.storages.domain.Organization;
import ru.insoft.archive.sic.storages.domain.Place;
import ru.insoft.archive.sic.storages.repos.ChangeOperationRepo;
import ru.insoft.archive.sic.storages.repos.DescriptorValueRepo;
import ru.insoft.archive.sic.storages.utils.ChangedFieldsGetter;

/**
 * Записывает изменения по организациям
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Service
public class JrchSaverService {

	@Autowired
	private ChangeOperationRepo coRepo;

	@Autowired
	private DescriptorValueRepo dvRepo;

	@Autowired
	private ChangedFieldsGetter cfGetter;

	/**
	 * Записывает все изменения
	 * @param newOrg информация для вставки
	 * @param oldOrg существующая инфорамция в базе
	 */
//	Проблемы при определении пользователя и другие @Async
	public void checkChangedValues(Organization newOrg, Organization oldOrg) {
		List<Name> namesNew = newOrg.getNames();
		List<Name> namesOld = oldOrg.getNames();
		Collections.sort(namesOld);
		Collections.sort(namesNew);
		int namesNewSize = namesNew.size();
		int namesOldSize = namesOld.size();

		List<ChangedField> changedFields = new ArrayList<>();
		int minSize = Math.min(namesNewSize, namesOldSize);
		int i = 0;
		// Обрабатываем наименования и переименования
		for (; i < minSize; ++i) {
			List<ChangedField> fields = cfGetter.getChangedFields(namesNew.get(i), namesOld.get(i));
			if (!fields.isEmpty()) {
				changedFields.add(ChangedField.getInstance(FieldNames.NAME_ORG_AND_PERENAME, fields));
			}
		}
		if (i < namesNewSize) {
			for (; i < namesNewSize; ++i) {
				changedFields.add(ChangedField.getInstance(FieldNames.NAME_ORG_AND_PERENAME,
						cfGetter.getChangedFields(namesNew.get(i), null)));
			}
		} else if (i < namesOldSize) {
			for (; i < namesOldSize; ++i) {
				changedFields.add(ChangedField.getInstance(FieldNames.NAME_ORG_AND_PERENAME,
						cfGetter.getChangedFields(null, namesOld.get(i))));
			}
		}

		List<Place> placesNew = newOrg.getPlaces();
		List<Place> placesOld = oldOrg.getPlaces();
		int placesNewSize = placesNew.size();
		int placesOldSize = placesOld.size();
		minSize = Math.min(placesNewSize, placesOldSize);
		// Обрабатываем места хранения
		for (i = 0; i < minSize; ++i) {
			List<ChangedField> fields = Place.getChangedFields(placesNew.get(i), placesOld.get(i), dvRepo);
			if (!fields.isEmpty()) {
				changedFields.add(ChangedField.getInstance(FieldNames.STORE_PLACE, fields));
			}
		}
		if (i < placesNewSize) {
			for (; i < placesNewSize; ++i) {
				changedFields.add(ChangedField.getInstance(FieldNames.STORE_PLACE,
						Place.getChangedFields(placesNew.get(i), null, dvRepo)));
			}
		} else if (i < placesOldSize) {
			for (; i < placesOldSize; ++i) {
				changedFields.add(ChangedField.getInstance(FieldNames.STORE_PLACE,
						Place.getChangedFields(null, placesOld.get(i), dvRepo)));
			}
		}

		if (!changedFields.isEmpty()) {
			ChangeOperation operation = new ChangeOperation();
			operation.setActionId(dvRepo.findOneByCodeAndGroup_Code(DictCodes.EDIT_ACTION, DictCodes.ACTION_TYPE).getId());
			operation.setOrganizationId(oldOrg.getId());
			for (ChangedField field : changedFields) {
				operation.addField(field);
			}
			coRepo.save(operation);
		}
	}
}
