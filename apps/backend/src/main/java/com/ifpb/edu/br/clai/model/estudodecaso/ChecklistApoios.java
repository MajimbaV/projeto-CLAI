package com.ifpb.edu.br.clai.model.estudodecaso;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioAcessibilidade;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioAvaliacao;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioComunicacao;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioCurriculo;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioInstitucional;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioMetodologia;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Embeddable
@Getter
@Setter
public class ChecklistApoios {

    @ElementCollection
    @CollectionTable(name = "ca_acessibilidade", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "ca_opcao", length = 50)
    @Enumerated(EnumType.STRING)
    private List<ApoioAcessibilidade> acessibilidadeAmbiente = new ArrayList<>();

    @Column(name = "ca_acessibilidade_outro", length = 500)
    private String acessibilidadeAmbienteOutro;

    @ElementCollection
    @CollectionTable(name = "ca_comunicacao_materiais", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "ca_opcao", length = 50)
    @Enumerated(EnumType.STRING)
    private List<ApoioComunicacao> comunicacaoMateriais = new ArrayList<>();

    @Column(name = "ca_comunicacao_outro", length = 500)
    private String comunicacaoMateriaisOutro;

    @ElementCollection
    @CollectionTable(name = "ca_metodologia", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "ca_opcao", length = 50)
    @Enumerated(EnumType.STRING)
    private List<ApoioMetodologia> metodologia = new ArrayList<>();

    @Column(name = "ca_metodologia_outro", length = 500)
    private String metodologiaOutro;

    @ElementCollection
    @CollectionTable(name = "ca_avaliacao", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "ca_opcao", length = 50)
    @Enumerated(EnumType.STRING)
    private List<ApoioAvaliacao> avaliacao = new ArrayList<>();

    @Column(name = "ca_avaliacao_outro", length = 500)
    private String avaliacaoOutro;

    @ElementCollection
    @CollectionTable(name = "ca_curriculo", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "ca_opcao", length = 50)
    @Enumerated(EnumType.STRING)
    private List<ApoioCurriculo> curriculo = new ArrayList<>();

    @Column(name = "ca_curriculo_outro", length = 500)
    private String curriculoOutro;

    @ElementCollection
    @CollectionTable(name = "ca_apoios_institucionais", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "ca_opcao", length = 50)
    @Enumerated(EnumType.STRING)
    private List<ApoioInstitucional> apoiosInstitucionais = new ArrayList<>();

    @Column(name = "ca_apoio_institucional_outro", length = 500)
    private String apoioInstitucionalOutro;

    @Column(name = "ca_apoios_externos_encaminhamentos", length = 1500)
    private String apoiosExternosEncaminhamentos;

    @Column(name = "ca_psicopedagogo_responsavel", length = 200)
    private String psicopedagogoResponsavel;

    @Column(name = "ca_coordenador_responsavel", length = 200)
    private String coordenadorResponsavel;

    @Column(name = "ca_data")
    private LocalDate data;
}
