package com.ifpb.edu.br.clai.model.estudodecaso;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class SintesePsicopedagogica {

    @Column(name = "sp_identificacao_necessidades_especificas", length = 1000)
    private String identificacaoNecessidadesEspecificas;

    @Column(name = "sp_avancos_objetivos_conhecimentos_alcancados", length = 1000)
    private String avancosObjetivosConhecimentosAlcancados;

    @Column(name = "sp_dificuldades_barreiras_repercussao_educacional", length = 1000)
    private String dificuldadesBarreirasComRepercussaoEducacional;

    @Column(name = "sp_potencialidades_condicoes_facilitadoras", length = 1000)
    private String potencialidadesECondicoesFacilitadoras;

    @Column(name = "sp_principais_demandas_identificadas", length = 1000)
    private String principaisDemandasIdentificadasNoCaso;
}
