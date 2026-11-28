package com.ifpb.edu.br.clai.dto.pei;

public record PeiUpdateRequestDto(
        String historico,
        String necessidadesEspecificas,
        String conhecimentosHabilidadesInteresses,
        String dificuldadesApresentadas,
        String propostasAdaptacoes
) {}
