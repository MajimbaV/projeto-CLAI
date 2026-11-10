package com.ifpb.edu.br.clai.mapper;

import com.ifpb.edu.br.clai.dto.curso.CursoRequestDto;
import com.ifpb.edu.br.clai.dto.curso.CursoResponseDto;
import com.ifpb.edu.br.clai.model.curso.Curso;

public class CursoMapper {

    public static void requestToEntity(CursoRequestDto request, Curso curso) {
        curso.setNomeCurso(request.nomeCurso());
        curso.setCursoSigla(request.cursoSigla());
        curso.setNivelEnsino(request.nivelEnsino());
        curso.setCursoModalidade(request.cursoModalidade());
        curso.setCursoTurno(request.cursoTurno());

        if (request.statusAtivo() != null) {
            curso.setStatusAtivo(request.statusAtivo());
        }
    }

    public static CursoResponseDto entityToResponse(Curso curso){
        return new CursoResponseDto(
                curso.getId(),
                curso.getNomeCurso(),
                curso.getCursoSigla(),
                curso.getNivelEnsino(),
                curso.getCursoModalidade(),
                curso.getCursoTurno(),
                curso.getStatusAtivo()
        );
    }

}
