package ru.insoft.archive.sic.tests;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.commons.codec.digest.DigestUtils;
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.TestConfig;
import ru.insoft.archive.sic.storages.domain.admin.AdmUser;

/**
 * тесты исходных данных
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
public class InitDataTest {

	@PersistenceContext
	private EntityManager em;

	@Test
	public void testUsersData() throws NoSuchAlgorithmException {
		List<AdmUser> users = em.createQuery("SELECT u FROM AdmUser u").getResultList();
		assertEquals("В исходных данных должно быть 3 пользователя", users.size(), 3);
		int blocked = 0;
		for (AdmUser user : users) {
			assertEquals("Имя пользователя не совпадает с его паролем",
					DigestUtils.md5Hex(user.getName()).toUpperCase(), user.getPassword());
			if (user.isBlocked()) {
				++blocked;
			}
		}
		assertEquals("Только однин пользователь должен быть заблокирован", blocked, 1);
	}
}
