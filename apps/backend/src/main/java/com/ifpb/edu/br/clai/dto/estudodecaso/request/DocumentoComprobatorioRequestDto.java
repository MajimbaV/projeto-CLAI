package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record DocumentoComprobatorioRequestDto(
        @Size(max = 300) String descricao,
        @PastOrPresent LocalDate data,
        @Size(max = 150) String profissional
) {}
