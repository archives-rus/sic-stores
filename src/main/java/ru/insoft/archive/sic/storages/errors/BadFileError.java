package ru.insoft.archive.sic.storages.errors;

/**
 * Неправильный файл
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class BadFileError extends RuntimeException {

	public BadFileError(String message) {
		super(message);
	}

}
