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
		QOrganizationSearch org = QOrganizationSearch.organizationSearch;
		List<BooleanExpression> exprs = new ArrayList<>();

		String strCondition = criteria.getOrg();
		if (strCondition != null) {
			exprs.add(org.fullName.like(strCondition));
		}

		Long longCondition = criteria.getDocType();
		if (longCondition != null) {
			exprs.add(org.organization.places.any().docs.any().type.eq(longCondition));
		}

		longCondition = criteria.getArchive();
		if (longCondition != null) {
			exprs.add(org.archiveId.eq(longCondition));
		}

		strCondition = criteria.getPrefix();
		if (strCondition != null) {
			exprs.add(org.fundPrefix.eq(strCondition));
		}

		Integer intCondition = criteria.getNumber();
		if (intCondition != null) {
			exprs.add(org.fundNumber.eq(intCondition));
		}

		strCondition = criteria.getSuffix();
		if (strCondition != null) {
			exprs.add(org.fundSuffix.eq(strCondition));
		}

		intCondition = criteria.getStartYear();
		if (intCondition != null) {
			exprs.add(org.beginYear.goe(intCondition));
		}

		intCondition = criteria.getEndYear();
		if (intCondition != null) {
			exprs.add(org.endYear.loe(intCondition));
		}

		return exprs.toArray(new BooleanExpression[0]);
	}

}
