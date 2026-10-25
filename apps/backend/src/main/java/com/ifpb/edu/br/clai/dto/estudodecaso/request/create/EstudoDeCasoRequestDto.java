package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.StatusEstudoDeCaso;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record EstudoDeCasoRequestDto(
        @Valid IdentificacaoRequestDto identificacao,
        @Valid MotivoDemandaRequestDto motivoDemanda,
        @Valid NecessidadesEspecificasRequestDto necessidadesEspecificas,
        @Valid AnamneseRequestDto anamnese,
        @Valid PerfilEstudanteRequestDto perfilEstudante,
        @Valid ContextoPsicossocialRequestDto contextoPsicossocial,
        @Valid PotencialidadesRequestDto potencialidades,
        @Valid NecessidadesEducacionaisRequestDto necessidadesEducacionais,
        @Valid SintesePsicopedagogicaRequestDto sintesePsicopedagogica,
        @Valid ChecklistApoiosRequestDto checklistApoios,
        @NotNull StatusEstudoDeCaso statusEstudoDeCaso
) {}
