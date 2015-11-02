package ru.insoft.archive.sic.storages.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.insoft.archive.sic.storages.dto.SearchCriteria;
import ru.insoft.archive.sic.storages.dto.TableOrgDto;
import ru.insoft.archive.sic.storages.predicates.OrganizationSearchPredicate;
import ru.insoft.archive.sic.storages.repos.OrganizationSearchRepo;

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

	@RequestMapping("/main")
	public Page<TableOrgDto> mainSearch(Pageable pageable, @RequestParam("criteria") SearchCriteria criteria) {
		return repo.search(new OrganizationSearchPredicate(criteria).getPredicate(), pageable);
	}

	@RequestMapping("/card")
	public Object cardSearch(@RequestParam(value = "archive", required = false) Long archive,
			@RequestParam(value = "docType", required = false) Long docType, @RequestParam(value = "startYear", required = false) Short startYear,
			@RequestParam(value = "endYear", required = false) Short endYear, @RequestParam(value = "number", required = false) Integer number,
			@RequestParam(value = "prefix", required = false) String prefix, @RequestParam(value = "suffix", required = false) String suffix,
			@RequestParam(value = "org", required = false) String orgName, @RequestParam("start") Long start) {
		return String.format("%s, %s, %s, %s, %s, %s, %s, %s, %s", archive, docType, startYear,
				endYear, number, prefix, suffix, orgName, start);
	}

}
