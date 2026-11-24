package com.ifpb.edu.br.clai.dto.rai.response;

import java.util.UUID;

import com.ifpb.edu.br.clai.model.rai.enums.NivelAprendizado;

public record RaiHabilidadeDesenvolvidaResponseDto(
    UUID id,
    String habilidadeDesenvolvida,
    NivelAprendizado nivelAprendizado,
    String observacoes
) {}
