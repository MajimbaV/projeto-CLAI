package com.ifpb.edu.br.clai.model.estudodecaso;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class PerfilEstudante {

    @Column(name = "p_comunicacao_compreensao_orientacoes", length = 500)
    private String comunicacaoCompreensaoOrientacoes;

    @Column(name = "p_leitura_escrita_linguagem", length = 500)
    private String leituraEscritaLinguagem;

    @Column(name = "p_raciocinio_logico_matematico", length = 500)
    private String raciocinioLogicoMatematico;

    @Column(name = "p_atencao_memoria_funcoes_executivas", length = 500)
    private String atencaoMemoriaFuncoesExecutivas;

    @Column(name = "p_organizacao_planejamento_realizacao_tarefas", length = 500)
    private String organizacaoPlanejamentoRealizacaoTarefas;

    @Column(name = "p_interacao_social_participacao_sala", length = 500)
    private String interacaoSocialParticipacaoSala;

    @Column(name = "p_aspectos_sensoriais_relevantes", length = 500)
    private String aspectosSensoriaisRelevantes;

    @Column(name = "p_mobilidade_acesso_tecnologias_recursos", length = 500)
    private String mobilidadeAcessoTecnologiasRecursos;

    @Column(name = "p_autonomia_contexto_familiar", length = 500)
    private String autonomiaContextoFamiliar;

    @Column(name = "p_autonomia_contexto_escolar", length = 500)
    private String autonomiaContextoEscolar;

    @Column(name = "p_estrategias_favorecem_aprendizagem", length = 500)
    private String estrategiasQueFavorecemAprendizagem;

    @Column(name = "p_situacoes_dificultam_aprendizagem", length = 500)
    private String situacoesQueDificultamAprendizagem;
}
