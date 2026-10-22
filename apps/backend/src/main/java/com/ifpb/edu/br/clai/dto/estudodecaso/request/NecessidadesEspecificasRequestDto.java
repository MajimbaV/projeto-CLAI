package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record NecessidadesEspecificasRequestDto(
        @Size(max = 150) String necessidadeInformada,
        List<@NotBlank @Size(max = 255) String> diagnosticos,
        List<@NotNull @Valid DocumentoComprobatorioRequestDto> documentos,
        List<@NotBlank @Size(max = 300) String> condicoesAssociadas,
        List<@NotBlank @Size(max = 300) String> medicacoesContinuas,
        @Size(max = 1000) String encaminhamentosAnteriores,
        @Size(max = 1000) String servicosApoioAtuaisAnteriores
) {}
