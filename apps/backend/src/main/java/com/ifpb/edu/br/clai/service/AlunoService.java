package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.aluno.AlunoRequestDto;
import com.ifpb.edu.br.clai.dto.aluno.AlunoResponseDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.FieldValidationException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.AlunoMapper;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.curso.Curso;
import com.ifpb.edu.br.clai.repository.AlunoRepository;
import com.ifpb.edu.br.clai.repository.CursoRepository;
import com.ifpb.edu.br.clai.specification.AlunoSpecification;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final CursoRepository cursoRepository;

    public AlunoService(AlunoRepository alunoRepository, CursoRepository cursoRepository) {
        this.alunoRepository = alunoRepository;
        this.cursoRepository = cursoRepository;
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

    private void validarAlunoAtivo(Aluno aluno, String operacao) {
        if (Boolean.FALSE.equals(aluno.getStatusAtivo())) {
            throw new BusinessRuleException("Não é possível " + operacao + " porque o aluno encontra-se inativo (arquivado).");
        }
    }

    private void validarAlunoInativo(Aluno aluno, String operacao) {
        if (!Boolean.FALSE.equals(aluno.getStatusAtivo())) {
            throw new BusinessRuleException("Não é possível " + operacao + " porque o aluno encontra-se Ativo.");
        }
    }

    public Aluno buscarOuFalhar(UUID id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com o ID: " + id));
    }

    public List<Aluno> findAlunosPorFiltros(String nome, String matricula, Boolean statusAtivo) {
        if (statusAtivo == null) {
            statusAtivo = true;
        }

        Specification<Aluno> spec = Specification.where(AlunoSpecification.filtrarPorNome(nome))
                .and(AlunoSpecification.filtrarPorMatricula(matricula))
                .and(AlunoSpecification.filtrarPorStatusAtivo(statusAtivo));

        return alunoRepository.findAll(spec);
    }

    @Transactional
    public AlunoResponseDto createAluno(AlunoRequestDto dto) {
        validarRegrasAdicionais(dto);
        validarMatriculaUnica(dto.alunoMatricula(), null);

        Aluno aluno = new Aluno();
        AlunoMapper.requestToEntity(dto, aluno);
        aluno.setCurso(buscarCursoAtivo(dto.cursoId()));

        aluno.setStatusAtivo(true);

        Aluno alunoGuardado = alunoRepository.save(aluno);
        return AlunoMapper.entityToResponse(alunoGuardado);
    }


    public Page<AlunoResponseDto> getAllAlunos(String nome, String matricula, String curso, UUID cursoId, String periodo, Boolean maioridade, Boolean statusAtivo, Pageable pageable) {

        if (statusAtivo == null) {
            statusAtivo = true;
        }

        Specification<Aluno> spec = Specification.where(AlunoSpecification.filtrarPorNome(nome))
                .and(AlunoSpecification.filtrarPorMatricula(matricula))
                .and(AlunoSpecification.filtrarPorCurso(curso))
                .and(AlunoSpecification.filtrarPorCursoId(cursoId))
                .and(AlunoSpecification.filtrarPorPeriodo(periodo))
                .and(AlunoSpecification.filtrarPorMaioridade(maioridade))
                .and(AlunoSpecification.filtrarPorStatusAtivo(statusAtivo));

        return alunoRepository.findAll(spec, mapearOrdenacaoCurso(pageable))
                .map(AlunoMapper::entityToResponse);
    }

    public AlunoResponseDto getAlunoById(UUID id) {
        Aluno aluno = buscarOuFalhar(id);
        return AlunoMapper.entityToResponse(aluno);
    }

    @Transactional
    public AlunoResponseDto updateAluno(UUID id, AlunoRequestDto dto) {
        Aluno aluno = buscarOuFalhar(id);
        validarAlunoAtivo(aluno, "atualizar os dados");
        validarRegrasAdicionais(dto);
        validarMatriculaUnica(dto.alunoMatricula(), id);

        AlunoMapper.requestToEntity(dto, aluno);
        aluno.setCurso(buscarCursoAtivo(dto.cursoId()));
        Aluno alunoAtualizado = alunoRepository.save(aluno);
        return AlunoMapper.entityToResponse(alunoAtualizado);
    }

    private Curso buscarCursoAtivo(UUID cursoId) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Curso não encontrado com o ID: " + cursoId));
        if (Boolean.FALSE.equals(curso.getStatusAtivo())) {
            throw new BusinessRuleException("Não é possível associar o aluno porque o curso encontra-se inativo (arquivado).");
        }
        return curso;
    }

    private Pageable mapearOrdenacaoCurso(Pageable pageable) {
        Sort sort = Sort.by(pageable.getSort().stream()
                .map(order -> "alunoCurso".equals(order.getProperty())
                        ? order.withProperty("curso.nomeCurso")
                        : order)
                .toList());

        if (pageable.isUnpaged()) {
            return Pageable.unpaged(sort);
        }
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
    }

    @Transactional
    public void inativarPorMatricula(String matricula) {
        Aluno aluno = alunoRepository.findByAlunoMatricula(matricula)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Aluno não encontrado com a matrícula: " + matricula
                ));

        validarAlunoAtivo(aluno, "inativar o aluno");

        aluno.setStatusAtivo(false);
        alunoRepository.save(aluno);
    }

    @Transactional
    public void ativarPorMatricula(String matricula) {
        Aluno aluno = alunoRepository.findByAlunoMatricula(matricula)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Aluno não encontrado com a matrícula: " + matricula
                ));

        validarAlunoInativo(aluno, "ativar o aluno");

        aluno.setStatusAtivo(true);
        alunoRepository.save(aluno);
    }

    public AlunoResponseDto getAlunoByMatricula(String matricula) {
        Aluno aluno = alunoRepository.findByAlunoMatricula(matricula)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com a matrícula: " + matricula));
        return AlunoMapper.entityToResponse(aluno);
    }
}