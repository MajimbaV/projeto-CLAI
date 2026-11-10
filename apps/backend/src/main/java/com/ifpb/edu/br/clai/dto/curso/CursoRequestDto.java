package com.ifpb.edu.br.clai.dto.curso;

import com.ifpb.edu.br.clai.model.curso.enums.Modalidade;
import com.ifpb.edu.br.clai.model.curso.enums.NivelEnsino;
import com.ifpb.edu.br.clai.model.curso.enums.Turno;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Valid
public record CursoRequestDto(
        @NotBlank(message = "O nome do curso não deve ser vazio")
        @Pattern(regexp = "^[^0-9]*$", message = "O nome do curso não pode conter números")
        String nomeCurso,
        @NotBlank(message = "A sigla do curso não deve ser vazia!")
        @Pattern(regexp = "^[A-Z-]+$", message = "A sigla deve conter apenas letras maiúsculas e hífen")
        @Size(min = 2, message = "A sigla do curso deve ter no mínimo 2 caracteres")
        String cursoSigla,
        @NotNull(message = "Informe o nível de ensino do curso")
        NivelEnsino nivelEnsino,
        @NotNull(message = "Informe a modalidade do curso")
        Modalidade cursoModalidade,
        @NotNull(message = "Informe o turno do curso")
        Turno cursoTurno,
        Boolean statusAtivo
) {}
