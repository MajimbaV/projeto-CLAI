package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.aluno.Aluno;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Expression;

import java.text.Normalizer;
import java.time.LocalDate;

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
            return cb.equal(root.get("alunoMatricula"), matricula);
        };
    }

    public static Specification<Aluno> filtrarPorCurso(String curso) {
        return (root, query, cb) -> {
            if (curso == null || curso.isBlank()) {
                return cb.conjunction();
            }

            String termoBusca = "%" + curso.toLowerCase() + "%";
            return cb.like(cb.lower(root.get("alunoCurso")), termoBusca);
        };
    }

    public static Specification<Aluno> filtrarPorPeriodo(String periodo) {
        return (root, query, cb) -> {
            if (periodo == null || periodo.isBlank()) return cb.conjunction();
            return cb.equal(root.get("periodoAluno"), periodo);
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