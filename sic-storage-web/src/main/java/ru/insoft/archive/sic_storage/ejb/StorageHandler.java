package ru.insoft.archive.sic_storage.ejb;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import javax.ejb.EJBContext;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.entity.HasUserInfo;
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

	@PersistenceContext(unitName = "SicEntityManager")
	EntityManager em;
	@Resource
	private EJBContext ejbContext;
	@Resource
	private javax.ejb.SessionContext context;

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
		} catch (NoResultException | NonUniqueResultException e) {

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
			newOrg = (StrgOrganization) insertEntity(newOrg, oldOrg);
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
		initCollection(org.getStorage());
		return org;
	}

	public VStrgOrgForView prepareOrgForView(Long id) {
		VStrgOrgForView org = em.find(VStrgOrgForView.class, id);
		initCollection(org.getStorage());
		return org;
	}

	public List<StrgOrgName> getOrgNames(Long id) {
		StrgOrganization org = em.find(StrgOrganization.class, id);
		return initCollection(org.getNames());
	}

	public List<StrgDocContents> getDocumentsForEdit(Long storageId) {
		StrgPlaceOrg storage = em.find(StrgPlaceOrg.class, storageId);
		return initCollection(storage.getDocuments());
	}

	public List<VStrgDocContents> getDocumentsForView(Long storageId) {
		VStrgPlaceOrg storage = em.find(VStrgPlaceOrg.class, storageId);
		return initCollection(storage.getDocuments());
	}

	/**
	 * Добавляет в таблицу новую сущность, которая реализует интерфейс
	 * {@code HasId}. Если oldEntity не равен null, то производится обновление
	 * существующей записи.
	 *
	 * @param newEntity новая сущность
	 * @param oldEntity старая сущность (можеть быть null)
	 * @return новая сущность в случае успешной вставки
	 * @throws Exception в случае ошибки
	 */
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public HasId insertEntity(HasId newEntity, HasId oldEntity)
		throws Exception {
		try {
			if (oldEntity == null && newEntity.getId() != null) {
				oldEntity = em.find(newEntity.getClass(), newEntity.getId());
			}

			if (HasUserInfo.class.isAssignableFrom(newEntity.getClass())) {
				AdmUser user = getUser();
				if (user == null) {
					throw new Exception("Not authorized user");
				}
				HasUserInfo newEntityWithUser = (HasUserInfo) newEntity;
				newEntityWithUser.setModUserId(user.getId());
				newEntityWithUser.setLastUpdateDate(new Date());
				if (newEntity.getId() == null) {
					newEntityWithUser.setAddUserId(newEntityWithUser
						.getModUserId());
					newEntityWithUser.setInsertDate(newEntityWithUser
						.getLastUpdateDate());
				} else {
					HasUserInfo oldEntityWithUser = (HasUserInfo) oldEntity;
					newEntityWithUser.setAddUserId(oldEntityWithUser
						.getAddUserId());
					newEntityWithUser.setInsertDate(oldEntityWithUser
						.getInsertDate());
				}
			}

			if (oldEntity != null) {
				for (Field f : newEntity.getClass().getDeclaredFields()) {
					if (List.class.equals(f.getType())) {
						Type[] tt = ((ParameterizedType) f.getGenericType())
							.getActualTypeArguments();
						if (tt.length > 0 && HasId.class.isAssignableFrom((Class<?>) tt[0])) {
							f.setAccessible(true);
							List<HasId> oldLst = (List<HasId>) f.get(oldEntity);
							List<HasId> newLst = (List<HasId>) f.get(newEntity);
							for (HasId oldVal : oldLst) {
								Integer index = null;
								Object oldId = oldVal.getId();
								// Ищем значение из старых в новом списке
								// Эквивалентными считаются два значения с одинаковым ID
								for (int i = 0; i < newLst.size(); i++) {
									if (oldId != null && oldId.equals(
										newLst.get(i).getId())) {
										index = i;
										break;
									}
								}
								if (index == null) {
									// Если такого значения нет в новом списке то удаляем
									// его из базы
									em.remove(oldVal);
								} else {
									// Если такое значение есть, то вставляем его новый эквивалент
									// в базу
									newLst.set(index, insertEntity(newLst.get(index), oldVal));
								}
							}
						}
					}
				}
			}

			newEntity = em.merge(newEntity);
			return newEntity;
		} catch (Exception e) {
			context.setRollbackOnly();
			e.printStackTrace();
			throw e;
		}
	}

	/**
	 * Получает данные из таблицы для связанных полей с аттрибутом
	 * {@code fetch = FetchType.LAZY}. Используется для получения данных в одной
	 * транзакции.
	 *
	 * @param <T> тип данных, которые будет содержать коллекция (должен быть
	 * сущностью)
	 * @param col коллекция
	 * @return иницализированна коллекция
	 */
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public <T> List<T> initCollection(List<T> col) {
		col.iterator();
		return col;
	}

	/**
	 * Возвращает текущего пользователя системы
	 *
	 * @return пользователь, который работает с системой в данный момент
	 */
	public AdmUser getUser() {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AdmUser> cq = cb.createQuery(AdmUser.class);
		Root<AdmUser> root = cq.from(AdmUser.class);
		String userName = ejbContext.getCallerPrincipal().getName();
		cq.where(cb.equal(cb.upper(root.<String>get("login")), userName.toUpperCase()));
		AdmUser user = (AdmUser) em.createQuery(cq).getResultList().get(0);
		return user;
	}
}
