package main.java.com.ifpb.edu.br.clai.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record AlunoDto(@NotBlank(message = "O nome do aluno é obrigatório")
                       @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
                       String alunoNome,

                       @NotNull(message = "A data de nascimento é obrigatória")
                       @Past(message = "A data de nascimento deve ser uma data passada")
                       LocalDate alunoNascimento,

                       String alunoTelefone,

                       @Email(message = "Formato de e-mail inválido")
                       @Size(max = 60, message = "O e-mail deve ter no máximo 60 caracteres")
                       String alunoEmail,

                       @NotBlank(message = "O nome do responsável é obrigatório")
                       @Size(max = 100, message = "O nome do responsável deve ter no máximo 100 caracteres")
                       String nomeResponsavel,

                       @NotBlank(message = "O grau de parentesco é obrigatório")
                       String grauParentesco,

                       @NotBlank(message = "O telefone do responsável é obrigatório")
                       String responsavelTelefone,

                       @NotBlank(message = "O e-mail do responsável é obrigatório")
                       @Email(message = "Formato de e-mail do responsável inválido")
                       String responsavelEmail,

                       @NotBlank(message = "A matrícula do aluno é obrigatória")
                       @Size(min = 5, max = 100, message = "A matrícula deve ter entre 5 e 100 caracteres")
                       String alunoMatricula,

                       @NotBlank(message = "O curso do aluno é obrigatório")
                       @Size(max = 100, message = "O curso deve ter no máximo 100 caracteres")
                       String alunoCurso,

                       @NotBlank(message = "O período de ingresso é obrigatório")
                       String periodoIngresso,

                       @NotBlank(message = "O período letivo é obrigatório")
                       String periodoAluno) {
}
