package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.Size;

public record ContextoPsicossocialRequestDto(
        @Size(max = 500) String relacaoComCursoEExpectativas,
        @Size(max = 500) String redeApoioFamiliarSocial,
        @Size(max = 500) String conflitosOuFatoresPsicossociais,
        @Size(max = 500) String observacoesFrequenciaRotinaPermanencia
) {}
