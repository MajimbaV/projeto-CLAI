package com.ifpb.edu.br.clai.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.ifpb.edu.br.clai.dto.rai.request.RaiRequestDto;
import com.ifpb.edu.br.clai.dto.rai.response.RaiResponseDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.FieldValidationException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.RaiMapper;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pea.Pea;
import com.ifpb.edu.br.clai.model.rai.Rai;
import com.ifpb.edu.br.clai.model.rai.RaiHabilidadeDesenvolvida;
import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeCognitiva;
import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeSocioemocional;
import com.ifpb.edu.br.clai.model.rai.enums.TipoRelacionamento;
import com.ifpb.edu.br.clai.repository.RaiRepository;
import com.ifpb.edu.br.clai.specification.RaiSpecification;

@Service
@Transactional(readOnly = true)
public class RaiService {

    private final RaiRepository raiRepository;
    private final PeaService peaService;
    private final AlunoService alunoService;

    public RaiService(RaiRepository raiRepository, PeaService peaService, AlunoService alunoService) {
        this.raiRepository = raiRepository;
        this.peaService = peaService;
        this.alunoService = alunoService;
    }

    public Rai buscarOuFalhar(UUID id) {
        return raiRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("RAI não encontrado com o ID: " + id));
    }

    @Transactional(readOnly = true)
    public Page<RaiResponseDto> getAllRais(
            String nomeAluno,
            String matriculaAluno,
            UUID peaId,
            UUID peiId,
            Pageable pageable
    ) {
        Specification<Rai> specification = RaiSpecification.comFiltros(nomeAluno, matriculaAluno, peaId, peiId);
        return raiRepository.findAll(specification, pageable)
                .map(RaiMapper::entityToResponse);
    }

    @Transactional(readOnly = true)
    public RaiResponseDto getRaiById(UUID id) {
        return RaiMapper.entityToResponse(buscarOuFalhar(id));
    }

    private void validarCamposCondicionais(RaiRequestDto request) {
        Map<String, String> errors = new LinkedHashMap<>();

        if (Boolean.FALSE.equals(request.statusAtivo())) {
            errors.put("statusAtivo", "Um RAI não pode ser criado como inativo.");
        }

        if (request.relacionamento() != null) {
            boolean marcouOutros = request.relacionamento().tipos() != null
                && request.relacionamento().tipos().contains(TipoRelacionamento.OUTROS);
            boolean preencheuOutros = request.relacionamento().outros() != null
                && !request.relacionamento().outros().isBlank();

            if (marcouOutros && !preencheuOutros) {
                errors.put("relacionamento.outros", "A descrição de outros deve ser informada quando 'OUTROS' for selecionado.");
            }
        }

        if (request.habilidadesCognitivas() != null) {
            boolean marcouOutros = request.habilidadesCognitivas().tipos() != null
                && request.habilidadesCognitivas().tipos().contains(TipoHabilidadeCognitiva.OUTROS);
            boolean preencheuOutros = request.habilidadesCognitivas().outros() != null
                && !request.habilidadesCognitivas().outros().isBlank();

            if (marcouOutros && !preencheuOutros) {
                errors.put("habilidadesCognitivas.outros", "A descrição de outros deve ser informada quando 'OUTROS' for selecionado.");
            }
        }

        if (request.habilidadesSocioemocionais() != null) {
            boolean marcouOutros = request.habilidadesSocioemocionais().tipos() != null
                && request.habilidadesSocioemocionais().tipos().contains(TipoHabilidadeSocioemocional.OUTROS);
            boolean preencheuOutros = request.habilidadesSocioemocionais().outros() != null
                && !request.habilidadesSocioemocionais().outros().isBlank();

            if (marcouOutros && !preencheuOutros) {
                errors.put("habilidadesSocioemocionais.outros", "A descrição de outros deve ser informada quando 'OUTROS' for selecionado.");
            }
        }

        if (!errors.isEmpty()) {
            throw new FieldValidationException(errors);
        }
    }

    private void validarAlunoAtivo(Aluno aluno, String operacao) {
        if (Boolean.FALSE.equals(aluno.getStatusAtivo())) {
            throw new BusinessRuleException("Não é possível " + operacao + " porque o aluno encontra-se inativo (arquivado).");
        }
    }

    private void validarPeaAtivo(Pea pea, String operacao) {
        if (Boolean.FALSE.equals(pea.getStatus())) {
            throw new BusinessRuleException("Não é possível " + operacao + " porque o PEA encontra-se inativo (arquivado).");
        }
    }

    private void validarVinculoAlunoPea(Aluno aluno, Pea pea) {
        if (pea.getAluno() != null && !pea.getAluno().getId().equals(aluno.getId())) {
            throw new BusinessRuleException("O PEA informado não pertence ao aluno selecionado.");
        }
    }

    private void validarUnicidadePea(UUID peaId) {
        if (raiRepository.existsByPeaId(peaId)) {
            throw new BusinessRuleException("Já existe um RAI cadastrado para o PEA informado.");
        }
    }

    private void validarRegrasDominio(Aluno aluno, Pea pea) {
        validarAlunoAtivo(aluno, "cadastrar um RAI");
        validarPeaAtivo(pea, "cadastrar um RAI");
        validarVinculoAlunoPea(aluno, pea);
        validarUnicidadePea(pea.getId());
    }

    @Transactional(rollbackFor = Exception.class)
    public RaiResponseDto createRai(RaiRequestDto request) {
        validarCamposCondicionais(request);

        Aluno aluno = alunoService.buscarOuFalhar(request.alunoId());
        Pea pea = peaService.buscarOuFalhar(request.peaId());

        validarRegrasDominio(aluno, pea);

        Rai rai = RaiMapper.requestToEntity(request, aluno, pea);
        rai.setStatusAtivo(true);

        if (request.habilidadesDesenvolvidas() != null && !request.habilidadesDesenvolvidas().isEmpty()) {
            List<RaiHabilidadeDesenvolvida> habilidades = request.habilidadesDesenvolvidas().stream()
                .map(dto -> RaiMapper.toHabilidadeEntity(dto, rai))
                .collect(Collectors.toCollection(ArrayList::new));
            rai.setHabilidadesDesenvolvidas(habilidades);
        }

        Rai raiSalvo = raiRepository.save(rai);

        return RaiMapper.entityToResponse(raiSalvo);
    }
}
