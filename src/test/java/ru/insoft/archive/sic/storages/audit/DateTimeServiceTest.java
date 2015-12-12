package ru.insoft.archive.sic.storages.audit;

import java.text.SimpleDateFormat;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.TestConfig;
import ru.insoft.archive.sic.storages.domain.Organization;
import ru.insoft.archive.sic.storages.repos.OrganizationRepo;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, TestConfig.class})
@ActiveProfiles("test")
@TransactionConfiguration(defaultRollback = true)
public class DateTimeServiceTest {

	@Autowired
	private DateTimeService currentDateTimeService;

	@Autowired
	private DateTimeService constantDateTimeService;

	@Autowired
	private OrganizationRepo orgRepo;

	@Test
	public void testCurrentDateTimeService() {
		System.out.println("Current Time is: "
				+ currentDateTimeService.getCurrentDateAndTime().toString("dd-MM-yyyy HH:mm:ss"));
		System.out.println("Constant Time is: "
				+ constantDateTimeService.getCurrentDateAndTime().toString("dd-MM-yyyy HH:mm:ss"));
	}

	// Проверяем добавление и обновление времени для карточки организации
	@Test
	@Transactional
	public void testAuditOrganizationBegin() {
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		Organization org = new Organization();
		org.setAddUserId(1l);
		org.setModUserId(1l);
		orgRepo.save(org);

		org = orgRepo.findOne(1l);
		orgRepo.save(org);

		for (Organization o : orgRepo.findAll()) {
			System.out.println("ID is " + o.getId());
			System.out.println("Date created is " + sdf.format(o.getInsertDate().getTime()));
			System.out.println("Last Date modified is " + sdf.format(o.getUpdateDate().getTime()));
		}
	}

}
