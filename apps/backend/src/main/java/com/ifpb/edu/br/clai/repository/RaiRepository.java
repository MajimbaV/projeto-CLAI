package com.ifpb.edu.br.clai.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.ifpb.edu.br.clai.model.rai.Rai;

public interface RaiRepository extends JpaRepository<Rai, UUID>, JpaSpecificationExecutor<Rai>{
    boolean existsByPeaId(UUID peaId);
}
