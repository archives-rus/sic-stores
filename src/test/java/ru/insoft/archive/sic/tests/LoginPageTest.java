package ru.insoft.archive.sic.tests;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.junit.Assert;
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

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class})
@ActiveProfiles("test")
@WebIntegrationTest(value = "server.port=9000")
@SeleniumTest(baseUrl = "http://localhost:9000/enter.html")
public class LoginPageTest {

	@Autowired
	private WebDriver driver;

	@PersistenceContext
	private EntityManager em;

	@Test
	public void checkData() {
		for (String login : (List<String>)em.createNativeQuery("select login from adm_user").getResultList()){
			System.out.println("FOUND: " + login);
		}
		System.out.println("PASSWORD FOR 'admin': " + em.createNativeQuery("select password from adm_user where login = 'admin'").getSingleResult());

	}

	@Test
	public void testTitle() {
		Assert.assertEquals("Title is wrong", "Места хранения::Авторизация", driver.getTitle());
	}

	@Test
	public void testBody() {
		Assert.assertNotNull("Поле для ввода логина отсутствует", driver.findElement(By.name("username")));
		Assert.assertNotNull("Поле для ввода пароля отсутствует", driver.findElement(By.name("password")));
		Assert.assertTrue("Кнопка отсутствует", driver.findElement(By.tagName("button")).getAttribute("type").equals("submit"));
	}

}
