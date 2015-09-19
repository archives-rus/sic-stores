package ru.insoft.archive.sic.storages.route;

import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.TestConfig;

/**
 * Юнит тесты для основного контроллера маршрутов.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
public class MainControllerTest {

	@Autowired
	private MainController controller;

	@Test
	public void testProcessSuccessLogin() {
		ResponseEntity response = controller.processSuccessLogin();
		assertEquals("Код для возвращаемого ответа при удачной авторизации не 200.",
				response.getStatusCode(), HttpStatus.OK);
		assertEquals("Тело ответа при удачной авторизации не равно 'true'.",
				(boolean)response.getBody(), true);
	}

	@Test
	public void testProcessFailedLogin() {
				ResponseEntity response = controller.processFailedLogin();
		assertEquals("Код для возвращаемого ответа при неудачной авторизации не 400.",
				response.getStatusCode(), HttpStatus.NOT_FOUND);
		assertEquals("Тело ответа при неудачной авторизации не равно 'false'.",
				(boolean)response.getBody(), false);
	}

}
