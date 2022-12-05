package com.gmail.namb1704836.ecommerce.controller;

import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

/**
 * Class with utility methods for controller classes.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 2.0
 */
public class ControllerUtils {
	/**
	 * Returns validation errors to html page.
	 *
	 * @param bindingResult errors in validating http request.
	 * @return validation errors to html page.
	 */
	static Map<String, String> getErrors(BindingResult bindingResult) {
		Collector<FieldError, ?, Map<String, String>> collector = Collectors
				.toMap(fieldError -> fieldError.getField() + "Error", FieldError::getDefaultMessage);
		return bindingResult.getFieldErrors().stream().collect(collector);
	}
}
