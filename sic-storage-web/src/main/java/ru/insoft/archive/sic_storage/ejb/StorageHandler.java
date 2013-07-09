package ru.insoft.archive.sic_storage.ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import ru.insoft.archive.core_model.EntityMarker;
import ru.insoft.archive.sic_storage.model.table.StrgFund;
import ru.insoft.archive.sic_storage.model.table.StrgPlaceArchive;
import ru.insoft.archive.sic_storage.model.view.VStrgArchive;
import ru.insoft.archive.sic_storage.webmodel.FundFinder;
import ru.insoft.archive.sic_storage.webmodel.FundSearchCriteria;

@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
public class StorageHandler
{
	@Inject
	EntityManager em;
	
	public List<EntityMarker> getArchives()
	{
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<EntityMarker> cq = cb.createQuery(EntityMarker.class);
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

    public List<EntityMarker> queryArchStorage(Long archiveId)
    {
        if (archiveId == null)
            return null;

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<EntityMarker> cq = cb.createQuery(EntityMarker.class);
        Root<StrgPlaceArchive> root = cq.from(StrgPlaceArchive.class);
        cq.select(root).where(cb.equal(root.get("archiveId"), archiveId));
        return em.createQuery(cq).getResultList();
    }
}