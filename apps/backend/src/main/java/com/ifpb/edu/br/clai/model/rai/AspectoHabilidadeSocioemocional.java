package com.ifpb.edu.br.clai.model.rai;

import java.util.ArrayList;
import java.util.List;

import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeSocioemocional;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.JoinColumn;

@Embeddable
@Getter @Setter
public class AspectoHabilidadeSocioemocional {
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "rai_habilidade_socioemocional",
                     joinColumns = @JoinColumn(name = "rai_id"))
    @Column(name = "tipo_habilidade_socioemocional")
    @Enumerated(EnumType.STRING)
    private List<TipoHabilidadeSocioemocional> tipos = new ArrayList<>();

    @Column(name = "socioemocional_outros")
    private String outros;

    @Column(name = "socioemocional_comentario", columnDefinition = "TEXT")
    private String comentario;

    
}
