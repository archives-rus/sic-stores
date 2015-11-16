package ru.insoft.archive.sic.storages.repos;

import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.Order;
import com.mysema.query.types.OrderSpecifier;
import com.mysema.query.types.Predicate;
import java.util.Collections;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QueryDslRepositorySupport;
import org.springframework.stereotype.Component;
import ru.insoft.archive.sic.storages.domain.QOrganizationSearch;
import ru.insoft.archive.sic.storages.dto.QTableOrgDto;
import ru.insoft.archive.sic.storages.dto.TableOrgDto;

/**
 * Выполняет постаничный поиск по организациям
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Component
public class OrganizationSearchRepo extends QueryDslRepositorySupport {

	public OrganizationSearchRepo() {
		super(TableOrgDto.class);
	}

	private Page<TableOrgDto> readPage(JPAQuery query, QTableOrgDto qEntity, Pageable pageable) {
// need to clone to have a second query, otherwise all items would be in the list
		long total = query.clone(getEntityManager()).count();
		JPQLQuery pagedQuery = getQuerydsl().applyPagination(pageable, query);
		List<TableOrgDto> content = total > pageable.getOffset() ? pagedQuery.list(qEntity)
				: Collections.<TableOrgDto>emptyList();
		return new PageImpl<>(content, pageable, total);
	}

	/**
	 * Возвращает страницу с результатами поиска, удволетворяющими условиям
	 *
	 * @param predicates условия поиска
	 * @param pageable параметры страницы (начало, размер)
	 * @return список записей по организациям
	 */
	public Page<TableOrgDto> search(Predicate[] predicates, Pageable pageable) {
		QOrganizationSearch org = QOrganizationSearch.organizationSearch;

		JPAQuery query = new JPAQuery(getEntityManager()).from(org);
		if (predicates.length != 0) {
			query.where(predicates);
		}
		query.orderBy(new OrderSpecifier<>(Order.ASC, org.fullName));
		return readPage(query, new QTableOrgDto(org.fullName, org.archiveName,
				org.completeFundNumber, org.years), pageable);
	}

}
