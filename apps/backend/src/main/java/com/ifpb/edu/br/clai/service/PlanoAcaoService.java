package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.planoacao.PlanoAcaoRequestDto;
import com.ifpb.edu.br.clai.dto.planoacao.PlanoAcaoResponseDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.FieldValidationException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.PlanoAcaoMapper;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.planoacao.PlanoAcao;
import com.ifpb.edu.br.clai.model.planoacao.enums.AfirmacaoEnum;
import com.ifpb.edu.br.clai.repository.AlunoRepository;
import com.ifpb.edu.br.clai.repository.PlanoAcaoRepository;
import com.ifpb.edu.br.clai.specification.PlanoAcaoSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
public class PlanoAcaoService {
    private final PlanoAcaoRepository planoAcaoRepository;
    private final AlunoRepository alunoRepository;
    private final AlunoService alunoService;

    public PlanoAcaoService(PlanoAcaoRepository planoAcaoRepository, AlunoRepository alunoRepository, AlunoService alunoService){
        this.planoAcaoRepository = planoAcaoRepository;
        this.alunoRepository = alunoRepository;
        this.alunoService = alunoService;
    }

    private boolean isListaVazia(List<String> lista) {
        return lista == null || lista.isEmpty();
    }

    private void validarRegrasAdicionais(PlanoAcaoRequestDto dto, Map<String, String> errors) {
        if (dto.comorbidadeRelevante() == AfirmacaoEnum.SIM && isListaVazia(dto.comorbidadeDescricao())) {
            errors.put("comorbidadeDescricao", "É necessário descrever as comorbidades quando marcado como SIM.");
        } else if (dto.comorbidadeRelevante() == AfirmacaoEnum.NAO && !isListaVazia(dto.comorbidadeDescricao())) {
            errors.put("comorbidadeDescricao", "A lista de comorbidades deve estar vazia quando marcado como NAO.");
        }

        if (dto.fazUsoMedicacao() == AfirmacaoEnum.SIM && isListaVazia(dto.medicacaoDescricao())) {
            errors.put("medicacaoDescricao", "É necessário descrever as medicações quando marcado como SIM.");
        } else if (dto.fazUsoMedicacao() == AfirmacaoEnum.NAO && !isListaVazia(dto.medicacaoDescricao())) {
            errors.put("medicacaoDescricao", "A lista de medicações deve estar vazia quando marcado como NAO.");
        }

        if (dto.frequentaServicoApoio() == AfirmacaoEnum.SIM && isListaVazia(dto.servicoApoioDescricao())) {
            errors.put("servicoApoioDescricao", "É necessário descrever os serviços de apoio quando marcado como SIM.");
        } else if (dto.frequentaServicoApoio() == AfirmacaoEnum.NAO && !isListaVazia(dto.servicoApoioDescricao())) {
            errors.put("servicoApoioDescricao", "A lista de serviços de apoio deve estar vazia quando marcado como NAO.");
        }

        if (dto.apresentouDocumentos() == AfirmacaoEnum.SIM && isListaVazia(dto.documentosDescricao())) {
            errors.put("documentosDescricao", "É necessário descrever os documentos apresentados quando marcado como SIM.");
        } else if (dto.apresentouDocumentos() == AfirmacaoEnum.NAO && !isListaVazia(dto.documentosDescricao())) {
            errors.put("documentosDescricao", "A lista de documentos deve estar vazia quando marcado como NAO.");
        }
    }

    private PlanoAcao buscarOuFalhar(UUID id) {
        return planoAcaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plano não encontrado com o ID: " + id));
    }

    @Transactional(readOnly = true)
    public Page<PlanoAcaoResponseDto> getAllPlanoAcao(String nomeAluno, String matriculaAluno, Boolean statusAtivo, Pageable pageable) {
        Specification<PlanoAcao> spec = Specification.where(PlanoAcaoSpecification.filtrarPorStatusAtivo(statusAtivo));

        if ((nomeAluno != null && !nomeAluno.isBlank()) || (matriculaAluno != null && !matriculaAluno.isBlank())) {
            List<Aluno> alunosFiltrados = alunoService.findAlunosPorFiltros(nomeAluno, matriculaAluno);
            spec = spec.and(PlanoAcaoSpecification.filtrarPorEstudantes(alunosFiltrados));
        }

        return planoAcaoRepository.findAll(spec, pageable)
                .map(PlanoAcaoMapper::entityToResponse);
    }
    @Transactional
    public PlanoAcaoResponseDto createPlanoAcao(PlanoAcaoRequestDto request) {
        Map<String, String> errors = new HashMap<>();

        if (Boolean.FALSE.equals(request.statusAtivo())) {
            errors.put("statusAtivo", "Um Plano de Ação não pode ser criado como inativo.");
        }

        validarRegrasAdicionais(request, errors);

        if (!errors.isEmpty()) {
            throw new FieldValidationException(errors);
        }

        Aluno aluno = alunoRepository.findByAlunoMatricula(request.matricula())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com a matrícula: " + request.matricula()));

        PlanoAcao planoAcao = new PlanoAcao();
        PlanoAcaoMapper.requestToEntity(request, planoAcao);

        planoAcao.setEstudante(aluno);
        planoAcao.setStatusAtivo(true);

        PlanoAcao planoAcaoGuardado = planoAcaoRepository.save(planoAcao);
        return PlanoAcaoMapper.entityToResponse(planoAcaoGuardado);
    }

    @Transactional
    public PlanoAcaoResponseDto updatePlanoAcao(UUID id, PlanoAcaoRequestDto request){
        Map<String, String> errors = new HashMap<>();
        validarRegrasAdicionais(request, errors);

        if (!errors.isEmpty()) {
            throw new FieldValidationException(errors);
        }

        PlanoAcao planoAcao = buscarOuFalhar(id);

        if (!planoAcao.getEstudante().getAlunoMatricula().equals(request.matricula())) {
            throw new BusinessRuleException("Não é permitido alterar a matrícula do aluno em um Plano de Ação já existente.");
        }

        PlanoAcaoMapper.requestToEntity(request, planoAcao);
        PlanoAcao planoAcaoAtualizado = planoAcaoRepository.save(planoAcao);

        return PlanoAcaoMapper.entityToResponse(planoAcaoAtualizado);
    }

    @Transactional
    public void deletePlanoAcao(UUID id) {
        PlanoAcao planoAcao = planoAcaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plano de Ação não encontrado com o ID: " + id));

        planoAcao.setStatusAtivo(false);
        planoAcaoRepository.save(planoAcao);
    }

    public Page<PlanoAcaoResponseDto> getPlanosByMatricula(String matricula, Pageable pageable) {
        alunoRepository.findByAlunoMatricula(matricula)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com a matrícula: " + matricula));

        return planoAcaoRepository.findByEstudanteAlunoMatricula(matricula, pageable)
                .map(PlanoAcaoMapper::entityToResponse);
    }

    @Transactional(readOnly = true)
    public PlanoAcaoResponseDto getPlanoAcaoById(UUID id) {
        PlanoAcao planoAcao = buscarOuFalhar(id);
        return PlanoAcaoMapper.entityToResponse(planoAcao);
    }
}