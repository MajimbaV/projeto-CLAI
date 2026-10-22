package com.ifpb.edu.br.clai.model.estudodecaso;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Potencialidades {

    @Column(name = "pot_potencialidades_academicas", length = 500)
    private String potencialidadesAcademicas;

    @Column(name = "pot_interesses_habilidades", length = 500)
    private String interessesHabilidades;

    @Column(name = "pot_formas_preferenciais_aprendizagem", length = 500)
    private String formasPreferenciaisAprendizagemEDemonstracao;

    @Column(name = "pot_recursos_favoraveis_desempenho", length = 500)
    private String recursosQueFavorecemDesempenho;
}
