package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.StatusEstudoDeCaso;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record EstudoDeCasoRequestDto(
        @NotNull @Valid IdentificacaoRequestDto identificacao,
        @NotNull @Valid MotivoDemandaRequestDto motivoDemanda,
        @NotNull @Valid NecessidadesEspecificasRequestDto necessidadesEspecificas,
        @NotNull @Valid AnamneseRequestDto anamnese,
        @NotNull @Valid PerfilEstudanteRequestDto perfilEstudante,
        @NotNull @Valid ContextoPsicossocialRequestDto contextoPsicossocial,
        @NotNull @Valid PotencialidadesRequestDto potencialidades,
        @NotNull @Valid NecessidadesEducacionaisRequestDto necessidadesEducacionais,
        @NotNull @Valid SintesePsicopedagogicaRequestDto sintesePsicopedagogica,
        @NotNull @Valid ChecklistApoiosRequestDto checklistApoios,
        @NotNull StatusEstudoDeCaso statusEstudoDeCaso
) {}
