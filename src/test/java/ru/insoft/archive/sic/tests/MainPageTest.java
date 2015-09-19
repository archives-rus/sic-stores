package ru.insoft.archive.sic.tests;

import junit.framework.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.TestConfig;

/**
 * Интеграционные тесты для страниц, отдаваемых сервером
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
@WebIntegrationTest(value = "server.port=9000")
@SeleniumTest(baseUrl = "http://localhost:9000/index.html")
public class MainPageTest {

	@Autowired
	private WebDriver driver;

	@Test
	public void testTitle() {
		Assert.assertEquals("Title is wrong", "INDEX", driver.getTitle());
	}

	@Test
	public void testBody() {
		Assert.assertEquals("Body is wrong", "MAIN", driver.findElement(new By.ByTagName("div")).getText());
	}
}
