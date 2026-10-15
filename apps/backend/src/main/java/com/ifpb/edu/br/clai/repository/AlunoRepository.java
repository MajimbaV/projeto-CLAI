package com.ifpb.edu.br.clai.repository;

import com.ifpb.edu.br.clai.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface AlunoRepository extends JpaRepository<Aluno, UUID> {

    boolean existsByAlunoMatricula(@Param("matricula") String alunoMatricula);

    boolean existsByAlunoMatriculaAndIdNot(@Param("matricula") String alunoMatricula, @Param("id") UUID id);

    Optional<Aluno> findByAlunoMatricula(String matricula);
}
