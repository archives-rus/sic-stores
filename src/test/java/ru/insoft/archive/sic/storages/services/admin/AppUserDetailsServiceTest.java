package ru.insoft.archive.sic.storages.services.admin;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.TestConfig;
import ru.insoft.archive.sic.storages.serivces.admin.AppUserDetailsService;

/**
 * Юнит тесты для сервиса, предостовляющего информацию о найденом пользователе
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
public class AppUserDetailsServiceTest {

	@Autowired
	private AppUserDetailsService service;

	@Test
	public void testLoadByUserName() {
		assertNotNull("Пользователь не найден", service.loadUserByUsername("Admin"));

		try {
			service.loadUserByUsername("notuser");
			fail("Отсутствие пользователя должно выбросить исключение!");
		} catch (UsernameNotFoundException ex) {

		}
	}
}
