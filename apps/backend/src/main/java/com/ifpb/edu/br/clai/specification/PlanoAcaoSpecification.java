package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.planoacao.PlanoAcao;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.text.Normalizer;

public final class PlanoAcaoSpecification {

        private PlanoAcaoSpecification() {
        }

        public static Specification<PlanoAcao> filtrarPorNome(
                        String nomeAluno) {
                if (nomeAluno == null || nomeAluno.isBlank()) {
                        return (root, query, cb) -> cb.conjunction();
                }

                String termoTratado = removerAcentos(
                                nomeAluno.toLowerCase());

                return (root, query, cb) -> {
                        Expression<String> nomeBanco = cb.lower(
                                        root.join("estudante").get("alunoNome"));

                        Expression<String> nomeBancoTratado = cb.function(
                                        "translate",
                                        String.class,
                                        nomeBanco,
                                        cb.literal("áàãâäéèêëíìîïóòõôöúùûüç"),
                                        cb.literal("aaaaaeeeeiiiiooooouuuuc"));

                        return cb.like(
                                        nomeBancoTratado,
                                        "%" + termoTratado + "%");
                };
        }

        public static Specification<PlanoAcao> filtrarPorMatricula(
                        String matriculaAluno) {
                if (matriculaAluno == null || matriculaAluno.isBlank()) {
                        return (root, query, cb) -> cb.conjunction();
                }

                return (root, query, cb) -> cb.equal(
                                root.join("estudante").get("alunoMatricula"),
                                matriculaAluno);
        }

        private static String removerAcentos(String texto) {
                return Normalizer
                                .normalize(texto, Normalizer.Form.NFD)
                                .replaceAll("\\p{M}+", "");
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
}
