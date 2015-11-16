package ru.insoft.archive.sic.storages.audit;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.springframework.stereotype.Service;

/**
 * Доставляет текущее время
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Service
public class CurrentDateTimeService implements DateTimeService {

	@Override
	public DateTime getCurrentDateAndTime() {
		return DateTime.now(DateTimeZone.forID("Europe/Moscow"));
	}

}
