package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.curso.Curso;
import com.ifpb.edu.br.clai.model.curso.enums.Modalidade;
import com.ifpb.edu.br.clai.model.curso.enums.NivelEnsino;
import com.ifpb.edu.br.clai.model.curso.enums.Turno;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.text.Normalizer;

public class CursoSpecification {

    public static Specification<Curso> filtrarPorNome(String nomeCurso) {
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

    public static Specification<Curso> filtrarPorStatusAtivo(Boolean statusAtivo){
        return (root, query, cb) -> {
            if (statusAtivo == null) return cb.conjunction();
            return cb.equal(root.get("statusAtivo"), statusAtivo);
        };
    }

    public static Specification<Curso> filtrarPorModalidade(Modalidade modalidade) {
        return (root, query, cb) -> {
            if (modalidade == null) return cb.conjunction();
            return cb.equal(root.get("cursoModalidade"), modalidade);
        };
    }
}