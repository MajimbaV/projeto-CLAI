package com.ifpb.edu.br.clai.model.estudodecaso;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class ContextoPsicossocial {

    @Column(name = "c_relacao_curso_expectativas", length = 500)
    private String relacaoComCursoEExpectativas;

    @Column(name = "c_rede_apoio_familiar_social", length = 500)
    private String redeApoioFamiliarSocial;

    @Column(name = "c_conflitos_fatores_psicossociais", length = 500)
    private String conflitosOuFatoresPsicossociais;

    @Column(name = "c_observacoes_frequencia_rotina_permanencia", length = 500)
    private String observacoesFrequenciaRotinaPermanencia;
}
