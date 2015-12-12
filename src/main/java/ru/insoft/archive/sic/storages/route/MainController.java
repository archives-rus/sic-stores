package ru.insoft.archive.sic.storages.route;

import javax.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;
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
	 * @param request
	 * @return строку с перенаправлением к реальному маршруту
	 */
	@RequestMapping(value = {"/reports", "/jrch", "/newcard", "/card/edit/{id}",
		"/card/{id}", "/cards/{pos}", "/jrchs/{pos}"})
	public String getEditCard(HttpServletRequest request) {
		return "redirect:/#" + request.getServletPath();
	}

}
