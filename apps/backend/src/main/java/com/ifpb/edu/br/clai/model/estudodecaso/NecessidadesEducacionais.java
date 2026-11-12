package com.ifpb.edu.br.clai.model.estudodecaso;

import jakarta.persistence.CollectionTable;
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
public class NecessidadesEducacionais {

    @ElementCollection
    @CollectionTable(
            name = "ne_barreiras_educacionais",
            joinColumns = @JoinColumn(name = "estudo_de_caso_id")
    )
    private List<BarreiraEducacional> barreiras = new ArrayList<>();
}
