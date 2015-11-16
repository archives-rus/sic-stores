package ru.insoft.archive.sic.storages.audit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.TestConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
public class DateTimeServiceTest {

	@Autowired
	private DateTimeService currentDateTimeService;

	@Autowired
	private DateTimeService constantDateTimeService;

	@Test
	public void testCurrentDateTimeService() {
		System.out.println("Current Time is: "
				+ currentDateTimeService.getCurrentDateAndTime().toString("dd-MM-yyyy HH:mm:ss"));
		System.out.println("Constant Time is: "
				+ constantDateTimeService.getCurrentDateAndTime().toString("dd-MM-yyyy HH:mm:ss"));
	}
}
