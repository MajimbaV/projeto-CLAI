package com.ifpb.edu.br.clai.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record AlunoRequestDto(
        @NotBlank(message = "O nome do aluno é obrigatório")
        @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
        String alunoNome,
        @NotNull(message = "A data de nascimento é obrigatória")
        @Past(message = "A data de nascimento deve ser uma data passada")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate alunoNascimento,
        @Pattern(regexp = "^\\d+$", message = "O telefone deve conter apenas números")
        String alunoTelefone,
        @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Formato de e-mail inválido. O domínio e extensão são obrigatórios")
        @Size(max = 60, message = "O e-mail deve ter no máximo 60 caracteres")
        String alunoEmail,
        @Size(max = 100, message = "O nome do responsável deve ter no máximo 100 caracteres")
        String nomeResponsavel,
        @Size(max = 30, message = "O grau de parentesco deve ter no máximo 30 caracteres")
        String grauParentesco,
        @Pattern(regexp = "^$|^\\d+$", message = "O telefone do responsável deve conter apenas números")
        String responsavelTelefone,
        @Pattern(regexp = "^$|^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Formato de e-mail do responsável inválido. O domínio e extensão são obrigatórios")
        @Size(max = 60, message = "O e-mail do responsável deve ter no máximo 60 caracteres")
        String responsavelEmail,
        @NotBlank(message = "A matrícula do aluno é obrigatória")
        @Pattern(regexp = "^\\d+$", message = "A matrícula deve conter apenas números")
        @Size(min = 5, max = 100, message = "A matrícula deve ter entre 5 e 100 caracteres")
        String alunoMatricula,
        @NotBlank(message = "O curso do aluno é obrigatório")
        @Size(max = 100, message = "O curso deve ter no máximo 100 caracteres")
        String alunoCurso,
        @NotBlank(message = "O período de ingresso é obrigatório")
        @Pattern(
                regexp = "^\\d{4}\\.[1-2]$",
                message = "O período de ingresso deve estar no formato AAAA.S com semestre 1 ou 2 (ex: 2026.1 ou 2026.2)"
        )
        String periodoIngresso,
        @NotBlank(message = "O período letivo é obrigatório")
        @Pattern(
                regexp = "^\\d{4}\\.[1-2]$",
                message = "O período letivo deve estar no formato AAAA.S com semestre 1 ou 2 (ex: 2026.1 ou 2026.2)"
        )
        
        String periodoAluno
        ) {}
