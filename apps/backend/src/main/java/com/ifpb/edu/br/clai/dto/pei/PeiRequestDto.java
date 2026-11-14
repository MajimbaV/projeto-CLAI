package com.ifpb.edu.br.clai.dto.pei;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record PeiRequestDto(
        @NotNull(message = "O ID do aluno é obrigatório.")
        UUID alunoId,
        String historico,
        String necessidadesEspecificas,
        String conhecimentosHabilidadesInteresses,
        String dificuldadesApresentadas,
        String propostasAdaptacoes,
        Boolean ativo
) {}
