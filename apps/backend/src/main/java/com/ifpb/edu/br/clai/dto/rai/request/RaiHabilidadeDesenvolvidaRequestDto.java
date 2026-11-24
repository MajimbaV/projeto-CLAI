package com.ifpb.edu.br.clai.dto.rai.request;

import com.ifpb.edu.br.clai.model.rai.enums.NivelAprendizado;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RaiHabilidadeDesenvolvidaRequestDto(
    @NotBlank(message = "A descrição da habilidade desenvolvida é obrigatória.")
    String habilidadeDesenvolvida,

    @NotNull(message = "O nível de aprendizado é obrigatório.")
    NivelAprendizado nivelAprendizado,

    String observacoes
) {}
