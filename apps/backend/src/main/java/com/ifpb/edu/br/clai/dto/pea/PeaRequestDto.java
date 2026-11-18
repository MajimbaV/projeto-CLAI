package com.ifpb.edu.br.clai.dto.pea;

import java.util.UUID;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

public record PeaRequestDto(
    @NotNull(message = "O ID do aluno é obrigatório.")
    UUID alunoId,
    @NotNull(message = "O ID do PEI é obrigatório.")
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
