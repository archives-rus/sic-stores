package ru.insoft.archive.sic.storages.errors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler({BadFileError.class})
    protected ResponseEntity<?> handleBadRequest(RuntimeException e, WebRequest request) {
        BadFileError error = (BadFileError) e;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);

        return handleExceptionInternal(e, error.getMessage(), headers, HttpStatus.UNSUPPORTED_MEDIA_TYPE, request);
    }
}
