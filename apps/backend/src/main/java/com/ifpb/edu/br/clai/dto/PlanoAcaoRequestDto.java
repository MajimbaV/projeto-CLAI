package com.ifpb.edu.br.clai.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ifpb.edu.br.clai.model.enums.AfirmacaoEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.util.List;

public record PlanoAcaoRequestDto(
        @NotBlank(message = "A matrícula do aluno associado é obrigatória")
        @Pattern(regexp = "^\\d+$", message = "A matrícula deve conter apenas números")
        String matricula,

        @NotBlank(message = "Informe se há comorbidade relevante")
        AfirmacaoEnum comorbidadeRelevante,

        List<String> comorbidadeDescricao,

        @NotBlank(message = "Informe se faz uso de medicação")
        AfirmacaoEnum fazUsoMedicacao,

        List<String> medicacaoDescricao,

        @NotBlank(message = "Informe se frequenta serviços de apoio")
        AfirmacaoEnum frequentaServicoApoio,

        List<String> servicoApoioDescricao,

        @NotNull(message = "Informe se apresentou documentos comprobatórios")
        AfirmacaoEnum apresentouDocumentos,

        List<String> documentosDescricao,

        @NotBlank(message = "As necessidades específicas são obrigatórias")
        String necessidades,

        @NotBlank(message = "O relato de avanços e dificuldades é obrigatório")
        String relatoDificuldades,

        @NotBlank(message = "As principais demandas são obrigatórias")
        String demandas,

        @NotBlank(message = "As propostas de intervenção são obrigatórias")
        String propostas,

        @NotBlank(message = "A data do plano é obrigatória")
        @Past(message = "A data do plano de ação deve ser uma data passada")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate dataPlano
) {}