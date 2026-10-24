package com.ifpb.edu.br.clai.mapper;

import com.ifpb.edu.br.clai.dto.PlanoAcaoRequestDto;
import com.ifpb.edu.br.clai.dto.PlanoAcaoResponseDto;
import com.ifpb.edu.br.clai.model.PlanoAcao;

public class PlanoAcaoMapper {

    public static void requestToEntity(PlanoAcaoRequestDto request, PlanoAcao planoAcao) {
        planoAcao.setComorbidadeRelevante(request.comorbidadeRelevante());
        planoAcao.setComorbidadeDescricao(request.comorbidadeDescricao());
        planoAcao.setFazUsoMedicacao(request.fazUsoMedicacao());
        planoAcao.setMedicacaoDescricao(request.medicacaoDescricao());
        planoAcao.setFrequentaServicoApoio(request.frequentaServicoApoio());
        planoAcao.setServicoApoioDescricao(request.servicoApoioDescricao());
        planoAcao.setApresentouDocumentos(request.apresentouDocumentos());
        planoAcao.setDocumentosDescricao(request.documentosDescricao());
        planoAcao.setNecessidades(request.necessidades());
        planoAcao.setRelatoDificuldades(request.relatoDificuldades());
        planoAcao.setDemandas(request.demandas());
        planoAcao.setPropostas(request.propostas());
        planoAcao.setDataPlano(request.dataPlano());

        if (request.statusAtivo() != null) {
            planoAcao.setStatusAtivo(request.statusAtivo());
        }
    }

    public static PlanoAcaoResponseDto entityToResponse(PlanoAcao planoAcao) {
        return new PlanoAcaoResponseDto(
                planoAcao.getId(),
                planoAcao.getEstudante().getAlunoMatricula(),
                planoAcao.getEstudante().getAlunoNome(),
                planoAcao.getComorbidadeRelevante(),
                planoAcao.getComorbidadeDescricao(),
                planoAcao.getFazUsoMedicacao(),
                planoAcao.getMedicacaoDescricao(),
                planoAcao.getFrequentaServicoApoio(),
                planoAcao.getServicoApoioDescricao(),
                planoAcao.getApresentouDocumentos(),
                planoAcao.getDocumentosDescricao(),
                planoAcao.getNecessidades(),
                planoAcao.getRelatoDificuldades(),
                planoAcao.getDemandas(),
                planoAcao.getPropostas(),
                planoAcao.getDataPlano(),
                planoAcao.getStatusAtivo()
        );
    }
}