package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record EstudoDeCasoAtualizacaoRequestDTO(
        @NotNull @Valid MotivoDemandaRequestDto motivoDemanda,
        @NotNull @Valid NecessidadesEspecificasRequestDto necessidadesEspecificas,
        @NotNull @Valid AnamneseRequestDto anamnese,
        @NotNull @Valid PerfilEstudanteRequestDto perfilEstudante,
        @NotNull @Valid ContextoPsicossocialRequestDto contextoPsicossocial,
        @NotNull @Valid PotencialidadesRequestDto potencialidades,
        @NotNull @Valid NecessidadesEducacionaisRequestDto necessidadesEducacionais,
        @NotNull @Valid SintesePsicopedagogicaRequestDto sintesePsicopedagogica,
        @NotNull @Valid ChecklistApoiosRequestDto checklistApoios,
        @NotNull @Valid SituacaoEstudoDeCaso situacaoEstudoDeCaso
) {
}
