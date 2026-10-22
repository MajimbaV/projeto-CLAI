package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;

public record SintesePsicopedagogicaRequestDto(
        @NotBlank @Size(max = 1000) String identificacaoNecessidadesEspecificas,
        @NotBlank @Size(max = 1000) String avancosObjetivosConhecimentosAlcancados,
        @NotBlank @Size(max = 1000) String dificuldadesBarreirasComRepercussaoEducacional,
        @NotBlank @Size(max = 1000) String potencialidadesECondicoesFacilitadoras,
        @NotBlank @Size(max = 1000) String principaisDemandasIdentificadasNoCaso
) {}
