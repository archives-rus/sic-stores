package ru.insoft.archive.sic.storages.convert;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import org.springframework.stereotype.Component;

@Component
public class JsonCalendarSerializer extends JsonSerializer<Calendar> {

	private static final DateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");

	@Override
	public void serialize(Calendar calendar, JsonGenerator gen,
			SerializerProvider arg2) throws IOException,
			JsonProcessingException {
		String strDate = formatter.format(calendar.getTime());
		gen.writeString(strDate);
	}

}
