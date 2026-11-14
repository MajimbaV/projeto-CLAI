package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.aluno.Aluno;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Expression;

import java.text.Normalizer;
import java.time.LocalDate;
import java.util.UUID;

public final class AlunoSpecification {

    private AlunoSpecification() {}

    public static Specification<Aluno> filtrarPorNome(String nome) {
        return (root, query, cb) -> {
            if (nome == null || nome.isBlank()) return cb.conjunction();

            String termo = Normalizer.normalize(nome.toLowerCase(), Normalizer.Form.NFD).replaceAll("\\p{M}+", "");

            Expression<String> nomeBanco = cb.lower(root.get("alunoNome"));

            Expression<String> nomeBancoTratado = cb.function(
                    "translate", String.class, nomeBanco,
                    cb.literal("áéíóúãõâêîôûç"), cb.literal("aeiouaoaeiouc")
            );

            return cb.like(nomeBancoTratado, "%" + termo + "%");
        };
    }

    public static Specification<Aluno> filtrarPorMatricula(String matricula) {
        return (root, query, cb) -> {
            if (matricula == null || matricula.isBlank()) return cb.conjunction();
            return cb.like(root.get("alunoMatricula"), matricula + "%");
        };
    }

    public static Specification<Aluno> filtrarPorCurso(String curso) {
        return (root, query, cb) -> {
            if (curso == null || curso.isBlank()) {
                return cb.conjunction();
            }

            String termo = Normalizer.normalize(curso.toLowerCase(), Normalizer.Form.NFD)
                    .replaceAll("\\p{M}+", "");
            Expression<String> nomeCurso = cb.lower(root.join("curso", JoinType.LEFT).get("nomeCurso"));
            Expression<String> nomeCursoTratado = cb.function(
                    "translate", String.class, nomeCurso,
                    cb.literal("áéíóúãõâêîôûç"), cb.literal("aeiouaoaeiouc")
            );
            return cb.like(nomeCursoTratado, "%" + termo + "%");
        };
    }

    public static Specification<Aluno> filtrarPorCursoId(UUID cursoId) {
        return (root, query, cb) -> {
            if (cursoId == null) return cb.conjunction();
            return cb.equal(root.get("curso").get("id"), cursoId);
        };
    }

    public static Specification<Aluno> filtrarPorPeriodo(String periodo) {
        return (root, query, cb) -> {
            if (periodo == null || periodo.isBlank()) return cb.conjunction();
            return cb.like(root.get("periodoAluno"), periodo + "%");
        };
    }

    public static Specification<Aluno> filtrarPorMaioridade(Boolean maioridade) {
        return (root, query, cb) -> {
            if (maioridade == null) return cb.conjunction();

            LocalDate dataCorte = LocalDate.now().minusYears(18);

            if (maioridade) {
                return cb.lessThanOrEqualTo(root.get("alunoNascimento"), dataCorte);
            } else {
                return cb.greaterThan(root.get("alunoNascimento"), dataCorte);
            }
        };
    }

    public static Specification<Aluno> filtrarPorStatusAtivo(Boolean statusAtivo) {
        return (root, query, cb) -> {
            if (statusAtivo == null) return cb.conjunction();
            return cb.equal(root.get("statusAtivo"), statusAtivo);
        };
    }
}