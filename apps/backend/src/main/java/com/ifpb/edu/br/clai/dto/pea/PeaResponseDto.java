package com.ifpb.edu.br.clai.dto.pea;

import java.util.UUID;

public record PeaResponseDto(
    UUID id,
    UUID alunoId,
    UUID peiId,
    String componenteCurricular,
    String semestreAno,
    String docente,
    String objetivoGeral,
    String objetivosEspecificos,
    String conteudosProgramaticos,
    String metodologia,
    String avaliacao,
    String bibliografiaBasica,
    String bibliografiaComplementar,
    Boolean status
) {}
