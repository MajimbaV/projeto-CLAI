package com.ifpb.edu.br.clai.model.estudodecaso;

import com.ifpb.edu.br.clai.model.Aluno;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Embeddable
@Getter
@Setter
public class Identificacao {

    @ManyToOne
    @JoinColumn(name = "aluno_id", referencedColumnName = "id")
    private Aluno alunoId;

    @ElementCollection
    @CollectionTable(name = "identificacao_datas_anamnese", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "ide_data_anamnese", nullable = false)
    private List<LocalDate> datasAnamnese = new ArrayList<>();

    @Column(length = 60)
    private String ide_nome_profissional;
}
