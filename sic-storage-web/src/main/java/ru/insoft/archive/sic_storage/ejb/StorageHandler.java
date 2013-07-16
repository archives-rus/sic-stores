package ru.insoft.archive.sic_storage.ejb;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.Tuple;
import javax.persistence.criteria.*;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.utils.StringUtils;
import ru.insoft.archive.sic_storage.model.table.*;
import ru.insoft.archive.sic_storage.model.view.*;
import ru.insoft.archive.sic_storage.webmodel.FundFinder;
import ru.insoft.archive.sic_storage.webmodel.FundSearchCriteria;
import ru.insoft.archive.sic_storage.webmodel.OrgSearchCriteria;
import ru.insoft.archive.sic_storage.webmodel.OrgSearchResult;

@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
public class StorageHandler
{
	@Inject
	EntityManager em;
    @Inject
    CommonDBHandler dbHandler;
	
	public List<JsonOut> getArchives()
	{
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<JsonOut> cq = cb.createQuery(JsonOut.class);
		Root<VStrgArchive> root = cq.from(VStrgArchive.class);
		return em.createQuery(cq.select(root)).getResultList();
	}

    public FundFinder searchFund(Long archiveId, FundSearchCriteria criteria)
    {
        FundFinder res = new FundFinder();
        if (archiveId == null || criteria == null || criteria.getNum() == null)
            return res;

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StrgFund> cq = cb.createQuery(StrgFund.class);
        Root<StrgFund> root = cq.from(StrgFund.class);
        cq.select(root).where(cb.and(
                cb.equal(root.get("archiveId"), archiveId),
                cb.equal(root.get("num"), criteria.getNum()),
                criteria.getPrefix() == null ? cb.isNull(root.get("prefix")) : cb.equal(root.get("prefix"), criteria.getPrefix()),
                criteria.getSuffix() == null ? cb.isNull(root.get("suffix")) : cb.equal(root.get("suffix"), criteria.getSuffix())
        ));
        try
        {
            StrgFund fund = em.createQuery(cq).getSingleResult();
            res.setFound(true);
            res.setFund(fund);
        }
        catch (NoResultException e)
        {

        }

        return res;
    }

    public List<JsonOut> queryArchStorage(Long archiveId)
    {
        if (archiveId == null)
            return null;

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<JsonOut> cq = cb.createQuery(JsonOut.class);
        Root<StrgPlaceArchive> root = cq.from(StrgPlaceArchive.class);
        cq.select(root).where(cb.equal(root.get("archiveId"), archiveId));
        return em.createQuery(cq).getResultList();
    }

    protected boolean fundHasOrgs(StrgFund fund)
    {
        if (fund == null)
            return true;

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Integer> cq = cb.createQuery(Integer.class);
        Root<StrgOrganization> root = cq.from(StrgOrganization.class);
        cq.select(cb.literal(1)).where(cb.equal(root.get("fund"), fund));
        try
        {
            em.createQuery(cq).setMaxResults(1).getSingleResult();
            return true;
        }
        catch (NoResultException e)
        {
            return false;
        }
    }

    protected boolean archStorageIsBeingUsed(StrgPlaceArchive archStrg)
    {
        if (archStrg == null)
            return true;

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Integer> cq = cb.createQuery(Integer.class);
        Root<StrgPlaceOrg> root = cq.from(StrgPlaceOrg.class);
        cq.select(cb.literal(1)).where(cb.equal(root.get("archStrg"), archStrg));
        try
        {
            em.createQuery(cq).setMaxResults(1).getSingleResult();
            return true;
        }
        catch (NoResultException e)
        {
            return false;
        }
    }

    public StrgOrganization modifyOrganization(String action, Long id, StrgOrganization newOrg) throws Exception
    {
        StrgOrganization oldOrg = null;
        StrgFund oldFund = null;
        List<StrgPlaceArchive> oldArchPlaces = null;
        if (id != null)
        {
            oldOrg = em.find(StrgOrganization.class, id);
            oldFund = oldOrg.getFund();
            oldArchPlaces = new ArrayList<StrgPlaceArchive>();
            for (StrgPlaceOrg orgPlace : oldOrg.getStorage())
                if (orgPlace.getArchStrg() != null)
                    oldArchPlaces.add(orgPlace.getArchStrg());
        }

        if ("SAVE".equals(action))
            newOrg = (StrgOrganization)dbHandler.insertEntity(newOrg, oldOrg);
        if ("DELETE".equals(action))
            em.remove(oldOrg);

        if (!fundHasOrgs(oldFund))
            em.remove(oldFund);
        if (oldArchPlaces != null)
            for (StrgPlaceArchive oldArchPlace : oldArchPlaces)
                if (!archStorageIsBeingUsed(oldArchPlace))
                    em.remove(oldArchPlace);
        Query q = em.createNativeQuery("begin CTX_DDL.SYNC_INDEX('ITXT_STRG_ORG_NAME'); end;");
        q.executeUpdate();

        return newOrg;
    }

