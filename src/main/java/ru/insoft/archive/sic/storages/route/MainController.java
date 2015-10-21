package ru.insoft.archive.sic.storages.route;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;
import org.springframework.web.bind.annotation.PathVariable;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Разруливает основные маршруты
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Controller
public class MainController {

	/**
	 * Обрабатывает запрос авторизации пользователя с правильным логином,
	 * паролем и правами.
	 *
	 * @return true
	 */
	@RequestMapping(value = "/login", method = POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> processSuccessLogin() {
		return new ResponseEntity<>(true, OK);
	}

	/**
	 * Обрабатывает запрос авторизации пользователя с неправильным логином,
	 * паролем или правами.
	 *
	 * @return false
	 */
	@RequestMapping(value = "/failedLogin", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> processFailedLogin() {
		return new ResponseEntity<>(false, NOT_FOUND);
	}

	/**
	 * Перенаправляет запрос к роутеру angular
	 *
	 * @param from откуда вызывается маршрут
	 * @return строку с перенаправлением к реальному маршруту 
	 */
	@RequestMapping(value = "/new_card/{from}")
	public String getNewCard(@PathVariable("from") String from) {
		return "redirect:/#new_card/" + from;
	}


	/**
	 * Перенаправляет запрос к роутеру angular
	 *
	 * @param start начальная позиция карточки в таблице результатов поиска
	 * @return строку с перенаправлением к реальному маршруту 
	 */
	@RequestMapping(value = "/view_card/{start}")
	public String getViewCard(@PathVariable("start") Integer start) {
		return "redirect:/#view_card/" + start;
	}

	/**
	 * Перенаправляет запрос к роутеру angular
	 *
	 * @return строку с перенаправлением к реальному маршруту 
	 */
	@RequestMapping(value = "/edit_card")
	public String getEditCard() {
		return "redirect:/#edit_card";
	}

}
