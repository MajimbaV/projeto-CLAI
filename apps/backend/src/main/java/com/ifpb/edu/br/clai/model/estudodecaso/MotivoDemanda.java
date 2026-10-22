package com.ifpb.edu.br.clai.model.estudodecaso;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.OrigemEncaminhamento;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class MotivoDemanda {

    @Enumerated(EnumType.STRING)
    @Column(name = "m_origem_encaminhamento")
    private OrigemEncaminhamento origemEncaminhamento;

    @Column(name = "m_origem_encaminhamento_outro",length = 100)
    private String outroOrigemEncaminhamento;

    @Column(name = "m_motivo", length = 300)
    private String  motivoPrincipal;

    @Column(name = "m_demanda_estudante")
    private String demandaDoEstudante;

    @Column(name = "m_demanda_profissional")
    private String demandaDoProfissional;

    @Column(name = "m_demanda_responsavel")
    private String demandaDoResponsavel;

    @Column(name = "m_demanda_equipe")
    private String demandaEquipeEscolar;
}
