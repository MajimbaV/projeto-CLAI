package com.ifpb.edu.br.clai.dto;
import com.ifpb.edu.br.clai.model.planoacao.AfirmacaoEnum;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record PlanoAcaoResponseDto(
        UUID id,
        String matricula,
        AfirmacaoEnum comorbidadeRelevante,
        List<String> comorbidadeDescricao,
        AfirmacaoEnum fazUsoMedicacao,
        List<String> medicacaoDescricao,
        AfirmacaoEnum frequentaServicoApoio,
        List<String> servicoApoioDescricao,
        AfirmacaoEnum apresentouDocumentos,
        List<String> documentosDescricao,
        String necessidades,
        String relatoDificuldades,
        String demandas,
        String propostas,
        LocalDate dataPlano,
        Boolean statusAtivo) {}