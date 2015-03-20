package ru.insoft.archive.sic_storage.ejb;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

/**
 *
 * @author melnikov
 */
@Stateless(name = "JsonTools")
public class JsonTools extends ru.insoft.archive.extcommons.ejb.JsonTools
{
    @Inject
    EntityManager em;    

    @Override
    public EntityManager getEntityManager() 
    {
        return em;
    }    
}
