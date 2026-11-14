package com.ifpb.edu.br.clai.model.pei;

import com.ifpb.edu.br.clai.model.aluno.Aluno;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "pei")
public class Pei {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "pei_id")
    private UUID id;

    @Column(name = "historico", columnDefinition = "TEXT")
    private String historico;

    @Column(name = "necessidades_especificas", columnDefinition = "TEXT")
    private String necessidadesEspecificas;

    @Column(name = "conhecimentos_habilidades_interesses", columnDefinition = "TEXT")
    private String conhecimentosHabilidadesInteresses;

    @Column(name = "dificuldades_apresentadas", columnDefinition = "TEXT")
    private String dificuldadesApresentadas;

    @Column(name = "propostas_adaptacoes", columnDefinition = "TEXT")
    private String propostasAdaptacoes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aluno_id", referencedColumnName = "id", nullable = false, updatable = false)
    private Aluno aluno;

    @Column(name = "ativo")
    private Boolean ativo = true;


    @Column(name = "pei_periodo", nullable = false)
    private String periodoPei;
}
