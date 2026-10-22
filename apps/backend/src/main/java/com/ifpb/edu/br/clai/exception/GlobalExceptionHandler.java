package com.ifpb.edu.br.clai.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problemDetail.setTitle("Recurso não encontrado");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/not-found"));
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(BusinessRuleException.class)
    public ProblemDetail handleBusinessRule(BusinessRuleException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage());
        problemDetail.setTitle("Violação de regra de negócio");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/business-rule"));
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Falha na validação dos campos.");
        problemDetail.setTitle("Dados inválidos");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/invalid-data"));

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        problemDetail.setProperty("invalidFields", errors);
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(FieldValidationException.class)
    public ProblemDetail handleFieldValidation(FieldValidationException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Falha na validação dos campos condicionais.");
        problemDetail.setTitle("Dados inválidos");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/invalid-data"));
        problemDetail.setProperty("invalidFields", ex.getInvalidFields());
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ProblemDetail handleConstraintViolation(ConstraintViolationException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Falha na validação dos parâmetros de consulta.");
        problemDetail.setTitle("Parâmetros inválidos");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/invalid-parameters"));

        Map<String, String> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            String propertyPath = violation.getPropertyPath().toString();
            String paramName = propertyPath.contains(".") ? propertyPath.substring(propertyPath.lastIndexOf('.') + 1) : propertyPath;
            errors.put(paramName, violation.getMessage());
        }

        problemDetail.setProperty("invalidFields", errors);
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ProblemDetail handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String paramName = ex.getName();
        String expectedType = ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "tipo esperado";
        String message = String.format("O parâmetro '%s' recebeu o valor '%s', que é inválido para o tipo %s.",
                paramName, ex.getValue(), expectedType);

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, message);
        problemDetail.setTitle("Parâmetro com tipo inválido");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/type-mismatch"));
        problemDetail.setProperty("invalidFields", Map.of(paramName, message));
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Formato de payload ou data inválido. Assegure-se de que a data obedece o formato AAAA-MM-DD.");
        problemDetail.setTitle("Erro de Formato / Sintaxe");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/bad-request"));
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ProblemDetail handleDataIntegrityViolation(org.springframework.dao.DataIntegrityViolationException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "A operação não pôde ser concluída devido a um conflito de dados.");
        problemDetail.setTitle("Conflito de Integridade de Dados");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/data-conflict"));
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleAllUncaughtException(Exception ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro interno inesperado no servidor.");
        problemDetail.setTitle("Erro Interno do Servidor");
        problemDetail.setType(URI.create("https://api.clai.ifpb.edu.br/errors/internal-server-error"));
        problemDetail.setProperty("timestamp", Instant.now());

        System.err.println("Erro inesperado: " + ex.getMessage());

        return problemDetail;
    }
}
