package ru.insoft.archive.sic_storage;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class PersistenceResources {

	@PersistenceContext(unitName = "SicEntityManager")
	@Produces
	EntityManager em;
}
