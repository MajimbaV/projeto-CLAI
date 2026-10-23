package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record NecessidadesEducacionaisRequestDto(
        List<@NotNull @Valid BarreiraEducacionalRequestDto> barreiras
) {}
