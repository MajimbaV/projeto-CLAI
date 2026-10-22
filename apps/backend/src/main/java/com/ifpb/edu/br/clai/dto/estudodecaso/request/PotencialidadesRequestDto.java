package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;

public record PotencialidadesRequestDto(
        @NotBlank @Size(max = 500) String potencialidadesAcademicas,
        @NotBlank @Size(max = 500) String interessesHabilidades,
        @NotBlank @Size(max = 500) String formasPreferenciaisAprendizagemEDemonstracao,
        @NotBlank @Size(max = 500) String recursosQueFavorecemDesempenho
) {}
