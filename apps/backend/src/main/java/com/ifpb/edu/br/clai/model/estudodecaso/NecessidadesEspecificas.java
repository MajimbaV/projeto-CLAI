package com.ifpb.edu.br.clai.model.estudodecaso;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Embeddable
@Getter
@Setter
public class NecessidadesEspecificas {
    @Column(name = "n_especifica_informada", length = 150)
    private String necessidadeInformada;

    @ElementCollection
    @CollectionTable(name = "n_diagnosticos", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "n_diagnostico")
    private List<String> diagnosticos = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "n_documentos_comprobatorios", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    private List<DocumentoComprobatorio> documentos = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "n_condicoes_associadas", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "n_condicao_associada", length = 300)
    private List<String> condicoesAssociadas = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "n_medicacoes_continuas", joinColumns = @JoinColumn(name = "estudo_de_caso_id"))
    @Column(name = "n_medicacao_continua", length = 300)
    private List<String> medicacoesContinuas = new ArrayList<>();

    @Column(name = "n_encaminhamentos_anteriores", length = 1000)
    private String encaminhamentosAnteriores;

    @Column(name = "n_servicos_apoio_atuais_anteriores", length = 1000)
    private String servicosApoioAtuaisAnteriores;
}
