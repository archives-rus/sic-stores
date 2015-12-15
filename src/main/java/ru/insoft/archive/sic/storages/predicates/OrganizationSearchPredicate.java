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
			exprs.add(organization.organization.names.any().full.toLowerCase().like("%" + strCondition.toLowerCase() + "%"));
		}

		Long longCondition = criteria.getArchive();
		if (longCondition != null) {
			exprs.add(organization.archiveId.eq(longCondition));
		}

		longCondition = criteria.getLevel();
		if (longCondition != null) {
			exprs.add(organization.levelId.eq(longCondition));
		}

		Integer intCondition = criteria.getNumber();
		if (intCondition != null) {
			exprs.add(organization.fundNumber.eq(intCondition));
		}

		strCondition = criteria.getPrefix();
		if (strCondition != null) {
			exprs.add(organization.fundPrefix.eq(strCondition));
		}

		strCondition = criteria.getSuffix();
		if (strCondition != null) {
			exprs.add(organization.fundSuffix.eq(strCondition));
		}

		longCondition = criteria.getDocType();
		if (longCondition != null) {
			exprs.add(organization.place.docs.any().type.eq(longCondition));
		}

		Integer startDate = criteria.getStartYear();
		Integer endDate = criteria.getEndYear();
		if (startDate != null && endDate != null) {
			exprs.add(organization.startYear.loe(startDate)
					.and(organization.endYear.goe(endDate)));
		} else if (startDate != null) {
			exprs.add(organization.startYear.loe(startDate)
					.and(organization.endYear.goe(startDate)));
		} else if (endDate != null) {
			exprs.add(organization.startYear.loe(endDate)
					.and(organization.endYear.goe(endDate)));
		}
		return exprs.toArray(new BooleanExpression[0]);
	}

}
