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
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.sic_storage.model.table.StrgFund;
import ru.insoft.archive.sic_storage.model.table.StrgOrganization;
import ru.insoft.archive.sic_storage.model.table.StrgPlaceArchive;
import ru.insoft.archive.sic_storage.model.table.StrgPlaceOrg;
import ru.insoft.archive.sic_storage.model.view.VStrgArchive;
import ru.insoft.archive.sic_storage.webmodel.FundFinder;
import ru.insoft.archive.sic_storage.webmodel.FundSearchCriteria;

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

    public StrgOrganization saveOrganization(StrgOrganization newOrg) throws Exception
    {
        StrgOrganization oldOrg = null;
        StrgFund oldFund = null;
        List<StrgPlaceArchive> oldArchPlaces = null;
        if (newOrg.getId() != null)
        {
            oldOrg = em.find(StrgOrganization.class, newOrg.getId());
            oldFund = oldOrg.getFund();
            oldArchPlaces = new ArrayList<StrgPlaceArchive>();
            for (StrgPlaceOrg orgPlace : oldOrg.getStorage())
                if (orgPlace.getArchStrg() != null)
                    oldArchPlaces.add(orgPlace.getArchStrg());
        }
        newOrg = (StrgOrganization)dbHandler.insertEntity(newOrg, oldOrg);
        if (!fundHasOrgs(oldFund))
            em.remove(oldFund);
        for (StrgPlaceArchive oldArchPlace : oldArchPlaces)
            if (!archStorageIsBeingUsed(oldArchPlace))
                em.remove(oldArchPlace);
        Query q = em.createNativeQuery("begin CTX_DDL.SYNC_INDEX('ITXT_STRG_ORG_NAME'); end;");
        q.executeUpdate();

        return newOrg;
    }
}