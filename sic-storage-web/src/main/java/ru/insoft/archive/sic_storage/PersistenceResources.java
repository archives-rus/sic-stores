package ru.insoft.archive.sic_storage;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class PersistenceResources {

	@PersistenceContext(unitName = "EntityManager")
	@Produces
	EntityManager em;
}
