package com.ifpb.edu.br.clai.dto.rai.request;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeCognitiva;
import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeSocioemocional;
import com.ifpb.edu.br.clai.model.rai.enums.TipoRelacionamento;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

public record RaiRequestDto(
    @NotNull(message = "O ID do aluno é obrigatório.")
    UUID alunoId,

    @NotNull(message = "O ID do PEA é obrigatório.")
    UUID peaId,

    @Valid
    AspectoRequestDto<TipoRelacionamento> relacionamento,

    @Valid
    AspectoRequestDto<TipoHabilidadeCognitiva> habilidadesCognitivas,

    @Valid
    AspectoRequestDto<TipoHabilidadeSocioemocional> habilidadesSocioemocionais,

    String avancosGerais,
    String dificuldadesAprendizagem,
    String fatoresExternos,

    List<@Valid RaiHabilidadeDesenvolvidaRequestDto> habilidadesDesenvolvidas,

    String parecer,

    @PastOrPresent(message = "A data do relatório não pode ser uma data futura.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate data,

    Boolean statusAtivo
) {
    public RaiRequestDto {
        habilidadesDesenvolvidas = habilidadesDesenvolvidas != null ? habilidadesDesenvolvidas : List.of();
    }
}
