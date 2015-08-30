package ru.insoft.archive.sic.tests;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.TestConfig;
import ru.insoft.archive.sic.storages.domain.AdmUser;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
public class SimpleTest {

	@PersistenceContext
	private EntityManager em;

	@Test
	public void testInitData() {
		for (AdmUser user : (List<AdmUser>)em.createQuery("SELECT u FROM AdmUser u").getResultList()) {
			System.out.println("FOUND " + user.getId() + ", " + user.getName());
		}
	}
}
