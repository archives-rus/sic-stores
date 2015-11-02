package ru.insoft.archive.sic.tests;

import junit.framework.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
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
		Assert.assertEquals("Title is wrong", "Места хранения", driver.getTitle());
	}

	@Test
	public void testLogout() {
		driver.findElement(By.cssSelector(".btn-quit")).click();
		new WebDriverWait(driver, 7).until(ExpectedConditions.not(ExpectedConditions.urlContains("/index.html")));
		Assert.assertTrue("Перенаправлен после выхода не туда", driver.getCurrentUrl().endsWith("/enter.html"));
	}
}
