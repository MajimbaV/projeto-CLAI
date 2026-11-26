package com.ifpb.edu.br.clai.mapper;

import com.ifpb.edu.br.clai.dto.pea.PeaRequestDto;
import com.ifpb.edu.br.clai.dto.pea.PeaResponseDto;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pea.Pea;
import com.ifpb.edu.br.clai.model.pei.Pei;

public class PeaMapper {
    public static Pea requestToEntity(PeaRequestDto request, Aluno aluno, Pei pei) {
        Pea pea = new Pea();
        pea.setAluno(aluno);
        pea.setPei(pei);
        pea.setComponenteCurricular(request.componenteCurricular());
        pea.setSemestreAno(request.semestreAno());
        pea.setDocente(request.docente());
        pea.setObjetivoGeral(request.objetivoGeral());
        pea.setObjetivosEspecificos(request.objetivosEspecificos());
        pea.setConteudosProgramaticos(request.conteudosProgramaticos());
        pea.setMetodologia(request.metodologia());
        pea.setAvaliacao(request.avaliacao());
        pea.setBibliografiaBasica(request.bibliografiaBasica());
        pea.setBibliografiaComplementar(request.bibliografiaComplementar());
        pea.setStatus(request.status() != null ? request.status() : true);
        return pea;
    }
    
    public static PeaResponseDto entityToResponse(Pea pea) {
        return new PeaResponseDto(
            pea.getId(),
            pea.getAluno().getId(),
            pea.getPei().getId(),
            pea.getComponenteCurricular(),
            pea.getSemestreAno(),
            pea.getDocente(),
            pea.getObjetivoGeral(),
            pea.getObjetivosEspecificos(),
            pea.getConteudosProgramaticos(),
            pea.getMetodologia(),
            pea.getAvaliacao(),
            pea.getBibliografiaBasica(),
            pea.getBibliografiaComplementar(),
            pea.getStatus()
        );
    }
}
