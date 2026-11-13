package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.pei.PeiRequestDto;
import com.ifpb.edu.br.clai.dto.pei.PeiResponseDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.PeiMapper;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pei.Pei;
import com.ifpb.edu.br.clai.repository.AlunoRepository;
import com.ifpb.edu.br.clai.repository.PeiRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PeiService {

    private final PeiRepository peiRepository;
    private final AlunoRepository alunoRepository;
    private final AlunoService alunoService;

    public PeiService(PeiRepository peiRepository, AlunoRepository alunoRepository, AlunoService alunoService) {
        this.peiRepository = peiRepository;
        this.alunoRepository = alunoRepository;
        this.alunoService = alunoService;
    }

    @Transactional
    public PeiResponseDto criar(PeiRequestDto request) {
        UUID alunoId = request.alunoId();
        Aluno aluno = alunoService.buscarOuFalhar(alunoId);

        if (peiRepository.existsByAluno_IdAndAtivoTrue(alunoId) && !Boolean.FALSE.equals(request.ativo())) {
            throw new BusinessRuleException("O aluno já possui um PEI ativo.");
        }

        Pei pei = peiRepository.save(PeiMapper.requestToEntity(request, aluno));
        return PeiMapper.entityToResponse(pei);
    }
}
