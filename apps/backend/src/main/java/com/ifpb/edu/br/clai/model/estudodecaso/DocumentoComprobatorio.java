package com.ifpb.edu.br.clai.model.estudodecaso;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Embeddable
@Getter
@Setter
public class DocumentoComprobatorio {
    @Column(name = "n_documento_descricao", nullable = false, length = 300)
    private String descricao;

    @Column(name = "n_documento_data", nullable = false)
    private LocalDate data;

    @Column(name = "n_documento_profissional", nullable = false, length = 150)
    private String profissional;
}
