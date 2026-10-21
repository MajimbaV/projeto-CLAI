package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.PlanoAcaoRequestDto;
import com.ifpb.edu.br.clai.dto.PlanoAcaoResponseDto;
import com.ifpb.edu.br.clai.exception.FieldValidationException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.PlanoAcaoMapper;
import com.ifpb.edu.br.clai.model.Aluno;
import com.ifpb.edu.br.clai.model.PlanoAcao;
import com.ifpb.edu.br.clai.model.enums.AfirmacaoEnum;
import com.ifpb.edu.br.clai.repository.AlunoRepository;
import com.ifpb.edu.br.clai.repository.PlanoAcaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PlanoAcaoService {
    private final PlanoAcaoRepository planoAcaoRepository;
    private final AlunoRepository alunoRepository;

    public PlanoAcaoService(PlanoAcaoRepository planoAcaoRepository, AlunoRepository alunoRepository){
        this.planoAcaoRepository = planoAcaoRepository;
        this.alunoRepository = alunoRepository;
    }

    private void validarRegrasAdicionais(PlanoAcaoRequestDto dto) {
        Map<String, String> errors = new HashMap<>();

        if (dto.comorbidadeRelevante() == AfirmacaoEnum.SIM && (dto.comorbidadeDescricao() == null || dto.comorbidadeDescricao().isEmpty())) {
            errors.put("comorbidadeDescricao", "É necessário descrever as comorbidades quando marcado como SIM.");
        }

        if (dto.fazUsoMedicacao() == AfirmacaoEnum.SIM && (dto.medicacaoDescricao() == null || dto.medicacaoDescricao().isEmpty())) {
            errors.put("medicacaoDescricao", "É necessário descrever as medicações quando marcado como SIM.");
        }

        if (dto.frequentaServicoApoio() == AfirmacaoEnum.SIM && (dto.servicoApoioDescricao() == null || dto.servicoApoioDescricao().isEmpty())) {
            errors.put("servicoApoioDescricao", "É necessário descrever os serviços de apoio quando marcado como SIM.");
        }

        if (dto.apresentouDocumentos() == AfirmacaoEnum.SIM && (dto.documentosDescricao() == null || dto.documentosDescricao().isEmpty())) {
            errors.put("documentosDescricao", "É necessário descrever os documentos apresentados quando marcado como SIM.");
        }

        if (!errors.isEmpty()) {
            throw new FieldValidationException(errors);
        }
    }

    @Transactional
    public PlanoAcaoResponseDto createPlanoAcao(PlanoAcaoRequestDto request) {
        validarRegrasAdicionais(request);

        Aluno aluno = alunoRepository.findByAlunoMatricula(request.matricula())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com a matrícula: " + request.matricula()));

        PlanoAcao planoAcao = new PlanoAcao();

        PlanoAcaoMapper.requestToEntity(request, planoAcao);

        planoAcao.setEstudante(aluno);

        PlanoAcao planoAcaoGuardado = planoAcaoRepository.save(planoAcao);
        return PlanoAcaoMapper.entityToResponse(planoAcaoGuardado);
    }

    public Page<PlanoAcaoResponseDto> getAllPlanoAcao(Pageable pageable) {
        return planoAcaoRepository.findAll(pageable).map(PlanoAcaoMapper::entityToResponse);
    }

    @Transactional
    public void deletePlanoAcao(UUID id) {
        PlanoAcao planoAcao = planoAcaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plano de Ação não encontrado com o ID: " + id));

        planoAcaoRepository.delete(planoAcao);
    }
}

