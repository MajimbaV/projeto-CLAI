package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record NecessidadesEspecificasRequestDto(
        @NotBlank @Size(max = 150) String necessidadeInformada,
        List<@NotBlank @Size(max = 255) String> diagnosticos,
        @NotNull List<@NotNull @Valid DocumentoComprobatorioRequestDto> documentos,
        @NotNull List<@NotBlank @Size(max = 300) String> condicoesAssociadas,
        @NotNull List<@NotBlank @Size(max = 300) String> medicacoesContinuas,
        @NotBlank @Size(max = 1000) String encaminhamentosAnteriores,
        @NotBlank @Size(max = 1000) String servicosApoioAtuaisAnteriores
) {}
