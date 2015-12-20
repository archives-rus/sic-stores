package ru.insoft.archive.sic.storages.route;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;
import org.springframework.web.bind.annotation.RestController;
import ru.insoft.archive.sic.storages.DictCodes;
import ru.insoft.archive.sic.storages.FieldNames;
import ru.insoft.archive.sic.storages.domain.ChangeOperation;
import ru.insoft.archive.sic.storages.domain.ChangedField;
import ru.insoft.archive.sic.storages.domain.DocumentContent;
import ru.insoft.archive.sic.storages.domain.Name;
import ru.insoft.archive.sic.storages.domain.Organization;
import ru.insoft.archive.sic.storages.domain.Place;
import ru.insoft.archive.sic.storages.domain.Reward;
import ru.insoft.archive.sic.storages.domain.Trip;
import ru.insoft.archive.sic.storages.repos.ChangeOperationRepo;
import ru.insoft.archive.sic.storages.repos.DescriptorValueRepo;
import ru.insoft.archive.sic.storages.repos.OrganizationRepo;

/**
 * Работа с карточкой организации
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RestController
@RequestMapping("/organization")
public class OrganizationController {

	@Autowired
	private OrganizationRepo repo;

	@Autowired
	private ChangeOperationRepo coRepo;

	@Autowired
	private DescriptorValueRepo dvRepo;

	@RequestMapping(value = "/save", method = POST)
	public Long createCard(@RequestBody Organization organization) {
		coupleParents(organization);
		return repo.saveAndFlush(organization).getId();
	}

	@RequestMapping(value = "/save/{id}", method = PUT)
	public Long saveCard(@PathVariable("id") Long id,
			@RequestBody Organization organization) {
		Organization org = repo.findOne(id);
		organization.setAddUserId(org.getAddUserId());
		organization.setInsertDate(org.getInsertDate());
		coupleParents(organization);
		checkChangedValues(organization, org);
		return repo.saveAndFlush(organization).getId();
	}

	@RequestMapping(value = "/{id}", method = GET, produces = "application/json")
	public Organization getCard(@PathVariable("id") Long id) {
		return repo.findOne(id);
	}

	private void coupleParents(Organization organization) {
		for (Name name : organization.getNames()) {
			name.setOrganization(organization);
		}
		for (Place place : organization.getPlaces()) {
			for (DocumentContent doc : place.getDocs()) {
				doc.setPlace(place);
			}
			for (Trip trip : place.getTrips()) {
				trip.setPlace(place);
			}
			for (Reward reward : place.getRewards()) {
				reward.setPlace(place);
			}
			place.setOrganization(organization);
		}
	}

	/**
	 * Записывает все изменения
	 */
	@Async
	private void checkChangedValues(Organization newOrg, Organization oldOrg) {
		List<Name> namesNew = newOrg.getNames();
		List<Name> namesOld = oldOrg.getNames();
		int namesNewSize = namesNew.size();
		int namesOldSize = namesOld.size();

		List<ChangedField> changedFields = new ArrayList<>();
		int minSize = Math.min(namesNewSize, namesOldSize);
		int i = 0;
		// Обрабатываем наименования и переименования
		for (; i < minSize; ++i) {
			List<ChangedField> fields = Name.getChangedFields(namesNew.get(i), namesOld.get(i));
			if (!fields.isEmpty()) {
				changedFields.add(ChangedField.getInstance(FieldNames.NAME_ORG_AND_PERENAME, fields));
			}
		}
		if (i < namesNewSize) {
			for (; i < namesNewSize; ++i) {
				changedFields.add(ChangedField.getInstance(FieldNames.NAME_ORG_AND_PERENAME,
						Name.getChangedFields(namesNew.get(i), null)));
			}
		} else if (i < namesOldSize) {
			for (; i < namesOldSize; ++i) {
				changedFields.add(ChangedField.getInstance(FieldNames.NAME_ORG_AND_PERENAME,
						Name.getChangedFields(null, namesOld.get(i))));
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
			operation.setActionId(dvRepo.findOneByCode(DictCodes.EDIT_ACTION).getId());
			operation.setOrganizationId(oldOrg.getId());
			for (ChangedField field : changedFields) {
				operation.addField(field);
			}
			coRepo.save(operation);
		}
	}
}
