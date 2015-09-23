package ru.insoft.archive.sic.tests;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.Ordered;
import static org.springframework.core.annotation.AnnotationUtils.findAnnotation;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.support.AbstractTestExecutionListener;

public class SeleniumTestExecutionListener extends AbstractTestExecutionListener {

	private WebDriver webDriver;

	@Override
	public int getOrder() {
		return Ordered.HIGHEST_PRECEDENCE;
	}

	@Override
	public void prepareTestInstance(TestContext testContext) throws Exception {
		if (webDriver != null) {
			return;
		}
		ApplicationContext context = testContext.getApplicationContext();
		if (context instanceof ConfigurableApplicationContext) {
			SeleniumTest annotation = findAnnotation(
					testContext.getTestClass(), SeleniumTest.class);
			webDriver = BeanUtils.instantiate(annotation.driver());
			ConfigurableApplicationContext configurableApplicationContext = (ConfigurableApplicationContext) context;
			ConfigurableListableBeanFactory bf = configurableApplicationContext.getBeanFactory();
			bf.registerResolvableDependency(WebDriver.class, webDriver);
		}
	}

	@Override
	public void beforeTestMethod(TestContext testContext) throws Exception {
		if (webDriver != null) {
			SeleniumTest annotation = findAnnotation(
					testContext.getTestClass(), SeleniumTest.class);
			String url = annotation.baseUrl();
			webDriver.get(url);
			if (!url.equals(webDriver.getCurrentUrl())) {
				// Значит перенаправили на форму авторизации
				webDriver.findElement(By.name("username")).sendKeys("admin");
				webDriver.findElement(By.name("password")).sendKeys("admin");
				webDriver.findElement(By.tagName("button")).click();
				new WebDriverWait(webDriver, 7).until(ExpectedConditions.urlContains(url));
			}
		}
	}

	@Override
	public void afterTestClass(TestContext testContext) throws Exception {
		if (webDriver != null) {
			webDriver.quit();
		}
	}

	@Override
	public void afterTestMethod(TestContext testContext) throws Exception {
		if (testContext.getTestException() == null) {
			return;
		}
		File screenshot = ((TakesScreenshot) webDriver).getScreenshotAs(OutputType.FILE);
		String testName = testContext.getTestClass().getSimpleName();
		String methodName = testContext.getTestMethod().getName();
		Files.copy(screenshot.toPath(),
				Paths.get(System.getProperty("java.io.tmpdir"), testName + "_" + methodName + "_" + screenshot.getName()));
	}
}
