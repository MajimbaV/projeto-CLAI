package com.ifpb.edu.br.clai.dto.curso;

import com.ifpb.edu.br.clai.model.curso.enums.Modalidade;
import com.ifpb.edu.br.clai.model.curso.enums.NivelEnsino;
import com.ifpb.edu.br.clai.model.curso.enums.Turno;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Valid
public record CursoRequestDto(
        @NotBlank(message = "O nome do curso não deve ser vazio")
        @Pattern(regexp = "^[^0-9]*$", message = "O nome do curso não pode conter números")
        String nomeCurso,
        @NotNull(message = "Informe o nível de ensino do curso")
        NivelEnsino nivelEnsino,
        @NotNull(message = "Informe a modalidade do curso")
        Modalidade cursoModalidade,
        @NotNull(message = "Informe o turno do curso")
        Turno cursoTurno,
        Boolean statusAtivo
) {}
