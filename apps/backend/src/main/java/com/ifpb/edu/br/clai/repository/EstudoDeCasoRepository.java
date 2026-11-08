package com.ifpb.edu.br.clai.repository;

import com.ifpb.edu.br.clai.model.estudodecaso.EstudoDeCaso;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EstudoDeCasoRepository extends JpaRepository<EstudoDeCaso, UUID> {
    List<EstudoDeCaso> findByIdentificacaoAlunoIdAlunoMatricula(String matricula);
}
