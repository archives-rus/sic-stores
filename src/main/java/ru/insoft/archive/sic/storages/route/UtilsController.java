package ru.insoft.archive.sic.storages.route;

import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.insoft.archive.sic.storages.errors.BadFileError;

/**
 * Различные функции, не относящиеся к производственному процессу
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@RestController
@RequestMapping("/utils")
public class UtilsController {

	/**
	 * Загружает файл с данными в базу
	 *
	 * @param clear очистить базу перед загрузкой
	 * @param file файл с AccessDB
	 */
	@RequestMapping(value = "/load-data", method = POST)
	public void loadInitData(@RequestParam("clear") boolean clear,
			@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			throw new BadFileError("Файл пуст.");
		}
	}
}
