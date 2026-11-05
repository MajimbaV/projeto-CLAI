package com.ifpb.edu.br.clai.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AlunoOrquestrador {
    private final AlunoService alunoService;
    private final PlanoAcaoService planoAcaoService;

    public AlunoOrquestrador(AlunoService alunoService, PlanoAcaoService planoAcaoService) {
        this.alunoService = alunoService;
        this.planoAcaoService = planoAcaoService;
    }

    @Transactional
    public void inativarAlunoComPlanos(String matricula) {
        alunoService.inativarPorMatricula(matricula);

        planoAcaoService.inativarPlanosPorMatricula(matricula);
    }
}
