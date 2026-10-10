package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.AlunoRequestDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.AlunoMapper;
import com.ifpb.edu.br.clai.model.Aluno;
import com.ifpb.edu.br.clai.repository.AlunoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AlunoService {
    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    private void validarRegraMaioridade(AlunoRequestDto dto) {
        if (dto.alunoNascimento() == null) {
            throw new BusinessRuleException("A data de nascimento é obrigatória.");
        }

        int idade = Period.between(dto.alunoNascimento(), LocalDate.now()).getYears();

        boolean temNomeResponsavel = dto.nomeResponsavel() != null && !dto.nomeResponsavel().isBlank();
        boolean temTelefoneResponsavel = dto.responsavelTelefone() != null && !dto.responsavelTelefone().isBlank();
        boolean temQualquerDadoResponsavel = temNomeResponsavel || temTelefoneResponsavel ||
                (dto.grauParentesco() != null && !dto.grauParentesco().isBlank()) ||
                (dto.responsavelEmail() != null && !dto.responsavelEmail().isBlank());

        if (idade < 18) {
            if (!temNomeResponsavel || !temTelefoneResponsavel) {
                throw new BusinessRuleException("Alunos menores de idade (" + idade + " anos) exigem a informação do nome e telefone do responsável.");
            }
        } else {
            if (temQualquerDadoResponsavel) {
                throw new BusinessRuleException("Alunos maiores de idade (" + idade + " anos) não devem conter informações de responsável.");
            }
        }
    }

    private Aluno buscarOuFalhar(UUID id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com o ID: " + id));
    }

    public AlunoRequestDto createAluno(AlunoRequestDto dto) {
        validarRegraMaioridade(dto);

        Aluno aluno = new Aluno();
        AlunoMapper.requestToEntity(dto, aluno);
        
        return alunoRepository.save(aluno); 
    }

    // futuramente vamos criar um response dto
    public List<AlunoRequestDto> getAllAlunos() {
        return alunoRepository.findAll().stream()
                .map(AlunoMapper::entityToResponse)
                .collect(Collectors.toList());
    }

    public AlunoRequestDto getAlunoById(UUID id) {
        Aluno aluno = buscarOuFalhar(id);
        return AlunoMapper.entityToResponse(aluno);
    }

    public AlunoRequestDto updateAluno(UUID id, AlunoRequestDto dto) {
        Aluno aluno = buscarOuFalhar(id);

        validarRegraMaioridade(dto);
        AlunoMapper.requestToEntity(dto, aluno);
        
        return alunoRepository.save(aluno);
    }

    public void deleteAluno(UUID id) {
        Aluno aluno = buscarOuFalhar(id);
        alunoRepository.delete(aluno);
    }

}
