package ru.insoft.archive.sic_storage.ejb;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.utils.StringUtils;
import ru.insoft.archive.sic_storage.model.table.StrgDocContents;
import ru.insoft.archive.sic_storage.model.table.StrgFund;
import ru.insoft.archive.sic_storage.model.table.StrgOrgName;
import ru.insoft.archive.sic_storage.model.table.StrgOrganization;
import ru.insoft.archive.sic_storage.model.table.StrgPlaceArchive;
import ru.insoft.archive.sic_storage.model.table.StrgPlaceOrg;
import ru.insoft.archive.sic_storage.model.view.VStrgArchive;
import ru.insoft.archive.sic_storage.model.view.VStrgDocContents;
import ru.insoft.archive.sic_storage.model.view.VStrgOrgForSearch;
import ru.insoft.archive.sic_storage.model.view.VStrgOrgForView;
import ru.insoft.archive.sic_storage.model.view.VStrgPlaceOrg;
import ru.insoft.archive.sic_storage.webmodel.FundFinder;
import ru.insoft.archive.sic_storage.webmodel.FundSearchCriteria;
import ru.insoft.archive.sic_storage.webmodel.OrgSearchCriteria;
import ru.insoft.archive.sic_storage.webmodel.OrgSearchInfo;
import ru.insoft.archive.sic_storage.webmodel.OrgSearchResult;

@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
public class StorageHandler {

	@PersistenceContext(unitName = "StorageEntityManager")
	EntityManager em;
	@Inject
	CommonDBHandler dbHandler;

	public List<JsonOut> getArchives() {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<JsonOut> cq = cb.createQuery(JsonOut.class);
		Root<VStrgArchive> root = cq.from(VStrgArchive.class);
		return em.createQuery(cq.select(root)).getResultList();
	}

	public FundFinder searchFund(Long archiveId, FundSearchCriteria criteria) {
		FundFinder res = new FundFinder();
		if (archiveId == null || criteria == null || criteria.getNum() == null) {
			return res;
		}

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<StrgFund> cq = cb.createQuery(StrgFund.class);
		Root<StrgFund> root = cq.from(StrgFund.class);
		cq.select(root).where(cb.and(
			cb.equal(root.get("archiveId"), archiveId),
			cb.equal(root.get("num"), criteria.getNum()),
			criteria.getPrefix() == null ? cb.isNull(root.get("prefix")) : cb.equal(root.get("prefix"), criteria.getPrefix()),
			criteria.getSuffix() == null ? cb.isNull(root.get("suffix")) : cb.equal(root.get("suffix"), criteria.getSuffix())
		));
		try {
			StrgFund fund = em.createQuery(cq).getSingleResult();
			res.setFound(true);
			res.setFund(fund);
		} catch (NoResultException e) {

		}

		return res;
	}

	public List<JsonOut> queryArchStorage(Long archiveId) {
		if (archiveId == null) {
			return null;
		}

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<JsonOut> cq = cb.createQuery(JsonOut.class);
		Root<StrgPlaceArchive> root = cq.from(StrgPlaceArchive.class);
		cq.select(root).where(cb.equal(root.get("archiveId"), archiveId));
		return em.createQuery(cq).getResultList();
	}

	protected boolean fundHasOrgs(StrgFund fund) {
		if (fund == null) {
			return true;
		}

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Integer> cq = cb.createQuery(Integer.class);
		Root<StrgOrganization> root = cq.from(StrgOrganization.class);
		cq.select(cb.literal(1)).where(cb.equal(root.get("fund"), fund));
		try {
			em.createQuery(cq).setMaxResults(1).getSingleResult();
			return true;
		} catch (NoResultException e) {
			return false;
		}
	}

