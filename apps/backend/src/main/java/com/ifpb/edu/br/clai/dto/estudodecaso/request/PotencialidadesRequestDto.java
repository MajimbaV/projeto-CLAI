package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.Size;

public record PotencialidadesRequestDto(
        @Size(max = 500) String potencialidadesAcademicas,
        @Size(max = 500) String interessesHabilidades,
        @Size(max = 500) String formasPreferenciaisAprendizagemEDemonstracao,
        @Size(max = 500) String recursosQueFavorecemDesempenho
) {}
