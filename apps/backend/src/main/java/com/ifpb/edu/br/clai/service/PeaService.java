
package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.pea.PeaRequestDto;
import com.ifpb.edu.br.clai.dto.pea.PeaResponseDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.PeaMapper;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pea.Pea;
import com.ifpb.edu.br.clai.model.pei.Pei;
import com.ifpb.edu.br.clai.repository.PeaRepository;
import com.ifpb.edu.br.clai.repository.PeiRepository;
import com.ifpb.edu.br.clai.specification.PeaSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class PeaService {

        private final PeaRepository peaRepository;
        private final PeiRepository peiRepository;
        private final AlunoService alunoService;

        public PeaService(PeaRepository peaRepository, PeiRepository peiRepository, AlunoService alunoService) {
            this.peaRepository = peaRepository;
            this.peiRepository = peiRepository;
            this.alunoService = alunoService;
        }

        public Pea buscarOuFalhar(UUID id) {
            return peaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "PEA não encontrado com o ID: " + id
                ));
        }

        public Pei buscarPeiOuFalhar(UUID id) {
            return peiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PEI não encontrado com o ID: " + id));
        }

        public Page<PeaResponseDto> getAllPeas(
                String nomeAluno,
                String matriculaAluno,
                UUID peiId,
                Boolean statusAtivo,
                Pageable pageable
        ) {
            Specification<Pea> spec = PeaSpecification.comFiltros(
                    nomeAluno,
                    matriculaAluno,
                    peiId,
                    statusAtivo
            );

            return peaRepository.findAll(spec, pageable)
                    .map(PeaMapper::entityToResponse);
        }

        public PeaResponseDto getPeaById(UUID id) {
            Pea pea = buscarOuFalhar(id);
            return PeaMapper.entityToResponse(pea);
        }

        private void validarPeaAtivo(Pea pea, String operacao) {
            if (Boolean.FALSE.equals(pea.getStatus())) {
                throw new BusinessRuleException(
                    "Não é possível " + operacao + " porque o PEA encontra-se inativo (arquivado).");
            }
        }

        private void validarPeaInativo(Pea pea, String operacao) {
            if (!Boolean.FALSE.equals(pea.getStatus())) {
                throw new BusinessRuleException("Não é possível " + operacao + " porque o PEA encontra-se ativo.");
            }
        }

        private void validarAlunoAtivo(Aluno aluno, String operacao) {
            if (Boolean.FALSE.equals(aluno.getStatusAtivo())) {
                throw new BusinessRuleException("Não é possível " + operacao + " porque o aluno encontra-se inativo (arquivado).");
            }
        }

        private void validarPeiAtivo(Pei pei) {
            if (Boolean.FALSE.equals(pei.getAtivo())) {
                throw new BusinessRuleException("Não é possível cadastrar um PEA associado a um PEI inativo.");
            }
        }

        private void validarVinculoAlunoPei(Aluno aluno, Pei pei) {
            if (pei.getAluno() != null && !pei.getAluno().getId().equals(aluno.getId())) {
                throw new BusinessRuleException("O PEI informado não pertence ao aluno selecionado.");
            }
        }

        private void validarRegrasDominio(Aluno aluno, Pei pei) {
            validarAlunoAtivo(aluno, "cadastrar um PEA");
            validarPeiAtivo(pei);
            validarVinculoAlunoPei(aluno, pei);
        }

        @Transactional(rollbackFor = Exception.class)
        public PeaResponseDto createPea(PeaRequestDto request) {

            Aluno aluno = alunoService.buscarOuFalhar(request.alunoId());

            Pei pei = peiRepository.findById(request.peiId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "PEI não encontrado com o ID: " + request.peiId()
                ));

            validarRegrasDominio(aluno, pei);

            Pea pea = PeaMapper.requestToEntity(request, aluno, pei);

            pea.setStatus(true);

            Pea peaGuardado = peaRepository.save(pea);

            return PeaMapper.entityToResponse(peaGuardado);
        }
    }