	protected boolean archStorageIsBeingUsed(StrgPlaceArchive archStrg) {
		if (archStrg == null) {
			return true;
		}

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Integer> cq = cb.createQuery(Integer.class);
		Root<StrgPlaceOrg> root = cq.from(StrgPlaceOrg.class);
		cq.select(cb.literal(1)).where(cb.equal(root.get("archStrg"), archStrg));
		try {
			em.createQuery(cq).setMaxResults(1).getSingleResult();
			return true;
		} catch (NoResultException e) {
			return false;
		}
	}

	public StrgOrganization modifyOrganization(String action, Long id, StrgOrganization newOrg) throws Exception {
		StrgOrganization oldOrg = null;
		StrgFund oldFund = null;
		List<StrgPlaceArchive> oldArchPlaces = null;
		if (id != null) {
			oldOrg = em.find(StrgOrganization.class, id);
			oldFund = oldOrg.getFund();
			oldArchPlaces = new ArrayList<StrgPlaceArchive>();
			for (StrgPlaceOrg orgPlace : oldOrg.getStorage()) {
				if (orgPlace.getArchStrg() != null) {
					oldArchPlaces.add(orgPlace.getArchStrg());
				}
			}
		}

		if ("SAVE".equals(action)) {
			newOrg = (StrgOrganization) dbHandler.insertEntity(newOrg, oldOrg);
		}
		if ("DELETE".equals(action)) {
			em.remove(oldOrg);
		}

		if (!fundHasOrgs(oldFund)) {
			em.remove(oldFund);
		}
		if (oldArchPlaces != null) {
			for (StrgPlaceArchive oldArchPlace : oldArchPlaces) {
				if (!archStorageIsBeingUsed(oldArchPlace)) {
					em.remove(oldArchPlace);
				}
			}
		}
		em.flush();
		Query q = em.createNativeQuery("begin CTX_DDL.SYNC_INDEX('ITXT_STRG_ORG_NAME'); end;");
		q.executeUpdate();

		return newOrg;
	}

	protected <T> Predicate[] getSearchPredicates(CriteriaBuilder cb, CriteriaQuery<T> cq,
		Root<VStrgOrgForSearch> root, OrgSearchCriteria criteria) {
		List<Predicate> predicates = new ArrayList<Predicate>();
		if (criteria.getOrgName() != null) {
			predicates.add(cb.greaterThan(cb.function("contains", Integer.class,
				root.get("indexedName"), cb.literal(StringUtils.textRequest(criteria.getOrgName()))), 0));
		}
		if (criteria.getArchiveId() != null) {
			predicates.add(cb.equal(root.get("archiveId"), criteria.getArchiveId()));
		}
		if (criteria.getFund() != null && criteria.getFund().getNum() != null) {
			predicates.add(cb.equal(root.get("fundNum"), criteria.getFund().getNum()));
			predicates.add(criteria.getFund().getPrefix() == null
				? cb.isNull(root.get("prefix"))
				: cb.equal(root.get("prefix"), criteria.getFund().getPrefix()));
			predicates.add(criteria.getFund().getSuffix() == null
				? cb.isNull(root.get("suffix"))
				: cb.equal(root.get("suffix"), criteria.getFund().getSuffix()));
		}
		if (criteria.getDocumentTypeId() != null || criteria.getYearFrom() != null) {
			Subquery<Long> sub = cq.subquery(Long.class);
			Root<StrgPlaceOrg> subroot = sub.from(StrgPlaceOrg.class);
			sub.select(subroot.<Long>get("orgId"));
			List<Predicate> subPredicates = new ArrayList<Predicate>();

			if (criteria.getDocumentTypeId() != null) {
				Join<StrgPlaceOrg, StrgDocContents> join = subroot.join("documents");
				subPredicates.add(cb.equal(join.get("documentTypeId"), criteria.getDocumentTypeId()));
			}
			if (criteria.getYearFrom() != null && criteria.getYearTo() == null) {
				subPredicates.add(cb.and(
					cb.lessThanOrEqualTo(subroot.<Integer>get("beginYear"), criteria.getYearFrom()),
					cb.greaterThanOrEqualTo(subroot.<Integer>get("endYear"), criteria.getYearFrom())));
			}
			if (criteria.getYearFrom() != null && criteria.getYearTo() != null) {
				subPredicates.add(cb.or(
					cb.and(
						cb.lessThanOrEqualTo(subroot.<Integer>get("beginYear"), criteria.getYearFrom()),
						cb.greaterThanOrEqualTo(subroot.<Integer>get("endYear"), criteria.getYearFrom())
					),
					cb.and(
						cb.lessThanOrEqualTo(subroot.<Integer>get("beginYear"), criteria.getYearTo()),
						cb.greaterThanOrEqualTo(subroot.<Integer>get("endYear"), criteria.getYearTo())
					),
					cb.and(
						cb.lessThanOrEqualTo(subroot.<Integer>get("endYear"), criteria.getYearTo()),
						cb.greaterThanOrEqualTo(subroot.<Integer>get("beginYear"), criteria.getYearFrom())
					)
				));
			}
			sub.where(subPredicates.toArray(new Predicate[0]));
			predicates.add(cb.in(root.get("orgId")).value(sub));
		}
		return predicates.toArray(new Predicate[0]);
	}

