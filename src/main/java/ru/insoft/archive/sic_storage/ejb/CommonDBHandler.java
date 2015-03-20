package ru.insoft.archive.sic_storage.ejb;

import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import ru.insoft.archive.extcommons.ejb.UserInfo;

/**
 *
 * @author melnikov
 */
@Stateless(name = "CommonDBHandler")
@TransactionManagement(TransactionManagementType.CONTAINER)
public class CommonDBHandler extends ru.insoft.archive.extcommons.ejb.CommonDBHandler {

	@Inject
	EntityManager em;

	@Resource
	SessionContext context;

	@Inject
	@UserInfoStore
	UserInfo userInfo;

	@Override
	public EntityManager getEntityManager() {
		return em;
	}

	@Override
	public UserInfo getUserInfo() {
		return userInfo;
	}

	@Override
	public SessionContext getContext() {
		return context;
	}

}
