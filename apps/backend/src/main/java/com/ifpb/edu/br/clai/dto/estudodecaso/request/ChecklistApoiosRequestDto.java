package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioAcessibilidade;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioAvaliacao;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioComunicacao;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioCurriculo;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioInstitucional;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioMetodologia;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record ChecklistApoiosRequestDto(
        @NotNull List<@NotNull ApoioAcessibilidade> acessibilidadeAmbiente,
        @Size(max = 500) String acessibilidadeAmbienteOutro,
        @NotNull List<@NotNull ApoioComunicacao> comunicacaoMateriais,
        @Size(max = 500) String comunicacaoMateriaisOutro,
        @NotNull List<@NotNull ApoioMetodologia> metodologia,
        @Size(max = 500) String metodologiaOutro,
        @NotNull List<@NotNull ApoioAvaliacao> avaliacao,
        @Size(max = 500) String avaliacaoOutro,
        @NotNull List<@NotNull ApoioCurriculo> curriculo,
        @Size(max = 500) String curriculoOutro,
        @NotNull List<@NotNull ApoioInstitucional> apoiosInstitucionais,
        @Size(max = 500) String apoioInstitucionalOutro,
        @NotBlank @Size(max = 1500) String apoiosExternosEncaminhamentos,
        @NotBlank @Size(max = 200) String psicopedagogoResponsavel,
        @NotBlank @Size(max = 200) String coordenadorResponsavel,
        @NotNull @PastOrPresent LocalDate data
) {
    @AssertTrue(message = "Os campos de 'Outro' devem conter texto ou ser omitidos")
    public boolean isTextoOutroValido() {
        return hasTextIfProvided(acessibilidadeAmbienteOutro)
                && hasTextIfProvided(comunicacaoMateriaisOutro)
                && hasTextIfProvided(metodologiaOutro)
                && hasTextIfProvided(avaliacaoOutro)
                && hasTextIfProvided(curriculoOutro)
                && hasTextIfProvided(apoioInstitucionalOutro);
    }

    private boolean hasTextIfProvided(String value) {
        return value == null || !value.isBlank();
    }
}
