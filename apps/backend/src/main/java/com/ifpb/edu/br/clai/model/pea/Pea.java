package com.ifpb.edu.br.clai.model.pea;

import java.util.UUID;

import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pei.Pei;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pea")
public class Pea {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "pea_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pei_id", nullable = false)
    private Pei pei;

    @Column(name = "componente_curricular", columnDefinition = "TEXT")
    private String componenteCurricular;

    @Column(name = "semestre_ano", columnDefinition = "TEXT")
    private String semestreAno;

    @Column(name = "docente", columnDefinition = "TEXT")
    private String docente;

    @Column(name = "objetivo_geral", columnDefinition = "TEXT")
    private String objetivoGeral;

    @Column(name = "objetivos_especificos", columnDefinition = "TEXT")
    private String objetivosEspecificos;

    @Column(name = "conteudos_programaticos", columnDefinition = "TEXT")
    private String conteudosProgramaticos;

    @Column(name = "metodologia", columnDefinition = "TEXT")
    private String metodologia;

    @Column(name = "avaliacao", columnDefinition = "TEXT")
    private String avaliacao;

    @Column(name = "bibliografia_basica", columnDefinition = "TEXT")
    private String bibliografiaBasica;

    @Column(name = "bibliografia_complementar", columnDefinition = "TEXT")
    private String bibliografiaComplementar;

    @Column(name = "status", nullable = false)
    private Boolean status = true;


}