    public List<OrgSearchResult> searchOrganization(OrgSearchCriteria criteria, Integer start, Integer limit)
    {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<OrgSearchResult> cq = cb.createQuery(OrgSearchResult.class);
        Root<VStrgOrgForSearch> root = cq.from(VStrgOrgForSearch.class);
        cq.multiselect(root.<Long>get("id"), root.<String>get("name"),
                root.<String>get("archive"), root.<String>get("fund"),
                cb.<String>function("get_org_storage_years", String.class, root.<Long>get("id")).alias("dates"));

        List<Predicate> predicates = new ArrayList<Predicate>();
        if (criteria.getOrgName() != null)
            predicates.add(cb.greaterThan(cb.function("contains", Integer.class,
                    root.get("indexedName"), cb.literal(StringUtils.textRequest(criteria.getOrgName()))), 0));
        if (criteria.getArchiveId() != null)
            predicates.add(cb.equal(root.get("archiveId"), criteria.getArchiveId()));
        if (criteria.getFund() != null && criteria.getFund().getNum() != null)
        {
            predicates.add(cb.equal(root.get("fundNum"), criteria.getFund().getNum()));
            predicates.add(criteria.getFund().getPrefix() == null ?
                    cb.isNull(root.get("prefix")) :
                    cb.equal(root.get("prefix"), criteria.getFund().getPrefix()));
            predicates.add(criteria.getFund().getSuffix() == null ?
                    cb.isNull(root.get("suffix")) :
                    cb.equal(root.get("suffix"), criteria.getFund().getSuffix()));
        }
        if (criteria.getDocumentTypeId() != null || criteria.getYearFrom() != null)
        {
            Subquery<Long> sub = cq.subquery(Long.class);
            Root<StrgPlaceOrg> subroot = sub.from(StrgPlaceOrg.class);
            sub.select(subroot.<Long>get("orgId"));
            List<Predicate> subPredicates = new ArrayList<Predicate>();

            if (criteria.getDocumentTypeId() != null)
            {
                Join<StrgPlaceOrg, StrgDocContents> join = subroot.join("documents");
                subPredicates.add(cb.equal(join.get("documentTypeId"), criteria.getDocumentTypeId()));
            }
            if (criteria.getYearFrom() != null && criteria.getYearTo() == null)
                subPredicates.add(cb.and(
                        cb.lessThanOrEqualTo(subroot.<Integer>get("beginYear"), criteria.getYearFrom()),
                        cb.greaterThanOrEqualTo(subroot.<Integer>get("endYear"), criteria.getYearFrom())));
            if (criteria.getYearFrom() != null && criteria.getYearTo() != null)
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
            sub.where(subPredicates.toArray(new Predicate[0]));
            predicates.add(cb.in(root.get("id")).value(sub));
        }

        cq.where(predicates.toArray(new Predicate[0]));
        cq.orderBy(cb.asc(root.get("name")));

        return em.createQuery(cq).setFirstResult(start).setMaxResults(limit).getResultList();
    }

    public StrgOrganization prepareOrgForEdit(Long id)
    {
        StrgOrganization org = em.find(StrgOrganization.class, id);
        org.setUserName(em.find(AdmUser.class, org.getModUserId()).getName());
        dbHandler.initCollection(org.getStorage());
        return org;
    }

    public VStrgOrgForView prepareOrgForView(Long id)
    {
        VStrgOrgForView org = em.find(VStrgOrgForView.class, id);
        dbHandler.initCollection(org.getStorage());
        return org;
    }

    public List<StrgOrgName> getOrgNames(Long id)
    {
        StrgOrganization org = em.find(StrgOrganization.class, id);
        return dbHandler.initCollection(org.getNames());
    }

    public List<StrgDocContents> getDocumentsForEdit(Long storageId)
    {
        StrgPlaceOrg storage = em.find(StrgPlaceOrg.class, storageId);
        return dbHandler.initCollection(storage.getDocuments());
    }

    public List<VStrgDocContents> getDocumentsForView(Long storageId)
    {
        VStrgPlaceOrg storage = em.find(VStrgPlaceOrg.class, storageId);
        return dbHandler.initCollection(storage.getDocuments());
    }
}