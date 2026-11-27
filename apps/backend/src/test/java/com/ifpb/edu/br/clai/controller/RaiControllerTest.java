package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.rai.response.RaiResponseDto;
import com.ifpb.edu.br.clai.exception.GlobalExceptionHandler;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.service.RaiService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

class RaiControllerTest {

    private RaiService raiService;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        raiService = mock(RaiService.class);
        mockMvc = standaloneSetup(new RaiController(raiService))
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void getAllRaisRetornaPaginaComFiltrosOrdenacaoEPaginacao() throws Exception {
        UUID peaId = UUID.randomUUID();
        UUID peiId = UUID.randomUUID();
        UUID raiId = UUID.randomUUID();
        RaiResponseDto dto = criarDto(raiId);
        when(raiService.getAllRais(eq("Ana"), eq("123"), eq(peaId), eq(peiId), any()))
                .thenReturn(new PageImpl<>(List.of(dto), PageRequest.of(1, 5, Sort.by(Sort.Order.desc("data"))), 6));

        mockMvc.perform(get("/rai")
                        .param("nomeAluno", "Ana")
                        .param("matriculaAluno", "123")
                        .param("peaId", peaId.toString())
                        .param("peiId", peiId.toString())
                        .param("page", "1")
                        .param("size", "5")
                        .param("sort", "data,desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(raiId.toString()))
                .andExpect(jsonPath("$.content[0].alunoNome").value("Ana Silva"))
                .andExpect(jsonPath("$.totalElements").value(6))
                .andExpect(jsonPath("$.totalPages").value(2))
                .andExpect(jsonPath("$.number").value(1))
                .andExpect(jsonPath("$.size").value(5));

        verify(raiService).getAllRais(eq("Ana"), eq("123"), eq(peaId), eq(peiId),
                eq(PageRequest.of(1, 5, Sort.by(Sort.Order.desc("data")))));
    }

    @Test
    void getAllRaisSemResultadosRetornaPaginaVazia() throws Exception {
        when(raiService.getAllRais(eq("Inexistente"), eq(null), eq(null), eq(null), any()))
                .thenReturn(Page.empty(PageRequest.of(0, 20)));

        mockMvc.perform(get("/rai").param("nomeAluno", "Inexistente"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isEmpty())
                .andExpect(jsonPath("$.totalElements").value(0));
    }

    @Test
    void getRaiByIdExistenteRetornaDtoCompleto() throws Exception {
        UUID id = UUID.randomUUID();
        when(raiService.getRaiById(id)).thenReturn(criarDto(id));

        mockMvc.perform(get("/rai/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.alunoNome").value("Ana Silva"))
                .andExpect(jsonPath("$.alunoMatricula").value("2026101234"))
                .andExpect(jsonPath("$.peiId").isNotEmpty())
                .andExpect(jsonPath("$.componenteCurricular").value("Matemática"));
    }

    @Test
    void getRaiByIdInexistenteRetornaProblemDetail404() throws Exception {
        UUID id = UUID.randomUUID();
        when(raiService.getRaiById(id)).thenThrow(new ResourceNotFoundException("RAI não encontrado"));

        mockMvc.perform(get("/rai/{id}", id))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Recurso não encontrado"))
                .andExpect(jsonPath("$.detail").value("RAI não encontrado"));
    }

    @Test
    void parametrosUuidInvalidosRetornamProblemDetail400() throws Exception {
        mockMvc.perform(get("/rai").param("peaId", "invalido"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Parâmetro com tipo inválido"));

        mockMvc.perform(get("/rai/{id}", "invalido"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Parâmetro com tipo inválido"));
    }

    private RaiResponseDto criarDto(UUID id) {
        return new RaiResponseDto(
                id,
                UUID.randomUUID(),
                "Ana Silva",
                "2026101234",
                UUID.randomUUID(),
                UUID.randomUUID(),
                "2026.1",
                "Matemática",
                "Prof. Maria",
                null,
                null,
                null,
                "Avanços",
                "Dificuldades",
                "Fatores",
                List.of(),
                "Parecer",
                java.time.LocalDate.of(2026, 11, 20),
                true
        );
    }
}
