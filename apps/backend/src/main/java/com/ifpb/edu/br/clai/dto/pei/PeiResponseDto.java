package com.ifpb.edu.br.clai.dto.pei;

import java.util.UUID;

public record PeiResponseDto(
        UUID id,
        UUID alunoId,
        String alunoNome,
        String alunoMatricula,
        String historico,
        String necessidadesEspecificas,
        String conhecimentosHabilidadesInteresses,
        String dificuldadesApresentadas,
        String propostasAdaptacoes,
        Boolean ativo
) {}
