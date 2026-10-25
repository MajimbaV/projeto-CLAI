package com.ifpb.edu.br.clai.dto.estudodecaso.request.create;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.DimensaoNecessidadeEducacional;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.PrioridadeNecessidadeEducacional;
import jakarta.validation.constraints.Size;

public record BarreiraEducacionalRequestDto(
        DimensaoNecessidadeEducacional dimensao,
        @Size(max = 1000) String barreiraNecessidade,
        @Size(max = 1500) String evidenciasImpactos,
        PrioridadeNecessidadeEducacional prioridade
) {}
