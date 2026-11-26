package com.ifpb.edu.br.clai.model.rai;

import java.util.ArrayList;
import java.util.List;

import com.ifpb.edu.br.clai.model.rai.enums.TipoRelacionamento;

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
public class AspectoRelacionamento {

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "rai_relacionamento",
                     joinColumns = @JoinColumn(name = "rai_id"))
    @Column(name = "tipo_relacionamento")
    @Enumerated(EnumType.STRING)
    private List<TipoRelacionamento> tipos = new ArrayList<>();

    @Column(name = "relacionamento_outros")
    private String outros;

    @Column(name = "relacionamento_comentario", columnDefinition = "TEXT")
    private String comentario;
    
}
