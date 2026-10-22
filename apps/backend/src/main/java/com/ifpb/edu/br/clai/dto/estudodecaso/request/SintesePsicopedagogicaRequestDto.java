package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.Size;

public record SintesePsicopedagogicaRequestDto(
        @Size(max = 1000) String identificacaoNecessidadesEspecificas,
        @Size(max = 1000) String avancosObjetivosConhecimentosAlcancados,
        @Size(max = 1000) String dificuldadesBarreirasComRepercussaoEducacional,
        @Size(max = 1000) String potencialidadesECondicoesFacilitadoras,
        @Size(max = 1000) String principaisDemandasIdentificadasNoCaso
) {}
