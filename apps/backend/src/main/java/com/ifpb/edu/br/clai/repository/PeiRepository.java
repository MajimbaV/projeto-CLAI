package com.ifpb.edu.br.clai.repository;

import com.ifpb.edu.br.clai.model.pei.Pei;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface PeiRepository extends JpaRepository<Pei, UUID>, JpaSpecificationExecutor<Pei> {

    boolean existsByAluno_IdAndAtivoTrue(UUID alunoId);
}
