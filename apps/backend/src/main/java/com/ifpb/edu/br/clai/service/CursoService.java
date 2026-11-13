package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.curso.CursoRequestDto;
import com.ifpb.edu.br.clai.dto.curso.CursoResponseDto;
import com.ifpb.edu.br.clai.exception.BusinessRuleException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.CursoMapper;
import com.ifpb.edu.br.clai.model.curso.Curso;
import com.ifpb.edu.br.clai.model.curso.enums.Modalidade;
import com.ifpb.edu.br.clai.model.curso.enums.NivelEnsino;
import com.ifpb.edu.br.clai.model.curso.enums.Turno;
import com.ifpb.edu.br.clai.repository.CursoRepository;
import com.ifpb.edu.br.clai.specification.CursoSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class CursoService {

    private final CursoRepository cursoRepository;

    public CursoService(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    private void validarRegrasAdicionais(CursoRequestDto dto) {
        Map<String, String> errors = new HashMap<>();

        if (dto.cursoModalidade() == Modalidade.EAD && dto.cursoTurno() == Turno.INTEGRAL) {
            errors.put("cursoTurno", "Cursos na modalidade EAD não podem ser cadastrados com turno INTEGRAL.");
        }

        if (dto.nivelEnsino() == NivelEnsino.TECNICO_INTEGRADO && dto.cursoTurno() == Turno.NOTURNO) {
            errors.put("cursoTurno", "Cursos do Nível Técnico Integrado não podem ser ofertados no turno NOTURNO.");
        }

        if (dto.nivelEnsino() == NivelEnsino.TECNICO_SUBSEQUENTE && dto.cursoTurno() == Turno.INTEGRAL) {
            errors.put("cursoTurno", "Cursos do Nível Técnico Subsequente não devem ser cadastrados com turno INTEGRAL.");
        }

        if (dto.nomeCurso() != null && dto.nomeCurso().trim().length() < 8) {
            errors.put("nomeCurso", "O nome do curso deve conter pelo menos 8 caracteres.");
        }
    }

    public void validarCursoInativo(Curso curso, String operacao){
        if (Boolean.FALSE.equals(curso.getStatusAtivo())) {
            throw new BusinessRuleException("Não é possível " + operacao + " porque o curso encontra-se inativo (arquivado).");
        }
    }

    public void validarCursoAtivo(Curso curso, String operacao){
        if (!Boolean.FALSE.equals(curso.getStatusAtivo())) {
            throw new BusinessRuleException("Não é possível " + operacao + " porque o curso encontra-se ativo.");
        }
    }

    public Curso buscarOuFalhar(UUID id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso não encontrado com o ID: " + id));
    }

    @Transactional
    public CursoResponseDto createCurso(CursoRequestDto request){
        validarRegrasAdicionais(request);

        Curso curso =  new Curso();
        CursoMapper.requestToEntity(request, curso);

        curso.setStatusAtivo(true);

        Curso cursoGuardado = cursoRepository.save(curso);

        return CursoMapper.entityToResponse(cursoGuardado);
    }

    @Transactional(readOnly = true)
    public Page<CursoResponseDto> getAllCursos(String nome, Boolean status, Modalidade mod, NivelEnsino nivel, Turno turno, Pageable pageable) {

        Specification<Curso> spec = CursoSpecification.comFiltros(nome, status, mod, nivel, turno);
        return cursoRepository.findAll(spec, pageable).map(CursoMapper::entityToResponse);
    }

    @Transactional(readOnly = true)
    public CursoResponseDto getCursoBySigla(String sigla) {
        Curso curso = cursoRepository.findByCursoSigla(sigla.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Curso não encontrado com a sigla: " + sigla));
        return CursoMapper.entityToResponse(curso);
    }

    @Transactional(readOnly = true)
    public CursoResponseDto getCursoById(UUID id) {
        Curso curso = buscarOuFalhar(id);
        return CursoMapper.entityToResponse(curso);
    }

    @Transactional
    public void ativarCurso(UUID id) {
        Curso curso = buscarOuFalhar(id);
        validarCursoAtivo(curso, "ativar");
        curso.setStatusAtivo(true);
        cursoRepository.save(curso);
    }

    @Transactional
    public void deleteCurso(UUID id) {
        Curso curso = buscarOuFalhar(id);
        validarCursoInativo(curso, "inativar");
        curso.setStatusAtivo(false);
        cursoRepository.save(curso);
    }

    @Transactional
    public CursoResponseDto updateCurso(UUID id, CursoRequestDto request) {
        Curso curso = buscarOuFalhar(id);

        validarRegrasAdicionais(request);

        CursoMapper.requestToEntity(request, curso);

        Curso cursoAtualizado = cursoRepository.save(curso);
        return CursoMapper.entityToResponse(cursoAtualizado);
    }
}
