package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;

public record ContextoPsicossocialRequestDto(
        @NotBlank @Size(max = 500) String relacaoComCursoEExpectativas,
        @NotBlank @Size(max = 500) String redeApoioFamiliarSocial,
        @NotBlank @Size(max = 500) String conflitosOuFatoresPsicossociais,
        @NotBlank @Size(max = 500) String observacoesFrequenciaRotinaPermanencia
) {}
