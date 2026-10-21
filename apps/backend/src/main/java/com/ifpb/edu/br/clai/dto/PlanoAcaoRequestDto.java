package com.ifpb.edu.br.clai.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ifpb.edu.br.clai.model.enums.AfirmacaoEnum;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.List;

public record PlanoAcaoRequestDto(
        @NotBlank(message = "A matrícula do aluno associado é obrigatória")
        @Pattern(regexp = "^\\d+$", message = "A matrícula deve conter apenas números")
        String matricula,

        @NotNull(message = "Informe se há comorbidade relevante")
        AfirmacaoEnum comorbidadeRelevante,

        List<@NotBlank(message = "A descrição da comorbidade não pode estar vazia") String> comorbidadeDescricao,

        @NotNull(message = "Informe se faz uso de medicação")
        AfirmacaoEnum fazUsoMedicacao,

        List<@NotBlank(message = "A descrição da medicação não pode estar vazia") String> medicacaoDescricao,

        @NotNull(message = "Informe se frequenta serviços de apoio")
        AfirmacaoEnum frequentaServicoApoio,

        List<@NotBlank(message = "A descrição do serviço de apoio não pode estar vazia") String> servicoApoioDescricao,

        @NotNull(message = "Informe se apresentou documentos comprobatórios")
        AfirmacaoEnum apresentouDocumentos,

        List<@NotBlank(message = "A descrição do documento não pode estar vazia") String> documentosDescricao,

        @NotBlank(message = "As necessidades específicas são obrigatórias")
        String necessidades,

        @NotBlank(message = "O relato de avanços e dificuldades é obrigatório")
        String relatoDificuldades,

        @NotBlank(message = "As principais demandas são obrigatórias")
        String demandas,

        @NotBlank(message = "As propostas de intervenção são obrigatórias")
        String propostas,

        @NotNull(message = "A data do plano é obrigatória")
        @PastOrPresent(message = "A data do plano não pode ser uma data futura")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate dataPlano,
        Boolean statusAtivo
) {}