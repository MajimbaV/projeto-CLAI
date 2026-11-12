package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;

public record EstudoDeCasoFiltroRequestDto (
        String nomeAluno,
        String matriculaAluno,
        SituacaoEstudoDeCaso situacao
) {}
