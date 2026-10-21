package com.ifpb.edu.br.clai.model;

import com.ifpb.edu.br.clai.model.enums.AfirmacaoEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "plano_acao")
public class PlanoAcao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "al_associado", referencedColumnName = "al_matricula", nullable = false)
    private Aluno estudante;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "tem_comorbidade", nullable = false)
    private AfirmacaoEnum comorbidadeRelevante;

    @ElementCollection
    @CollectionTable(name = "plano_comorbidades", joinColumns = @JoinColumn(name = "plano_acao_id"))
    @Column(name = "comorbidade")
    private List<String> comorbidadeDescricao;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "uso_medicacao", nullable = false)
    private AfirmacaoEnum fazUsoMedicacao;

    @ElementCollection
    @CollectionTable(name = "plano_medicacoes", joinColumns = @JoinColumn(name = "plano_acao_id"))
    @Column(name = "medicacao")
    private List<String> medicacaoDescricao;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "frequenta_apoio", nullable = false)
    private AfirmacaoEnum frequentaServicoApoio;

    @ElementCollection
    @CollectionTable(name = "plano_servicos_apoio", joinColumns = @JoinColumn(name = "plano_acao_id"))
    @Column(name = "servico")
    private List<String> servicoApoioDescricao;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "apresentou_documentos", nullable = false)
    private AfirmacaoEnum apresentouDocumentos;

    @ElementCollection
    @CollectionTable(name = "plano_documentos", joinColumns = @JoinColumn(name = "plano_acao_id"))
    @Column(name = "documento")
    private List<String> documentosDescricao;

    @Column(name = "necessidades_especificas", columnDefinition = "TEXT")
    private String necessidades;

    @Column(name = "relato_avancos_dificuldades", columnDefinition = "TEXT")
    private String relatoDificuldades;

    @Column(name = "principais_demandas", columnDefinition = "TEXT")
    private String demandas;

    @Column(name = "propostas_intervencao", columnDefinition = "TEXT")
    private String propostas;

    @Column(name = "data_plano")
    private LocalDate dataPlano;
}