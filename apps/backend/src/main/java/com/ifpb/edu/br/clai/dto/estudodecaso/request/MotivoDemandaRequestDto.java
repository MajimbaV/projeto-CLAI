package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.OrigemEncaminhamento;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Size;

public record MotivoDemandaRequestDto(
        OrigemEncaminhamento origemEncaminhamento,
        @Size(max = 100) String outroOrigemEncaminhamento,
        @Size(max = 300) String motivoPrincipal,
        @Size(max = 255) String demandaDoEstudante,
        @Size(max = 255) String demandaDoProfissional,
        @Size(max = 255) String demandaDoResponsavel,
        @Size(max = 255) String demandaEquipeEscolar
) {
    @AssertTrue(message = "As origens diferentes de OUTRO não aceitam descrição")
    public boolean isOrigemEncaminhamentoConsistente() {
        if (origemEncaminhamento == null || outroOrigemEncaminhamento == null) {
            return true;
        }
        return origemEncaminhamento == OrigemEncaminhamento.OUTRO;
    }
}
