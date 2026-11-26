package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.pei.Pei;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.text.Normalizer;

public final class PeiSpecification {

    private PeiSpecification() {}

    public static Specification<Pei> comFiltros(
            String nomeAluno,
            String matriculaAluno,
            Boolean statusAtivo
    ) {
        return Specification.where(filtrarPorNomeAluno(nomeAluno))
                .and(filtrarPorMatriculaAluno(matriculaAluno))
                .and(filtrarPorStatusAtivo(statusAtivo));
    }

    public static Specification<Pei> filtrarPorNomeAluno(String nomeAluno) {
        return (root, query, cb) -> {
            if (nomeAluno == null || nomeAluno.isBlank()) {
                return cb.conjunction();
            }

            if (query != null && Long.class != query.getResultType() && long.class != query.getResultType()) {
                query.distinct(true);
            }

            String termo = Normalizer.normalize(nomeAluno.trim().toLowerCase(), Normalizer.Form.NFD)
                    .replaceAll("\\p{M}+", "");
            Expression<String> nomeBanco = cb.lower(root.join("aluno").get("alunoNome"));
            Expression<String> nomeBancoTratado = cb.function(
                    "translate",
                    String.class,
                    nomeBanco,
                    cb.literal("áéíóúãõâêîôûç"),
                    cb.literal("aeiouaoaeiouc")
            );
            return cb.like(nomeBancoTratado, "%" + termo + "%");
        };
    }

    public static Specification<Pei> filtrarPorMatriculaAluno(String matriculaAluno) {
        return (root, query, cb) -> {
            if (matriculaAluno == null || matriculaAluno.isBlank()) {
                return cb.conjunction();
            }

            if (query != null && Long.class != query.getResultType() && long.class != query.getResultType()) {
                query.distinct(true);
            }

            return cb.like(root.join("aluno").get("alunoMatricula"), "%" + matriculaAluno.trim() + "%");
        };
    }

    public static Specification<Pei> filtrarPorStatusAtivo(Boolean statusAtivo) {
        return (root, query, cb) -> {
            if (statusAtivo == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("ativo"), statusAtivo);
        };
    }
}

