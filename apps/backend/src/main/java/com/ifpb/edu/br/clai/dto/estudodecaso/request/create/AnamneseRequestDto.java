package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AnamneseRequestDto(
        @Size(max = 1000) String historicoEscolar,
        @Size(max = 1000) String experienciasEscolaresPositivas,
        @Size(max = 1000) String experienciasEscolaresNegativas,
        @Size(max = 1000) String adaptacoesRecursosEResultados,
        @Size(max = 1000) String objetivosConhecimentosConsolidados,
        List<@NotBlank @Size(max = 300) String> areasDisciplinasFacilidade,
        List<@NotBlank @Size(max = 300) String> areasDisciplinasDificuldade
) {}
