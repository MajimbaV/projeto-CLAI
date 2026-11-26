package com.ifpb.edu.br.clai.model.rai;

import java.util.ArrayList;
import java.util.List;

import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeCognitiva;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter @Setter
public class AspectoHabilidadeCognitiva {
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "rai_habilidade_cognitiva",
                     joinColumns = @JoinColumn(name = "rai_id"))
    @Column(name = "tipo_habilidade_cognitiva")
    @Enumerated(EnumType.STRING)
    private List<TipoHabilidadeCognitiva> tipos = new ArrayList<>();

    @Column(name = "cognitiva_outros")
    private String outros;

    @Column(name = "cognitiva_comentario", columnDefinition = "TEXT")
    private String comentario;
}
