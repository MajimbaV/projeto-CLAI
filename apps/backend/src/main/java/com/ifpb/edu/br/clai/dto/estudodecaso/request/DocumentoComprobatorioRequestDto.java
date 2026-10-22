package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record DocumentoComprobatorioRequestDto(
        @NotBlank @Size(max = 300) String descricao,
        @NotNull @PastOrPresent LocalDate data,
        @NotBlank @Size(max = 150) String profissional
) {}
