package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.DimensaoNecessidadeEducacional;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.PrioridadeNecessidadeEducacional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record BarreiraEducacionalRequestDto(
        @NotNull DimensaoNecessidadeEducacional dimensao,
        @NotBlank @Size(max = 1000) String barreiraNecessidade,
        @NotBlank @Size(max = 1500) String evidenciasImpactos,
        @NotNull PrioridadeNecessidadeEducacional prioridade
) {}
