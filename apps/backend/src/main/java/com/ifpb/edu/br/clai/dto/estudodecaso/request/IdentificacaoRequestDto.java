package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record IdentificacaoRequestDto(
        @NotNull UUID alunoId,
        @NotNull List<@NotNull @PastOrPresent LocalDate> datasAnamnese,
        @NotBlank @Size(max = 60) String nomeProfissional
) {}
