package com.ifpb.edu.br.clai.model.curso;

import com.ifpb.edu.br.clai.model.curso.enums.Modalidade;
import com.ifpb.edu.br.clai.model.curso.enums.NivelEnsino;
import com.ifpb.edu.br.clai.model.curso.enums.Turno;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "curso_nome", nullable = false)
    private String nomeCurso;

    @Column(name="curso_sigla", nullable = false, unique = true)
    private String cursoSigla;

    @Enumerated(EnumType.STRING)
    @Column(name = "curso_nivel", nullable = false)
    private NivelEnsino nivelEnsino;

    @Enumerated(EnumType.STRING)
    @Column(name = "curso_modalidade", nullable = false)
    private Modalidade cursoModalidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "curso_turno", nullable = false)
    private Turno cursoTurno;

    @Column(name = "status")
    private Boolean statusAtivo = true;

}

