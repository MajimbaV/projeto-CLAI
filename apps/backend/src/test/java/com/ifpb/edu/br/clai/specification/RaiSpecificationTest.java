package com.ifpb.edu.br.clai.specification;

import com.ifpb.edu.br.clai.model.rai.Rai;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class RaiSpecificationTest {

    @Test
    void filtrarPorNomeBuscaParcialSemDiferenciarMaiusculas() {
        Root<Rai> root = mock(Root.class);
        Join<Rai, Object> aluno = mock(Join.class);
        CriteriaQuery<?> query = mock(CriteriaQuery.class);
        CriteriaBuilder criteriaBuilder = mock(CriteriaBuilder.class);

        doReturn(aluno).when(root).join("aluno");
        when(criteriaBuilder.like(nullable(Expression.class), eq("%ana%"))).thenReturn(mock(Predicate.class));

        RaiSpecification.filtrarPorNomeAluno("ANA").toPredicate(root, query, criteriaBuilder);

        verify(criteriaBuilder).like(nullable(Expression.class), eq("%ana%"));
        verify(query).distinct(true);
    }

    @Test
    void filtrarPorMatriculaUsaCorrespondenciaParcial() {
        Root<Rai> root = mock(Root.class);
        Join<Rai, Object> aluno = mock(Join.class);
        CriteriaQuery<?> query = mock(CriteriaQuery.class);
        CriteriaBuilder criteriaBuilder = mock(CriteriaBuilder.class);

        doReturn(aluno).when(root).join("aluno");
        when(criteriaBuilder.like(nullable(Expression.class), eq("%1234%"))).thenReturn(mock(Predicate.class));

        RaiSpecification.filtrarPorMatriculaAluno("1234").toPredicate(root, query, criteriaBuilder);

        verify(criteriaBuilder).like(nullable(Expression.class), eq("%1234%"));
        verify(query).distinct(true);
    }

    @Test
    void filtrarPorPeaEPeiComparaIdsDosRelacionamentos() {
        UUID peaId = UUID.randomUUID();
        UUID peiId = UUID.randomUUID();
        Root<Rai> root = mock(Root.class);
        Join<Rai, Object> pea = mock(Join.class);
        Join<Object, Object> pei = mock(Join.class);
        CriteriaQuery<?> query = mock(CriteriaQuery.class);
        CriteriaBuilder criteriaBuilder = mock(CriteriaBuilder.class);

        doReturn(pea).when(root).join("pea");
        doReturn(pei).when(pea).join("pei");

        RaiSpecification.filtrarPorPeaId(peaId).toPredicate(root, query, criteriaBuilder);
        RaiSpecification.filtrarPorPeiId(peiId).toPredicate(root, query, criteriaBuilder);

        verify(criteriaBuilder).equal(nullable(Expression.class), eq(peaId));
        verify(criteriaBuilder).equal(nullable(Expression.class), eq(peiId));
        verify(query, org.mockito.Mockito.times(2)).distinct(true);
    }

    @Test
    void filtrosNulosOuEmBrancoNaoCriamJoins() {
        Root<Rai> root = mock(Root.class);
        CriteriaQuery<?> query = mock(CriteriaQuery.class);
        CriteriaBuilder criteriaBuilder = mock(CriteriaBuilder.class);
        when(criteriaBuilder.conjunction()).thenReturn(mock(Predicate.class));

        RaiSpecification.comFiltros("  ", "", null, null).toPredicate(root, query, criteriaBuilder);

        org.mockito.Mockito.verifyNoInteractions(root);
        org.mockito.Mockito.verify(query, org.mockito.Mockito.never()).distinct(true);
    }
}
