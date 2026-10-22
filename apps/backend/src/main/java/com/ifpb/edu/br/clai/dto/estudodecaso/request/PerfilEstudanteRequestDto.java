package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import jakarta.validation.constraints.Size;

public record PerfilEstudanteRequestDto(
        @Size(max = 500) String comunicacaoCompreensaoOrientacoes,
        @Size(max = 500) String leituraEscritaLinguagem,
        @Size(max = 500) String raciocinioLogicoMatematico,
        @Size(max = 500) String atencaoMemoriaFuncoesExecutivas,
        @Size(max = 500) String organizacaoPlanejamentoRealizacaoTarefas,
        @Size(max = 500) String interacaoSocialParticipacaoSala,
        @Size(max = 500) String aspectosSensoriaisRelevantes,
        @Size(max = 500) String mobilidadeAcessoTecnologiasRecursos,
        @Size(max = 500) String autonomiaContextoFamiliar,
        @Size(max = 500) String autonomiaContextoEscolar,
        @Size(max = 500) String estrategiasQueFavorecemAprendizagem,
        @Size(max = 500) String situacoesQueDificultamAprendizagem
) {}
