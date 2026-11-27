package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.rai.response.RaiResponseDto;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pea.Pea;
import com.ifpb.edu.br.clai.model.pei.Pei;
import com.ifpb.edu.br.clai.model.rai.Rai;
import com.ifpb.edu.br.clai.model.rai.RaiHabilidadeDesenvolvida;
import com.ifpb.edu.br.clai.model.rai.enums.NivelAprendizado;
import com.ifpb.edu.br.clai.repository.RaiRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class RaiServiceTest {

    private RaiRepository raiRepository;
    private RaiService raiService;

    @BeforeEach
    void setUp() {
        raiRepository = mock(RaiRepository.class);
        raiService = new RaiService(raiRepository, mock(PeaService.class), mock(AlunoService.class));
    }

    @Test
    void getAllRaisRetornaPaginaMapeadaEPreservaMetadados() {
        Rai rai = criarRaiComDadosRelacionados();
        Pageable pageable = PageRequest.of(1, 2, Sort.by(Sort.Order.desc("data")));
        Page<Rai> resultadoRepositorio = new PageImpl<>(List.of(rai), pageable, 5);
        when(raiRepository.findAll(org.mockito.ArgumentMatchers.<Specification<Rai>>any(), eq(pageable)))
                .thenReturn(resultadoRepositorio);

        Page<RaiResponseDto> resultado = raiService.getAllRais(null, null, null, null, pageable);

        assertEquals(5, resultado.getTotalElements());
        assertEquals(3, resultado.getTotalPages());
        assertEquals(1, resultado.getNumber());
        assertEquals(2, resultado.getSize());
        assertEquals(Sort.by(Sort.Order.desc("data")), resultado.getSort());
        assertEquals(rai.getId(), resultado.getContent().getFirst().id());
        assertEquals("Ana Silva", resultado.getContent().getFirst().alunoNome());
        assertEquals("2026101234", resultado.getContent().getFirst().alunoMatricula());
        verify(raiRepository).findAll(org.mockito.ArgumentMatchers.<Specification<Rai>>any(), eq(pageable));
    }

    @Test
    void getAllRaisEncaminhaFiltrosCombinadosParaConsulta() {
        UUID peaId = UUID.randomUUID();
        UUID peiId = UUID.randomUUID();
        Pageable pageable = PageRequest.of(0, 20);
        when(raiRepository.findAll(org.mockito.ArgumentMatchers.<Specification<Rai>>any(), eq(pageable)))
                .thenReturn(Page.empty(pageable));

        Page<RaiResponseDto> resultado = raiService.getAllRais("ana", "123", peaId, peiId, pageable);

        assertEquals(0, resultado.getTotalElements());
        verify(raiRepository).findAll(org.mockito.ArgumentMatchers.<Specification<Rai>>any(), eq(pageable));
    }

    @Test
    void getRaiByIdMapeiaAlunoVinculosEListaDeHabilidades() {
        Rai rai = criarRaiComDadosRelacionados();
        when(raiRepository.findById(rai.getId())).thenReturn(Optional.of(rai));

        RaiResponseDto resultado = raiService.getRaiById(rai.getId());

        assertEquals(rai.getId(), resultado.id());
        assertEquals(rai.getAluno().getId(), resultado.alunoId());
        assertEquals("Ana Silva", resultado.alunoNome());
        assertEquals("2026101234", resultado.alunoMatricula());
        assertEquals(rai.getPea().getId(), resultado.peaId());
        assertEquals(rai.getPea().getPei().getId(), resultado.peiId());
        assertEquals("2026.1", resultado.semestreAno());
        assertEquals("Matemática", resultado.componenteCurricular());
        assertEquals("Prof. Maria", resultado.docente());
        assertEquals(1, resultado.habilidadesDesenvolvidas().size());
        assertEquals("Adição", resultado.habilidadesDesenvolvidas().getFirst().habilidadeDesenvolvida());
        assertEquals(NivelAprendizado.BOM, resultado.habilidadesDesenvolvidas().getFirst().nivelAprendizado());
    }

    @Test
    void getRaiByIdInexistenteLancaResourceNotFound() {
        UUID id = UUID.randomUUID();
        when(raiRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> raiService.getRaiById(id));
    }

    private Rai criarRaiComDadosRelacionados() {
        UUID alunoId = UUID.randomUUID();
        Aluno aluno = new Aluno();
        aluno.setId(alunoId);
        aluno.setAlunoNome("Ana Silva");
        aluno.setAlunoMatricula("2026101234");

        Pei pei = new Pei();
        pei.setId(UUID.randomUUID());

        Pea pea = new Pea();
        pea.setId(UUID.randomUUID());
        pea.setPei(pei);
        pea.setSemestreAno("2026.1");
        pea.setComponenteCurricular("Matemática");
        pea.setDocente("Prof. Maria");

        Rai rai = new Rai();
        rai.setId(UUID.randomUUID());
        rai.setAluno(aluno);
        rai.setPea(pea);
        rai.setData(LocalDate.of(2026, 11, 20));

        RaiHabilidadeDesenvolvida habilidade = new RaiHabilidadeDesenvolvida();
        habilidade.setId(UUID.randomUUID());
        habilidade.setRai(rai);
        habilidade.setHabilidadeDesenvolvida("Adição");
        habilidade.setNivelAprendizado(NivelAprendizado.BOM);
        habilidade.setObservacoes("Com apoio visual");
        rai.setHabilidadesDesenvolvidas(List.of(habilidade));
        return rai;
    }
}
