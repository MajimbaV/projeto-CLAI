package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.AlunoDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
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

    private void copiarDtoParaEntidade(AlunoDto dto, Aluno aluno) {
        aluno.setAlunoNome(dto.alunoNome());
        aluno.setAlunoNascimento(dto.alunoNascimento());
        aluno.setAlunoTelefone(dto.alunoTelefone());
        aluno.setAlunoEmail(dto.alunoEmail());
        aluno.setAlunoMatricula(dto.alunoMatricula());
        aluno.setAlunoCurso(dto.alunoCurso());
        aluno.setPeriodoIngresso(dto.periodoIngresso());
        aluno.setPeriodoAluno(dto.periodoAluno());

        aluno.setNomeResponsavel(dto.nomeResponsavel());
        aluno.setGrauParentesco(dto.grauParentesco());
        aluno.setResponsavelTelefone(dto.responsavelTelefone());
        aluno.setResponsavelEmail(dto.responsavelEmail());
    }

    private AlunoDto copiarEntidadeParaDto(Aluno aluno) {
        return new AlunoDto(
                aluno.getAlunoNome(),
                aluno.getAlunoNascimento(),
                aluno.getAlunoTelefone(),
                aluno.getAlunoEmail(),
                aluno.getNomeResponsavel(),
                aluno.getGrauParentesco(),
                aluno.getResponsavelTelefone(),
                aluno.getResponsavelEmail(),
                aluno.getAlunoMatricula(),
                aluno.getAlunoCurso(),
                aluno.getPeriodoIngresso(),
                aluno.getPeriodoAluno()
        );
    }

    private void validarRegraMaioridade(AlunoDto dto) {
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

    public AlunoDto createAluno(AlunoDto dto) {
        validarRegraMaioridade(dto);

        Aluno aluno = new Aluno();
        copiarDtoParaEntidade(dto, aluno);
        Aluno alunoGuardado = alunoRepository.save(aluno);

        return copiarEntidadeParaDto(alunoGuardado);
    }

    public List<AlunoDto> getAllAlunos() {
        return alunoRepository.findAll().stream()
                .map(this::copiarEntidadeParaDto)
                .collect(Collectors.toList());
    }

    public AlunoDto getAlunoById(UUID id) {
        Aluno aluno = buscarOuFalhar(id);
        return copiarEntidadeParaDto(aluno);
    }

    public AlunoDto updateAluno(UUID id, AlunoDto dto) {
        Aluno aluno = buscarOuFalhar(id);

        validarRegraMaioridade(dto);
        copiarDtoParaEntidade(dto, aluno);

        Aluno alunoAtualizado = alunoRepository.save(aluno);
        return copiarEntidadeParaDto(alunoAtualizado);
    }

    public void deleteAluno(UUID id) {
        Aluno aluno = buscarOuFalhar(id);
        alunoRepository.delete(aluno);
    }

}
