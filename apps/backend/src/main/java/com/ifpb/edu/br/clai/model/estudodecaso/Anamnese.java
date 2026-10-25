package com.ifpb.edu.br.clai.model.estudodecaso;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Embeddable
@Getter
@Setter
public class Anamnese {

    @Column(name = "a_historico_escolar", length = 1000)
    private String historicoEscolar;

    @Column(name = "a_experiencias_escolares_positivas", length = 1000)
    private String experienciasEscolaresPositivas;

    @Column(name = "a_experiencias_escolares_negativas", length = 1000)
    private String experienciasEscolaresNegativas;

    @Column(name = "a_adaptacoes_recursos_resultados", length = 1000)
    private String adaptacoesRecursosEResultados;

    @Column(name = "a_objetivos_conhecimentos_consolidados", length = 1000)
    private String objetivosConhecimentosConsolidados;

    @ElementCollection
    @CollectionTable(name = "a_areas_facilidade", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "a_area_disciplina_facilidade", length = 300)
    private List<String> areasDisciplinasFacilidade = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "a_areas_dificuldade", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "a_area_disciplina_dificuldade", length = 300)
    private List<String> areasDisciplinasDificuldade = new ArrayList<>();
}
