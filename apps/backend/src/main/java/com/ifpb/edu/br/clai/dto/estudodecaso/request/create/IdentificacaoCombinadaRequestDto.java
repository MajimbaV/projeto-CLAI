package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import com.ifpb.edu.br.clai.dto.aluno.AlunoRequestDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record IdentificacaoCombinadaRequestDto (
        @Valid AlunoRequestDto aluno,
        List<@NotNull @PastOrPresent LocalDate> datasAnamnese,
        @Size(max = 60) String nomeProfissional
) {}
