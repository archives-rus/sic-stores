package ru.insoft.archive.sic.storages.convert;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.insoft.archive.sic.storages.dto.SearchCriteria;

/**
 * Конвертирует строку в объект SearchCriteria
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Component
public class SearchCriteriaConverter implements Converter<String, SearchCriteria> {

	@Autowired
	ObjectMapper mapper;

	@Override
	public SearchCriteria convert(String s) {
		try {
			return mapper.readValue(s, SearchCriteria.class);
		} catch (IOException ex) {
			return new SearchCriteria();
		}
	}

}
