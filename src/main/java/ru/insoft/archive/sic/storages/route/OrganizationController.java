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
import ru.insoft.archive.sic.storages.domain.ChangedField;
import ru.insoft.archive.sic.storages.domain.DocumentContent;
import ru.insoft.archive.sic.storages.domain.Name;
import ru.insoft.archive.sic.storages.domain.Organization;
import ru.insoft.archive.sic.storages.domain.Place;
import ru.insoft.archive.sic.storages.domain.Reward;
import ru.insoft.archive.sic.storages.domain.Trip;
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

	@Async
	/**
	 * Записывает все изменения
	 */
	private void checkChangedValues(Organization newOrg, Organization oldOrg) {
		List<Name> namesNew = newOrg.getNames();
		List<Name> namesOld = oldOrg.getNames();
		int namesNewSize = namesNew.size();
		int namesOldSize = namesOld.size();

		List<ChangedField> namesFields = new ArrayList<>();
		int minSize = Math.min(namesNewSize, namesOldSize);
		int i = 0;
		for (; i < minSize; ++i) {
			List<ChangedField> fields = Name.getChangedFields(namesNew.get(i), namesOld.get(i));
			if (!fields.isEmpty()) {
				namesFields.add(ChangedField.getInstance("Наименование организации и ее переименование", fields));
			}
		}
		if (i < namesNewSize) {
			for (; i < namesNewSize; ++i) {
				namesFields.add(ChangedField.getInstance("Наименование организации и ее переименование",
						Name.getChangedFields(namesNew.get(i), null)));
			}
		} else if (i < namesOldSize) {
			for (; i < namesOldSize; ++i) {
				namesFields.add(ChangedField.getInstance("Наименование организации и ее переименование",
						Name.getChangedFields(null, namesOld.get(i))));
			}
		}
		showChanges(namesFields);
	}

	private void showChanges(List<ChangedField> fields) {
		for (ChangedField field : fields) {
			System.out.println(field.getName().toUpperCase());
			if (!field.getKids().isEmpty()) {
				showChanges(field.getKids());
			} else {
				System.out.println(field.getOldValue() + " --- " + field.getNewValue());
			}
		}
	}

}
