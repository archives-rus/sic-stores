package ru.insoft.archive.sic.storages.predicates;

import com.mysema.query.types.expr.BooleanExpression;
import java.util.ArrayList;
import java.util.List;
import ru.insoft.archive.sic.storages.domain.QOrganizationSearch;
import ru.insoft.archive.sic.storages.dto.SearchCriteria;

/**
 * Класс для создания условий поиска организаций
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class OrganizationSearchPredicate {

	private final SearchCriteria criteria;

	public OrganizationSearchPredicate(SearchCriteria criteria) {
		this.criteria = criteria;
	}

	public BooleanExpression[] getPredicate() {
		QOrganizationSearch organization = QOrganizationSearch.organizationSearch;
		List<BooleanExpression> exprs = new ArrayList<>();

		String strCondition = criteria.getOrg();
		if (strCondition != null) {
			exprs.add(organization.name.toLowerCase().like("%" + strCondition.toLowerCase() + "%"));
		}
		
		Long longCondition = criteria.getArchive();
		if (longCondition != null) {
		}

		return exprs.toArray(new BooleanExpression[0]);
	}

}
