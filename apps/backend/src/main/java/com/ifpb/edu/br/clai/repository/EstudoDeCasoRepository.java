package com.ifpb.edu.br.clai.repository;

import com.ifpb.edu.br.clai.model.estudodecaso.EstudoDeCaso;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface EstudoDeCasoRepository extends JpaRepository<EstudoDeCaso, UUID> {

    @Modifying
    @Query("""
    UPDATE EstudoDeCaso e
    SET e.situacao = :situacaoNova
    WHERE e.situacao = :situacaoAtual
            """)
    void atualizarSituacao(
            @Param("situacaoAtual") SituacaoEstudoDeCaso situacaoAtual,
            @Param("situacaoNova") SituacaoEstudoDeCaso situacaoNova
    );
}
