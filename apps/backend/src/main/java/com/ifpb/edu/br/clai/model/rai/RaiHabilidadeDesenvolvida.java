package com.ifpb.edu.br.clai.model.rai;

import java.util.UUID;

import com.ifpb.edu.br.clai.model.rai.enums.NivelAprendizado;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rai_habilidade_desenvolvida")
@Getter @Setter
@NoArgsConstructor
public class RaiHabilidadeDesenvolvida {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "rai_id", nullable = false)
    private Rai rai;

    @Column(name = "habilidade_desenvolvida", columnDefinition = "TEXT")
    private String habilidadeDesenvolvida;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_aprendizado")
    private NivelAprendizado nivelAprendizado;

    @Column(name = "observacoes", columnDefinition = "TEXT")
    private String observacoes;
}
