package ru.insoft.archive.sic.storages.audit;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.springframework.stereotype.Service;

/**
 * Всегда возвращает одно и то же время
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Service
public class ConstantDateTimeService implements DateTimeService{

	@Override
	public DateTime getCurrentDateAndTime() {
		return new DateTime(2015, 11, 16, 18, 39, DateTimeZone.forID("Europe/Moscow"));
	}

}
