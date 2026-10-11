package com.ifpb.edu.br.clai.dto;

import java.time.LocalDate;
import java.util.UUID;

public record AlunoResponseDto(
        UUID id,
        String alunoNome,
        LocalDate alunoNascimento,
        String alunoTelefone,
        String alunoEmail,
        String nomeResponsavel,
        String grauParentesco,
        String responsavelTelefone,
        String responsavelEmail,
        String alunoMatricula,
        String alunoCurso,
        String periodoIngresso,
        String periodoAluno
) {}
