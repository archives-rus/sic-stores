package ru.insoft.archive.sic_storage.ejb;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import ru.insoft.archive.core_model.EntityMarker;
import ru.insoft.archive.sic_storage.model.view.VStrgArchive;

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
}