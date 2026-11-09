package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.dto.estudodecaso.request.create.EstudoDeCasoFiltroRequestDto;
import com.ifpb.edu.br.clai.model.estudodecaso.EstudoDeCaso;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;
import org.springframework.data.jpa.domain.Specification;

public final class EstudoDeCasoSpecification {

    private EstudoDeCasoSpecification() {
    }

    public static Specification<EstudoDeCaso> comFiltros(EstudoDeCasoFiltroRequestDto filtro) {
        return Specification
                .where(nomeAlunoContains(filtro.nomeAluno()))
                .and(matriculaAlunoContains(filtro.matriculaAluno()))
                .and(situacaoEquals(filtro.situacao()));
    }

    private static Specification<EstudoDeCaso> situacaoEquals(SituacaoEstudoDeCaso situacao) {
        return (root, query, cb) -> {
            if (situacao == null) {
                return cb.conjunction();
            }

            return cb.equal(root.get("situacaoEstudoDeCaso"), situacao);
        };
    }

    private static Specification<EstudoDeCaso> matriculaAlunoContains(String matricula) {
        return (root, query, cb) -> {
            if (matricula == null || matricula.isBlank()) {
                return cb.conjunction();
            }

            return cb.like(
                    root.get("identificacao").get("alunoId").get("alunoMatricula"),
                    "%" + matricula.trim() + "%"
            );
        };
    }

    private static Specification<EstudoDeCaso> nomeAlunoContains(String nome) {
        return (root, query, cb) -> {
            if (nome == null || nome.isBlank()) {
                return cb.conjunction();
            }

            return cb.like(
                    cb.lower(root.get("identificacao").get("alunoId").get("alunoNome")),
                    "%" + nome.trim().toLowerCase() + "%"
            );
        };
    }
}