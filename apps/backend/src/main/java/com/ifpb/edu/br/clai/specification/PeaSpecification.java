package com.ifpb.edu.br.clai.specification;

import java.text.Normalizer;
import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;

import com.ifpb.edu.br.clai.model.pea.Pea;

import jakarta.persistence.criteria.Expression;

public final class PeaSpecification {

    private PeaSpecification() {}

    public static Specification<Pea> comFiltros(
            String nomeAluno,
            String matriculaAluno,
            UUID peiId,
            Boolean statusAtivo
    ) {
        return Specification.where(filtrarPorNomeAluno(nomeAluno))
                .and(filtrarPorMatriculaAluno(matriculaAluno))
                .and(filtrarPorPeiId(peiId))
                .and(filtrarPorStatusAtivo(statusAtivo));
    }

    public static Specification<Pea> filtrarPorNomeAluno(String nomeAluno) {
        return (root, query, cb) -> {
            if (nomeAluno == null || nomeAluno.isBlank()) {
                return cb.conjunction();
            }

            query.distinct(true);
            String termo = Normalizer.normalize(nomeAluno.toLowerCase(), Normalizer.Form.NFD)
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

    public static Specification<Pea> filtrarPorMatriculaAluno(String matriculaAluno) {
        return (root, query, cb) -> {
            if (matriculaAluno == null || matriculaAluno.isBlank()) {
                return cb.conjunction();
            }

            query.distinct(true);
            return cb.like(root.join("aluno").get("alunoMatricula"), "%" + matriculaAluno + "%");
        };
    }

    public static Specification<Pea> filtrarPorPeiId(UUID peiId) {
        return (root, query, cb) -> {
            if (peiId == null) {
                return cb.conjunction();
            }
            query.distinct(true);
            return cb.equal(root.join("pei").get("id"), peiId);
        };
    }

    public static Specification<Pea> filtrarPorStatusAtivo(Boolean statusAtivo) {
        return (root, query, cb) -> {
            if (statusAtivo == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("status"), statusAtivo);
        };
    }
}
