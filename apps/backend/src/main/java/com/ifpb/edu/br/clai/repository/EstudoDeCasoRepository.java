package com.ifpb.edu.br.clai.repository;

import com.ifpb.edu.br.clai.model.estudodecaso.EstudoDeCaso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EstudoDeCasoRepository extends JpaRepository<EstudoDeCaso, UUID> {

}
