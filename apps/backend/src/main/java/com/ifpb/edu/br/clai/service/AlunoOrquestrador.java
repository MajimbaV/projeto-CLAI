package com.ifpb.edu.br.clai.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AlunoOrquestrador {
    private final AlunoService alunoService;
    private final PlanoAcaoService planoAcaoService;
    private final EstudoDeCasoService estudoDeCasoService;

    public AlunoOrquestrador(AlunoService alunoService,
                             PlanoAcaoService planoAcaoService,
                             EstudoDeCasoService estudoDeCasoService) {
        this.alunoService = alunoService;
        this.planoAcaoService = planoAcaoService;
        this.estudoDeCasoService = estudoDeCasoService;
    }

    @Transactional
    public void inativarAlunoComDocumentos(String matricula) {
        alunoService.inativarPorMatricula(matricula);

        planoAcaoService.inativarPlanosPorMatricula(matricula);
        estudoDeCasoService.arquivarEstudosPorMatricula(matricula);
    }
}