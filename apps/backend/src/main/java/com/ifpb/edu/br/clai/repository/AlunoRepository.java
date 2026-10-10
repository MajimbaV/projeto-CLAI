package com.ifpb.edu.br.clai.repository;

import com.ifpb.edu.br.clai.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface AlunoRepository extends JpaRepository<Aluno, UUID> {}
