package com.ifpb.edu.br.clai.dto.curso;

import com.ifpb.edu.br.clai.model.curso.enums.Modalidade;
import com.ifpb.edu.br.clai.model.curso.enums.NivelEnsino;
import com.ifpb.edu.br.clai.model.curso.enums.Turno;

import java.util.UUID;

public record CursoResponseDto(
        UUID id,
        String nomeCurso,
        String cursoSigla,
        NivelEnsino nivelEnsino,
        Modalidade cursoModalidade,
        Turno cursoTurno,
        Boolean statusAtivo
) {}
