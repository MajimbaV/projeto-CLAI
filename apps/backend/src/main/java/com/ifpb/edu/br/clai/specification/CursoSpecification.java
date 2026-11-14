package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.curso.Curso;
import com.ifpb.edu.br.clai.model.curso.enums.Modalidade;
import com.ifpb.edu.br.clai.model.curso.enums.NivelEnsino;
import com.ifpb.edu.br.clai.model.curso.enums.Turno;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.text.Normalizer;

public class CursoSpecification {

    public static Specification<Curso> comFiltros(String nomeCurso, Boolean statusAtivo, Modalidade modalidade, NivelEnsino nivelEnsino, Turno turno) {
        return Specification.where(filtrarPorStatusAtivo(statusAtivo))
                .and(filtrarPorNome(nomeCurso))
                .and(filtrarPorModalidade(modalidade))
                .and(filtrarPorNivelEnsino(nivelEnsino))
                .and(filtrarPorTurno(turno));
    }

    private static Specification<Curso> filtrarPorNome(String nomeCurso) {
        return (root, query, cb) -> {
            if (nomeCurso == null || nomeCurso.isBlank()) return cb.conjunction();

            String termo = Normalizer.normalize(nomeCurso.toLowerCase(), Normalizer.Form.NFD).replaceAll("\\p{M}+", "");

            Expression<String> nomeBanco = cb.lower(root.get("nomeCurso"));

            Expression<String> nomeBancoTratado = cb.function(
                    "translate", String.class, nomeBanco,
                    cb.literal("áéíóúãõâêîôûç"), cb.literal("aeiouaoaeiouc")
            );

            return cb.like(nomeBancoTratado, "%" + termo + "%");
        };
    }

    private static Specification<Curso> filtrarPorStatusAtivo(Boolean statusAtivo){
        return (root, query, cb) -> {
            if (statusAtivo == null) return cb.conjunction();
            return cb.equal(root.get("statusAtivo"), statusAtivo);
        };
    }

    private static Specification<Curso> filtrarPorModalidade(Modalidade modalidade) {
        return (root, query, cb) -> {
            if (modalidade == null) return cb.conjunction();
            return cb.equal(root.get("cursoModalidade"), modalidade);
        };
    }

    private static Specification<Curso> filtrarPorNivelEnsino(NivelEnsino nivelEnsino) {
        return (root, query, cb) -> {
            if (nivelEnsino == null) return cb.conjunction();
            return cb.equal(root.get("nivelEnsino"), nivelEnsino);
        };
    }

    private static Specification<Curso> filtrarPorTurno(Turno turno) {
        return (root, query, cb) -> {
            if (turno == null) return cb.conjunction();
            return cb.equal(root.get("cursoTurno"), turno);
        };
    }
}