package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.OrigemEncaminhamento;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record MotivoDemandaRequestDto(
        @NotNull OrigemEncaminhamento origemEncaminhamento,
        @Size(max = 100) String outroOrigemEncaminhamento,
        @NotBlank @Size(max = 300) String motivoPrincipal,
        @NotBlank @Size(max = 255) String demandaDoEstudante,
        @NotBlank @Size(max = 255) String demandaDoProfissional,
        @NotBlank @Size(max = 255) String demandaDoResponsavel,
        @NotBlank @Size(max = 255) String demandaEquipeEscolar
) {
    @AssertTrue(message = "A origem OUTRO exige uma descrição; as demais origens não aceitam descrição")
    public boolean isOrigemEncaminhamentoConsistente() {
        if (origemEncaminhamento == null) {
            return true;
        }
        if (origemEncaminhamento == OrigemEncaminhamento.OUTRO) {
            return outroOrigemEncaminhamento != null && !outroOrigemEncaminhamento.isBlank();
        }
        return outroOrigemEncaminhamento == null;
    }
}
