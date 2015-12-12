package ru.insoft.archive.sic.storages.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;
import org.springframework.web.bind.annotation.RestController;
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
	public Long saveCard(@PathVariable("id") Long id, @RequestBody Organization organization) {
		Organization org = repo.findOne(id);
		organization.setAddUserId(org.getAddUserId());
		organization.setInsertDate(org.getInsertDate());
		coupleParents(organization);
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
		for (Trip trip : organization.getTrips()) {
			trip.setOrganization(organization);
		}
		for (Reward reward : organization.getRewards()) {
			reward.setOrganization(organization);
		}
		for (Place place : organization.getPlaces()) {
			for (DocumentContent doc : place.getDocs()) {
				doc.setPlace(place);
			}
			place.setOrganization(organization);
		}
	}
}
