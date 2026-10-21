package com.ifpb.edu.br.clai.repository;

import com.ifpb.edu.br.clai.model.PlanoAcao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PlanoAcaoRepository extends JpaRepository<PlanoAcao, UUID> {
    Page<PlanoAcao> findByEstudanteAlunoMatricula(String matricula, Pageable pageable);
}
