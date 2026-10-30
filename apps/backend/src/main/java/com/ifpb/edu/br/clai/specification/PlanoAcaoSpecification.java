package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.planoacao.PlanoAcao;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.text.Normalizer;
import java.util.List;

public final class PlanoAcaoSpecification {

    private PlanoAcaoSpecification() {
        }

        public static Specification<PlanoAcao> filtrarPorStatusAtivo(
            Boolean statusAtivo
    ) {
        if (statusAtivo == null) {
            return (root, query, cb) -> cb.conjunction();
        }

        return (root, query, cb) ->
                cb.equal(root.get("statusAtivo"), statusAtivo);
    }
    public static Specification<PlanoAcao> filtrarPorEstudantes(List<Aluno> estudantes) {
        return (root, query, cb) -> {
            if (estudantes == null || estudantes.isEmpty()) {
                return cb.disjunction();
            }
            return root.get("estudante").in(estudantes);
        };
    }
}
