package com.ifpb.edu.br.clai.model.estudodecaso;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.DimensaoNecessidadeEducacional;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.PrioridadeNecessidadeEducacional;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class BarreiraEducacional {

    @Enumerated(EnumType.STRING)
    @Column(name = "dimensao", length = 50)
    private DimensaoNecessidadeEducacional dimensao;

    @Column(name = "barreira_necessidade", length = 1000)
    private String barreiraNecessidade;

    @Column(name = "evidencias_impactos", length = 1500)
    private String evidenciasImpactos;

    @Enumerated(EnumType.STRING)
    @Column(name = "prioridade", length = 10)
    private PrioridadeNecessidadeEducacional prioridade;
}
