package com.ifpb.edu.br.clai.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.ifpb.edu.br.clai.model.pea.Pea;

public interface PeaRepository extends JpaRepository<Pea, UUID>, JpaSpecificationExecutor<Pea> {

}
