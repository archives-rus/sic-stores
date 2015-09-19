package ru.insoft.archive.sic.storages.services.admin;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.TestConfig;
import ru.insoft.archive.sic.storages.serivces.admin.AdmUserService;

/**
 * тесты для сервиса, предостовляющего интерфейс работы с пользователями
 * системы.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
public class AdmUserServiceTest {

	@Autowired
	private AdmUserService service;

	@Test
	public void testFind() {
		Assert.assertNotNull("Пользователь не найден", service.find("user"));
		Assert.assertNotNull("Пользователь не найден без учета регистра", service.find("UsEr"));
		Assert.assertNull("Найден не существующий пользователь", service.find("hello"));
	}
}
