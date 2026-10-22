package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AnamneseRequestDto(
        @NotBlank @Size(max = 1000) String historicoEscolar,
        @NotBlank @Size(max = 1000) String experienciasEscolaresPositivas,
        @NotBlank @Size(max = 1000) String experienciasEscolaresNegativas,
        @NotBlank @Size(max = 1000) String adaptacoesRecursosEResultados,
        @NotBlank @Size(max = 1000) String objetivosConhecimentosConsolidados,
        @NotNull List<@NotBlank @Size(max = 300) String> areasDisciplinasFacilidade,
        @NotNull List<@NotBlank @Size(max = 300) String> areasDisciplinasDificuldade
) {}
