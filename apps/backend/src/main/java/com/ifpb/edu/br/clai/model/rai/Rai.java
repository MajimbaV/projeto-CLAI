package com.ifpb.edu.br.clai.model.rai;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pea.Pea;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "rai")
public class Rai {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "rai_id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pea_id", nullable = false, unique = true)
    private Pea pea;

    @Embedded
    private AspectoRelacionamento relacionamento;

    @Embedded
    private AspectoHabilidadeCognitiva habilidadesCognitivas;

    @Embedded
    private AspectoHabilidadeSocioemocional habilidadesSocioemocionais;

    @Column(name = "avancos_gerais", columnDefinition = "TEXT")
    private String avancosGerais;

    @Column(name = "dificuldades_aprendizagem", columnDefinition = "TEXT")
    private String dificuldadesAprendizagem;

    @Column(name = "fatores_externos", columnDefinition = "TEXT")
    private String fatoresExternos;

    @Column(name = "parecer", columnDefinition = "TEXT")
    private String parecer;

    @Column(name = "data_relatorio")
    private LocalDate data;
    
    @OneToMany(mappedBy = "rai", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RaiHabilidadeDesenvolvida> habilidadesDesenvolvidas = new ArrayList<>();


    @Column(name = "status")
    private boolean statusAtivo = true;
}
