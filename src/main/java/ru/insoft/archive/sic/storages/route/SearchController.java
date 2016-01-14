package ru.insoft.archive.sic.storages.route;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.insoft.archive.sic.storages.domain.ChangeOperationLast;
import ru.insoft.archive.sic.storages.domain.Organization;
import ru.insoft.archive.sic.storages.domain.OrganizationWithChangeOperations;
import ru.insoft.archive.sic.storages.dto.SearchCriteria;
import ru.insoft.archive.sic.storages.dto.TableOrgDto;
import ru.insoft.archive.sic.storages.predicates.OrganizationSearchPredicate;
import ru.insoft.archive.sic.storages.repos.ChangeOperationSearchRepo;
import ru.insoft.archive.sic.storages.repos.OrganizationRepo;
import ru.insoft.archive.sic.storages.repos.OrganizationSearchRepo;
import ru.insoft.archive.sic.storages.repos.OrganizationWithChangeOperationsRepo;

/**
 * Обрабатывает поисковые запросы
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RestController
@RequestMapping("/search")
public class SearchController {

	@Autowired
	private OrganizationSearchRepo repo;

	@Autowired
	private OrganizationRepo orgRepo;

	@Autowired
	private ChangeOperationSearchRepo changeSearchRepo;

	@Autowired
	private OrganizationWithChangeOperationsRepo changeRepo;

	@RequestMapping("/main")
	public Page<TableOrgDto> mainSearch(Pageable pageable, @RequestParam("criteria") SearchCriteria criteria) {
		return repo.search(new OrganizationSearchPredicate(criteria).getPredicate(), pageable);
	}

	@RequestMapping("/jrch")
	public Page<ChangeOperationLast> jrchSearch(Pageable pageable, @RequestParam("criteria") SearchCriteria criteria) {
		return changeSearchRepo.search(new OrganizationSearchPredicate(criteria).getPredicate(), pageable);
	}

	@RequestMapping("/card")
	public Page<Organization> cardSearch(Pageable pageable, @RequestParam("criteria") SearchCriteria criteria) {
		Page<TableOrgDto> page = repo.search(new OrganizationSearchPredicate(criteria).getPredicate(), pageable);
		return new PageImpl<>(Arrays.asList(orgRepo.findOne(page.getContent().get(0).getOrgId())),
				pageable, page.getTotalElements());
	}

	@RequestMapping("/jcard")
	public Page<OrganizationWithChangeOperations> jCardSearch(Pageable pageable, @RequestParam("criteria") SearchCriteria criteria) {
		Page<ChangeOperationLast> page = changeSearchRepo.search(new OrganizationSearchPredicate(criteria).getPredicate(), pageable);
		return new PageImpl<>(Arrays.asList(changeRepo.findOne(page.getContent().get(0).getOrgId())),
				pageable, page.getTotalElements());
	}

}
