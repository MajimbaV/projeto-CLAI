package com.ifpb.edu.br.clai.exception;

import java.util.Map;

public class FieldValidationException extends RuntimeException {
    private final Map<String, String> invalidFields;

    public FieldValidationException(Map<String, String> invalidFields) {
        super("Falha na validação de campos condicionais.");
        this.invalidFields = invalidFields;
    }

    public Map<String, String> getInvalidFields() {
        return invalidFields;
    }
}