	public OrgSearchInfo searchOrganization(OrgSearchCriteria criteria, Integer start, Integer limit) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Long> cntQuery = cb.createQuery(Long.class);
		Root<VStrgOrgForSearch> cntRoot = cntQuery.from(VStrgOrgForSearch.class);
		cntQuery.select(cb.count(cntRoot));
		cntQuery.where(getSearchPredicates(cb, cntQuery, cntRoot, criteria));

		OrgSearchInfo osi = new OrgSearchInfo();
		osi.setResults(em.createQuery(cntQuery).getSingleResult().intValue());
		if (osi.getResults() <= start) {
			osi.setValues(new ArrayList<OrgSearchResult>());
		} else {
			CriteriaQuery<OrgSearchResult> valQuery = cb.createQuery(OrgSearchResult.class);
			Root<VStrgOrgForSearch> valRoot = valQuery.from(VStrgOrgForSearch.class);
			valQuery.multiselect(valRoot.<Long>get("id"), valRoot.<Long>get("orgId"),
				valRoot.<String>get("name"), valRoot.<String>get("archive"),
				valRoot.<String>get("fund"),
				cb.<String>function("get_org_storage_years", String.class,
					valRoot.<Long>get("orgId")).alias("dates"));
			valQuery.where(getSearchPredicates(cb, valQuery, valRoot, criteria));
			valQuery.orderBy(cb.asc(valRoot.get("name")));
			osi.setValues(em.createQuery(valQuery)
				.setFirstResult(start).setMaxResults(limit).getResultList());
		}

		return osi;
	}

	public StrgOrganization prepareOrgForEdit(Long id) {
		StrgOrganization org = em.find(StrgOrganization.class, id);
		org.setUserName(em.find(AdmUser.class, org.getModUserId()).getName());
		dbHandler.initCollection(org.getStorage());
		return org;
	}

	public VStrgOrgForView prepareOrgForView(Long id) {
		VStrgOrgForView org = em.find(VStrgOrgForView.class, id);
		dbHandler.initCollection(org.getStorage());
		return org;
	}

	public List<StrgOrgName> getOrgNames(Long id) {
		StrgOrganization org = em.find(StrgOrganization.class, id);
		return dbHandler.initCollection(org.getNames());
	}

	public List<StrgDocContents> getDocumentsForEdit(Long storageId) {
		StrgPlaceOrg storage = em.find(StrgPlaceOrg.class, storageId);
		return dbHandler.initCollection(storage.getDocuments());
	}

	public List<VStrgDocContents> getDocumentsForView(Long storageId) {
		VStrgPlaceOrg storage = em.find(VStrgPlaceOrg.class, storageId);
		return dbHandler.initCollection(storage.getDocuments());
	}
}
