package com.ifpb.edu.br.clai.repository;

import com.ifpb.edu.br.clai.model.curso.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface CursoRepository extends JpaRepository<Curso, UUID>, JpaSpecificationExecutor<Curso> {
    Optional<Curso> findByCursoSigla(String cursoSigla);
}
