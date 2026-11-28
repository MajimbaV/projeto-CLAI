package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.rai.Rai;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.text.Normalizer;
import java.util.Locale;
import java.util.UUID;

public final class RaiSpecification {

    private RaiSpecification() {}

    public static Specification<Rai> comFiltros(
            String nomeAluno,
            String matriculaAluno,
            UUID peaId,
            UUID peiId
    ) {
        return Specification.where(filtrarPorNomeAluno(nomeAluno))
                .and(filtrarPorMatriculaAluno(matriculaAluno))
                .and(filtrarPorPeaId(peaId))
                .and(filtrarPorPeiId(peiId));
    }

    public static Specification<Rai> filtrarPorNomeAluno(String nomeAluno) {
        return (root, query, cb) -> {
            if (nomeAluno == null || nomeAluno.isBlank()) {
                return cb.conjunction();
            }

            query.distinct(true);
            String termo = Normalizer.normalize(nomeAluno.trim().toLowerCase(Locale.ROOT), Normalizer.Form.NFD)
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

    public static Specification<Rai> filtrarPorMatriculaAluno(String matriculaAluno) {
        return (root, query, cb) -> {
            if (matriculaAluno == null || matriculaAluno.isBlank()) {
                return cb.conjunction();
            }

            query.distinct(true);
            return cb.like(root.join("aluno").get("alunoMatricula"), "%" + matriculaAluno.trim() + "%");
        };
    }

    public static Specification<Rai> filtrarPorPeaId(UUID peaId) {
        return (root, query, cb) -> {
            if (peaId == null) {
                return cb.conjunction();
            }

            query.distinct(true);
            return cb.equal(root.join("pea").get("id"), peaId);
        };
    }

    public static Specification<Rai> filtrarPorPeiId(UUID peiId) {
        return (root, query, cb) -> {
            if (peiId == null) {
                return cb.conjunction();
            }

            query.distinct(true);
            return cb.equal(root.join("pea").join("pei").get("id"), peiId);
        };
    }
}
