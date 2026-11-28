package com.ifpb.edu.br.clai.dto.rai.response;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeCognitiva;
import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeSocioemocional;
import com.ifpb.edu.br.clai.model.rai.enums.TipoRelacionamento;

public record RaiResponseDto(
    UUID id,
    UUID alunoId,
    String alunoNome,
    String alunoMatricula,
    UUID peaId,
    UUID peiId,
    String semestreAno,
    String componenteCurricular,
    String docente,
    AspectoResponseDto<TipoRelacionamento> relacionamento,
    AspectoResponseDto<TipoHabilidadeCognitiva> habilidadesCognitivas,
    AspectoResponseDto<TipoHabilidadeSocioemocional> habilidadesSocioemocionais,
    String avancosGerais,
    String dificuldadesAprendizagem,
    String fatoresExternos,
    List<RaiHabilidadeDesenvolvidaResponseDto> habilidadesDesenvolvidas,
    String parecer,
    LocalDate data,
    Boolean statusAtivo
) {}
