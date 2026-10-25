package com.ifpb.edu.br.clai.model.estudodecaso;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.StatusEstudoDeCaso;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class EstudoDeCaso {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Embedded
    private Identificacao identificacao;

    @Embedded
    private MotivoDemanda motivoDemanda;

    @Embedded
    private NecessidadesEspecificas necessidadesEspecificas;

    @Embedded
    private Anamnese anamnese;

    @Embedded
    private PerfilEstudante perfilEstudante;

    @Embedded
    private ContextoPsicossocial contextoPsicossocial;

    @Embedded
    private Potencialidades potencialidades;

    @Embedded
    private NecessidadesEducacionais necessidadesEducacionais;

    @Embedded
    private SintesePsicopedagogica sintesePsicopedagogica;

    @Embedded
    private ChecklistApoios checklistApoios;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusEstudoDeCaso statusEstudoDeCaso;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao", nullable = false)
    private SituacaoEstudoDeCaso situacaoEstudoDeCaso;
}
