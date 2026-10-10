package com.ifpb.edu.br.clai.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "al_nome", nullable = false, length = 100)
    private String alunoNome;

    @Column(name="al_nascimento", nullable = false)
    private LocalDate alunoNascimento;

    @Column(name = "al_telefone")
    private String alunoTelefone;

    @Column(name = "al_email", length = 60)
    private String alunoEmail;

    @Column(name = "rs_nome", length = 100)
    private String nomeResponsavel;

    @Column(name = "rs_parentesco", length = 30)
    private String grauParentesco;

    @Column(name = "rs_telefone", length = 25)
    private String responsavelTelefone;

    @Column(name = "rs_email", length = 60)
    private String responsavelEmail;

    @Column(name = "al_matricula",nullable = false, length = 100)
    private String alunoMatricula;

    @Column(name="al_curso", nullable = false, length = 100)
    private String alunoCurso;

    @Column(name = "al_periodo_ingresso", nullable = false)
    private String periodoIngresso;

    @Column(name="al_periodo_letivo", nullable = false)
    private String periodoAluno;

}
