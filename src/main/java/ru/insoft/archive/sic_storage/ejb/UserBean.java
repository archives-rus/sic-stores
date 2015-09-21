package ru.insoft.archive.sic_storage.ejb;

import javax.annotation.Resource;
import javax.ejb.EJBContext;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Stateful;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

/**
 *
 * @author Благодатских С.
 */
@Lock(LockType.READ)
@Stateful
@SessionScoped
@UserInfoStore
public class UserBean extends ru.insoft.archive.extcommons.ejb.UserInfo {

	@Resource
	EJBContext ctx;

	@Inject
	EntityManager em;

	@Override
	public EntityManager getEntityManager() {
		return em;
	}

	@Override
	public EJBContext getEjbContext() {
		return ctx;
	}

}
