package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record NecessidadesEducacionaisRequestDto(
        @NotNull List<@NotNull @Valid BarreiraEducacionalRequestDto> barreiras
) {}
