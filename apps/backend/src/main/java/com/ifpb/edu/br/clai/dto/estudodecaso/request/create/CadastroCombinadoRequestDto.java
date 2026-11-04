package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import com.ifpb.edu.br.clai.dto.aluno.AlunoRequestDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;


public record CadastroCombinadoRequestDto(
        @NotNull (message = "Os dados dos alunos devem ser fornecidos")
        @Valid
        AlunoRequestDto aluno,
        @NotNull (message = "Os dados do estudo de caso devem ser fornecidos")
        @Valid EstudoDeCasoRequestDto estudoDeCaso
    ) {}
