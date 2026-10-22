package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;

public record PerfilEstudanteRequestDto(
        @NotBlank @Size(max = 500) String comunicacaoCompreensaoOrientacoes,
        @NotBlank @Size(max = 500) String leituraEscritaLinguagem,
        @NotBlank @Size(max = 500) String raciocinioLogicoMatematico,
        @NotBlank @Size(max = 500) String atencaoMemoriaFuncoesExecutivas,
        @NotBlank @Size(max = 500) String organizacaoPlanejamentoRealizacaoTarefas,
        @NotBlank @Size(max = 500) String interacaoSocialParticipacaoSala,
        @NotBlank @Size(max = 500) String aspectosSensoriaisRelevantes,
        @NotBlank @Size(max = 500) String mobilidadeAcessoTecnologiasRecursos,
        @NotBlank @Size(max = 500) String autonomiaContextoFamiliar,
        @NotBlank @Size(max = 500) String autonomiaContextoEscolar,
        @NotBlank @Size(max = 500) String estrategiasQueFavorecemAprendizagem,
        @NotBlank @Size(max = 500) String situacoesQueDificultamAprendizagem
) {}
