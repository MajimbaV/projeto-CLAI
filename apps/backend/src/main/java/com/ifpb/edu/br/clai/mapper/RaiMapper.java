package com.ifpb.edu.br.clai.mapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.ifpb.edu.br.clai.dto.rai.request.AspectoRequestDto;
import com.ifpb.edu.br.clai.dto.rai.request.RaiHabilidadeDesenvolvidaRequestDto;
import com.ifpb.edu.br.clai.dto.rai.request.RaiRequestDto;
import com.ifpb.edu.br.clai.dto.rai.response.AspectoResponseDto;
import com.ifpb.edu.br.clai.dto.rai.response.RaiHabilidadeDesenvolvidaResponseDto;
import com.ifpb.edu.br.clai.dto.rai.response.RaiResponseDto;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.pea.Pea;
import com.ifpb.edu.br.clai.model.rai.AspectoHabilidadeCognitiva;
import com.ifpb.edu.br.clai.model.rai.AspectoHabilidadeSocioemocional;
import com.ifpb.edu.br.clai.model.rai.AspectoRelacionamento;
import com.ifpb.edu.br.clai.model.rai.Rai;
import com.ifpb.edu.br.clai.model.rai.RaiHabilidadeDesenvolvida;
import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeCognitiva;
import com.ifpb.edu.br.clai.model.rai.enums.TipoHabilidadeSocioemocional;
import com.ifpb.edu.br.clai.model.rai.enums.TipoRelacionamento;
import java.util.UUID;

public final class RaiMapper {

    private RaiMapper() {}

    public static Rai requestToEntity(RaiRequestDto request, Aluno aluno, Pea pea) {
        Rai rai = new Rai();
        rai.setAluno(aluno);
        rai.setPea(pea);
        rai.setRelacionamento(toAspectoRelacionamento(request.relacionamento()));
        rai.setHabilidadesCognitivas(toAspectoHabilidadeCognitiva(request.habilidadesCognitivas()));
        rai.setHabilidadesSocioemocionais(toAspectoHabilidadeSocioemocional(request.habilidadesSocioemocionais()));
        rai.setAvancosGerais(request.avancosGerais());
        rai.setDificuldadesAprendizagem(request.dificuldadesAprendizagem());
        rai.setFatoresExternos(request.fatoresExternos());
        rai.setParecer(request.parecer());
        rai.setData(request.data());
        return rai;
    }

    public static RaiHabilidadeDesenvolvida toHabilidadeEntity(RaiHabilidadeDesenvolvidaRequestDto dto, Rai rai) {
        RaiHabilidadeDesenvolvida habilidade = new RaiHabilidadeDesenvolvida();
        habilidade.setRai(rai);
        habilidade.setHabilidadeDesenvolvida(dto.habilidadeDesenvolvida());
        habilidade.setNivelAprendizado(dto.nivelAprendizado());
        habilidade.setObservacoes(dto.observacoes());
        return habilidade;
    }

    public static RaiResponseDto entityToResponse(Rai rai) {
        if (rai == null) {
            return null;
        }

        UUID alunoId = rai.getAluno() != null ? rai.getAluno().getId() : null;
        UUID peaId = rai.getPea() != null ? rai.getPea().getId() : null;

        List<RaiHabilidadeDesenvolvidaResponseDto> habilidades = rai.getHabilidadesDesenvolvidas() != null
            ? rai.getHabilidadesDesenvolvidas().stream()
                .map(RaiMapper::toHabilidadeResponse)
                .collect(Collectors.toCollection(ArrayList::new))
            : Collections.emptyList();

        return new RaiResponseDto(
            rai.getId(),
            alunoId,
            peaId,
            toAspectoResponse(rai.getRelacionamento() != null ? rai.getRelacionamento().getTipos() : null,
                rai.getRelacionamento() != null ? rai.getRelacionamento().getOutros() : null,
                rai.getRelacionamento() != null ? rai.getRelacionamento().getComentario() : null),
            toAspectoResponse(rai.getHabilidadesCognitivas() != null ? rai.getHabilidadesCognitivas().getTipos() : null,
                rai.getHabilidadesCognitivas() != null ? rai.getHabilidadesCognitivas().getOutros() : null,
                rai.getHabilidadesCognitivas() != null ? rai.getHabilidadesCognitivas().getComentario() : null),
            toAspectoResponse(rai.getHabilidadesSocioemocionais() != null ? rai.getHabilidadesSocioemocionais().getTipos() : null,
                rai.getHabilidadesSocioemocionais() != null ? rai.getHabilidadesSocioemocionais().getOutros() : null,
                rai.getHabilidadesSocioemocionais() != null ? rai.getHabilidadesSocioemocionais().getComentario() : null),
            rai.getAvancosGerais(),
            rai.getDificuldadesAprendizagem(),
            rai.getFatoresExternos(),
            habilidades,
            rai.getParecer(),
            rai.getData(),
            rai.isStatusAtivo()
        );
    }

    private static AspectoRelacionamento toAspectoRelacionamento(AspectoRequestDto<TipoRelacionamento> dto) {
        if (dto == null) return null;
        AspectoRelacionamento aspecto = new AspectoRelacionamento();
        aspecto.setTipos(new ArrayList<>(dto.tipos()));
        aspecto.setOutros(dto.outros());
        aspecto.setComentario(dto.comentario());
        return aspecto;
    }

    private static AspectoHabilidadeCognitiva toAspectoHabilidadeCognitiva(AspectoRequestDto<TipoHabilidadeCognitiva> dto) {
        if (dto == null) return null;
        AspectoHabilidadeCognitiva aspecto = new AspectoHabilidadeCognitiva();
        aspecto.setTipos(new ArrayList<>(dto.tipos()));
        aspecto.setOutros(dto.outros());
        aspecto.setComentario(dto.comentario());
        return aspecto;
    }

    private static AspectoHabilidadeSocioemocional toAspectoHabilidadeSocioemocional(AspectoRequestDto<TipoHabilidadeSocioemocional> dto) {
        if (dto == null) return null;
        AspectoHabilidadeSocioemocional aspecto = new AspectoHabilidadeSocioemocional();
        aspecto.setTipos(new ArrayList<>(dto.tipos()));
        aspecto.setOutros(dto.outros());
        aspecto.setComentario(dto.comentario());
        return aspecto;
    }

    private static <T> AspectoResponseDto<T> toAspectoResponse(List<T> tipos, String outros, String comentario) {
        if (tipos == null && outros == null && comentario == null) {
            return null;
        }
        return new AspectoResponseDto<>(tipos, outros, comentario);
    }

    public static RaiHabilidadeDesenvolvidaResponseDto toHabilidadeResponse(RaiHabilidadeDesenvolvida habilidade) {
        if (habilidade == null) return null;
        return new RaiHabilidadeDesenvolvidaResponseDto(
            habilidade.getId(),
            habilidade.getHabilidadeDesenvolvida(),
            habilidade.getNivelAprendizado(),
            habilidade.getObservacoes()
        );
    }
}
