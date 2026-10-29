package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.aluno.AlunoRequestDto;
import com.ifpb.edu.br.clai.dto.aluno.AlunoResponseDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.FieldValidationException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.AlunoMapper;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.repository.AlunoRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    private void validarRegrasAdicionais(AlunoRequestDto dto) {
        Map<String, String> errors = new HashMap<>();

        // Validação cruzada (Email ou Telefone)
        boolean temEmail = dto.alunoEmail() != null && !dto.alunoEmail().isBlank();
        boolean temTelefone = dto.alunoTelefone() != null && !dto.alunoTelefone().isBlank();

        if (!temEmail && !temTelefone) {
            errors.put("contato", "É obrigatório informar o e-mail ou o telefone do aluno.");
        }

        if (dto.alunoNascimento() == null) {
            throw new BusinessRuleException("A data de nascimento é obrigatória.");
        }

        int idade = Period.between(dto.alunoNascimento(), LocalDate.now()).getYears();

        boolean temNomeResponsavel = dto.nomeResponsavel() != null && !dto.nomeResponsavel().isBlank();
        boolean temParentescoResponsavel = dto.grauParentesco() != null && !dto.grauParentesco().isBlank();
        boolean temTelefoneResponsavel = dto.responsavelTelefone() != null && !dto.responsavelTelefone().isBlank();
        boolean temEmailResponsavel = dto.responsavelEmail() != null && !dto.responsavelEmail().isBlank();
        boolean temAlgumDadoResponsavel = temNomeResponsavel || temParentescoResponsavel || temTelefoneResponsavel || temEmailResponsavel;

        if (idade < 18 || temAlgumDadoResponsavel) {

            String motivoErro = idade < 18
                    ? "para alunos menores de idade."
                    : "quando qualquer dado do responsável é informado.";

            if (!temNomeResponsavel) {
                errors.put("nomeResponsavel", "O nome do responsável é obrigatório " + motivoErro);
            }
            if (!temParentescoResponsavel) {
                errors.put("grauParentesco", "O grau de parentesco do responsável é obrigatório " + motivoErro);
            }
            if (!temTelefoneResponsavel) {
                errors.put("responsavelTelefone", "O telefone do responsável é obrigatório " + motivoErro);
            }
        }

        if (!errors.isEmpty()) {
            throw new FieldValidationException(errors);
        }
    }

    private void validarMatriculaUnica(String matricula, UUID id) {
        boolean matriculaJaExiste;

        if (id == null) {
            matriculaJaExiste = alunoRepository.existsByAlunoMatricula(matricula);
        } else {
            matriculaJaExiste = alunoRepository.existsByAlunoMatriculaAndIdNot(matricula, id);
        }
        if (matriculaJaExiste) {
            throw new BusinessRuleException("Já existe um aluno cadastrado com a matrícula " + matricula + ".");
        }
    }

    public Aluno buscarOuFalhar(UUID id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com o ID: " + id));
    }

    @Transactional
    public AlunoResponseDto createAluno(AlunoRequestDto dto) {
        validarRegrasAdicionais(dto);
        validarMatriculaUnica(dto.alunoMatricula(), null);

        Aluno aluno = new Aluno();
        AlunoMapper.requestToEntity(dto, aluno);

        aluno.setStatusAtivo(true);

        Aluno alunoGuardado = alunoRepository.save(aluno);
        return AlunoMapper.entityToResponse(alunoGuardado);
    }

    public Page<AlunoResponseDto> getAllAlunos(Pageable pageable) {
        return alunoRepository.findAll(pageable)
                .map(AlunoMapper::entityToResponse);
    }

    public AlunoResponseDto getAlunoById(UUID id) {
        Aluno aluno = buscarOuFalhar(id);
        return AlunoMapper.entityToResponse(aluno);
    }

    public AlunoResponseDto updateAluno(UUID id, AlunoRequestDto dto) {
        Aluno aluno = buscarOuFalhar(id);
        validarRegrasAdicionais(dto);
        validarMatriculaUnica(dto.alunoMatricula(), id);

        AlunoMapper.requestToEntity(dto, aluno);
        Aluno alunoAtualizado = alunoRepository.save(aluno);
        return AlunoMapper.entityToResponse(alunoAtualizado);
    }

    public AlunoResponseDto getAlunoByMatricula(String matricula) {
        Aluno aluno = alunoRepository.findByAlunoMatricula(matricula)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com a matrícula: " + matricula));
        return AlunoMapper.entityToResponse(aluno);
    }
}