package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record IdentificacaoRequestDto(
        UUID alunoId,
        List<@NotNull @PastOrPresent LocalDate> datasAnamnese,
        @Size(max = 60) String nomeProfissional
) {}
