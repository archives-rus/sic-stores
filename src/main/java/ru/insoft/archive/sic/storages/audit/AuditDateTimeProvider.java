package ru.insoft.archive.sic.storages.audit;

import java.util.Calendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.stereotype.Component;

@Component
public class AuditDateTimeProvider implements DateTimeProvider {

	@Autowired
	private CurrentDateTimeService currentDateTimeService;

	@Override
	public Calendar getNow() {
		return currentDateTimeService.getCurrentDateAndTime().toGregorianCalendar();
	}

}
