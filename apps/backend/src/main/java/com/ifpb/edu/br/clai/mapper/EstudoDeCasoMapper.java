package com.ifpb.edu.br.clai.mapper;

import com.ifpb.edu.br.clai.dto.estudodecaso.response.EstudoDeCasoResponseDto;
import com.ifpb.edu.br.clai.dto.estudodecaso.response.EstudoDeCasoResponseDto.*;
import com.ifpb.edu.br.clai.dto.estudodecaso.request.create.*;
import com.ifpb.edu.br.clai.model.Aluno;
import com.ifpb.edu.br.clai.model.estudodecaso.*;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class EstudoDeCasoMapper {

    public static EstudoDeCaso requestToEntity(EstudoDeCasoRequestDto request, Aluno aluno) {
        EstudoDeCaso estudoDeCaso = new EstudoDeCaso();
        estudoDeCaso.setIdentificacao(toIdentificacao(request.identificacao(), aluno));
        estudoDeCaso.setMotivoDemanda(toMotivoDemanda(request.motivoDemanda()));
        estudoDeCaso.setNecessidadesEspecificas(toNecessidadesEspecificas(request.necessidadesEspecificas()));
        estudoDeCaso.setAnamnese(toAnamnese(request.anamnese()));
        estudoDeCaso.setPerfilEstudante(toPerfilEstudante(request.perfilEstudante()));
        estudoDeCaso.setContextoPsicossocial(toContextoPsicossocial(request.contextoPsicossocial()));
        estudoDeCaso.setPotencialidades(toPotencialidades(request.potencialidades()));
        estudoDeCaso.setNecessidadesEducacionais(toNecessidadesEducacionais(request.necessidadesEducacionais()));
        estudoDeCaso.setSintesePsicopedagogica(toSintesePsicopedagogica(request.sintesePsicopedagogica()));
        estudoDeCaso.setChecklistApoios(toChecklistApoios(request.checklistApoios()));
        estudoDeCaso.setStatusEstudoDeCaso(request.statusEstudoDeCaso());

        //Regra de negócio: Inicializado como Válido
        estudoDeCaso.setSituacaoEstudoDeCaso(SituacaoEstudoDeCaso.VALIDO);

        return estudoDeCaso;
    }

    public static EstudoDeCasoResponseDto entityToResponse(EstudoDeCaso estudoDeCaso) {
        return new EstudoDeCasoResponseDto(
                estudoDeCaso.getId(),
                estudoDeCaso.getStatusEstudoDeCaso(),
                toIdentificacaoResponse(estudoDeCaso.getIdentificacao()),
                toMotivoDemandaResponse(estudoDeCaso.getMotivoDemanda()),
                toNecessidadesEspecificasResponse(estudoDeCaso.getNecessidadesEspecificas()),
                toAnamneseResponse(estudoDeCaso.getAnamnese()),
                toPerfilEstudanteResponse(estudoDeCaso.getPerfilEstudante()),
                toContextoPsicossocialResponse(estudoDeCaso.getContextoPsicossocial()),
                toPotencialidadesResponse(estudoDeCaso.getPotencialidades()),
                toNecessidadesEducacionaisResponse(estudoDeCaso.getNecessidadesEducacionais()),
                toSintesePsicopedagogicaResponse(estudoDeCaso.getSintesePsicopedagogica()),
                toChecklistApoiosResponse(estudoDeCaso.getChecklistApoios()),
                estudoDeCaso.getSituacaoEstudoDeCaso()
        );
    }

    private static IdentificacaoResponseDto toIdentificacaoResponse(Identificacao identificacao) {
        if (identificacao == null) return null;
        Aluno aluno = identificacao.getAlunoId();
        UUID alunoId = aluno == null ? null : aluno.getId();
        return new IdentificacaoResponseDto(
                alunoId,
                aluno == null ? null : AlunoMapper.entityToResponse(aluno),
                identificacao.getDatasAnamnese(),
                identificacao.getIde_nome_profissional()
        );
    }

    private static MotivoDemandaResponseDto toMotivoDemandaResponse(MotivoDemanda motivo) {
        if (motivo == null) return null;
        return new MotivoDemandaResponseDto(
                motivo.getOrigemEncaminhamento(),
                motivo.getOutroOrigemEncaminhamento(),
                motivo.getMotivoPrincipal(),
                motivo.getDemandaDoEstudante(),
                motivo.getDemandaDoProfissional(),
                motivo.getDemandaDoResponsavel(),
                motivo.getDemandaEquipeEscolar()
        );
    }

    private static NecessidadesEspecificasResponseDto toNecessidadesEspecificasResponse(
            NecessidadesEspecificas necessidades
    ) {
        if (necessidades == null) return null;
        return new NecessidadesEspecificasResponseDto(
                necessidades.getNecessidadeInformada(),
                necessidades.getDiagnosticos(),
                necessidades.getDocumentos() == null ? null : necessidades.getDocumentos().stream()
                        .map(EstudoDeCasoMapper::toDocumentoResponse)
                        .toList(),
                necessidades.getCondicoesAssociadas(),
                necessidades.getMedicacoesContinuas(),
                necessidades.getEncaminhamentosAnteriores(),
                necessidades.getServicosApoioAtuaisAnteriores()
        );
    }

    private static DocumentoComprobatorioResponseDto toDocumentoResponse(DocumentoComprobatorio documento) {
        if (documento == null) return null;
        return new DocumentoComprobatorioResponseDto(
                documento.getDescricao(),
                documento.getData(),
                documento.getProfissional()
        );
    }

    private static AnamneseResponseDto toAnamneseResponse(Anamnese anamnese) {
        if (anamnese == null) return null;
        return new AnamneseResponseDto(
                anamnese.getHistoricoEscolar(),
                anamnese.getExperienciasEscolaresPositivas(),
                anamnese.getExperienciasEscolaresNegativas(),
                anamnese.getAdaptacoesRecursosEResultados(),
                anamnese.getObjetivosConhecimentosConsolidados(),
                anamnese.getAreasDisciplinasFacilidade(),
                anamnese.getAreasDisciplinasDificuldade()
        );
    }

    private static PerfilEstudanteResponseDto toPerfilEstudanteResponse(PerfilEstudante perfil) {
        if (perfil == null) return null;
        return new PerfilEstudanteResponseDto(
                perfil.getComunicacaoCompreensaoOrientacoes(),
                perfil.getLeituraEscritaLinguagem(),
                perfil.getRaciocinioLogicoMatematico(),
                perfil.getAtencaoMemoriaFuncoesExecutivas(),
                perfil.getOrganizacaoPlanejamentoRealizacaoTarefas(),
                perfil.getInteracaoSocialParticipacaoSala(),
                perfil.getAspectosSensoriaisRelevantes(),
                perfil.getMobilidadeAcessoTecnologiasRecursos(),
                perfil.getAutonomiaContextoFamiliar(),
                perfil.getAutonomiaContextoEscolar(),
                perfil.getEstrategiasQueFavorecemAprendizagem(),
                perfil.getSituacoesQueDificultamAprendizagem()
        );
    }

    private static ContextoPsicossocialResponseDto toContextoPsicossocialResponse(ContextoPsicossocial contexto) {
        if (contexto == null) return null;
        return new ContextoPsicossocialResponseDto(
                contexto.getRelacaoComCursoEExpectativas(),
                contexto.getRedeApoioFamiliarSocial(),
                contexto.getConflitosOuFatoresPsicossociais(),
                contexto.getObservacoesFrequenciaRotinaPermanencia()
        );
    }

    private static PotencialidadesResponseDto toPotencialidadesResponse(Potencialidades potencialidades) {
        if (potencialidades == null) return null;
        return new PotencialidadesResponseDto(
                potencialidades.getPotencialidadesAcademicas(),
                potencialidades.getInteressesHabilidades(),
                potencialidades.getFormasPreferenciaisAprendizagemEDemonstracao(),
                potencialidades.getRecursosQueFavorecemDesempenho()
        );
    }

    private static NecessidadesEducacionaisResponseDto toNecessidadesEducacionaisResponse(
            NecessidadesEducacionais necessidades
    ) {
        if (necessidades == null) return null;
        return new NecessidadesEducacionaisResponseDto(
                necessidades.getBarreiras() == null ? null : necessidades.getBarreiras().stream()
                        .map(EstudoDeCasoMapper::toBarreiraResponse)
                        .toList()
        );
    }

    private static BarreiraEducacionalResponseDto toBarreiraResponse(BarreiraEducacional barreira) {
        if (barreira == null) return null;
        return new BarreiraEducacionalResponseDto(
                barreira.getDimensao(),
                barreira.getBarreiraNecessidade(),
                barreira.getEvidenciasImpactos(),
                barreira.getPrioridade()
        );
    }

    private static SintesePsicopedagogicaResponseDto toSintesePsicopedagogicaResponse(SintesePsicopedagogica sintese) {
        if (sintese == null) return null;
        return new SintesePsicopedagogicaResponseDto(
                sintese.getIdentificacaoNecessidadesEspecificas(),
                sintese.getAvancosObjetivosConhecimentosAlcancados(),
                sintese.getDificuldadesBarreirasComRepercussaoEducacional(),
                sintese.getPotencialidadesECondicoesFacilitadoras(),
                sintese.getPrincipaisDemandasIdentificadasNoCaso()
        );
    }

    private static ChecklistApoiosResponseDto toChecklistApoiosResponse(ChecklistApoios checklist) {
        if (checklist == null) return null;
        return new ChecklistApoiosResponseDto(
                checklist.getAcessibilidadeAmbiente(),
                checklist.getAcessibilidadeAmbienteOutro(),
                checklist.getComunicacaoMateriais(),
                checklist.getComunicacaoMateriaisOutro(),
                checklist.getMetodologia(),
                checklist.getMetodologiaOutro(),
                checklist.getAvaliacao(),
                checklist.getAvaliacaoOutro(),
                checklist.getCurriculo(),
                checklist.getCurriculoOutro(),
                checklist.getApoiosInstitucionais(),
                checklist.getApoioInstitucionalOutro(),
                checklist.getApoiosExternosEncaminhamentos(),
                checklist.getPsicopedagogoResponsavel(),
                checklist.getCoordenadorResponsavel(),
                checklist.getData()
        );
    }

    private static Identificacao toIdentificacao(IdentificacaoRequestDto request, Aluno aluno) {
        Identificacao identificacao = new Identificacao();
        identificacao.setAlunoId(aluno);
        identificacao.setDatasAnamnese(copyList(request.datasAnamnese()));
        identificacao.setIde_nome_profissional(request.nomeProfissional());
        return identificacao;
    }

    private static MotivoDemanda toMotivoDemanda(MotivoDemandaRequestDto request) {
        MotivoDemanda motivo = new MotivoDemanda();
        motivo.setOrigemEncaminhamento(request.origemEncaminhamento());
        motivo.setOutroOrigemEncaminhamento(request.outroOrigemEncaminhamento());
        motivo.setMotivoPrincipal(request.motivoPrincipal());
        motivo.setDemandaDoEstudante(request.demandaDoEstudante());
        motivo.setDemandaDoProfissional(request.demandaDoProfissional());
        motivo.setDemandaDoResponsavel(request.demandaDoResponsavel());
        motivo.setDemandaEquipeEscolar(request.demandaEquipeEscolar());
        return motivo;
    }

    private static NecessidadesEspecificas toNecessidadesEspecificas(NecessidadesEspecificasRequestDto request) {
        NecessidadesEspecificas necessidades = new NecessidadesEspecificas();
        necessidades.setNecessidadeInformada(request.necessidadeInformada());
        necessidades.setDiagnosticos(copyList(request.diagnosticos()));
        necessidades.setDocumentos(request.documentos() == null ? new ArrayList<>() : request.documentos().stream()
                .map(EstudoDeCasoMapper::toDocumento)
                .collect(java.util.stream.Collectors.toCollection(ArrayList::new)));
        necessidades.setCondicoesAssociadas(copyList(request.condicoesAssociadas()));
        necessidades.setMedicacoesContinuas(copyList(request.medicacoesContinuas()));
        necessidades.setEncaminhamentosAnteriores(request.encaminhamentosAnteriores());
        necessidades.setServicosApoioAtuaisAnteriores(request.servicosApoioAtuaisAnteriores());
        return necessidades;
    }

    private static DocumentoComprobatorio toDocumento(DocumentoComprobatorioRequestDto request) {
        DocumentoComprobatorio documento = new DocumentoComprobatorio();
        documento.setDescricao(request.descricao());
        documento.setData(request.data());
        documento.setProfissional(request.profissional());
        return documento;
    }

    private static Anamnese toAnamnese(AnamneseRequestDto request) {
        Anamnese anamnese = new Anamnese();
        anamnese.setHistoricoEscolar(request.historicoEscolar());
        anamnese.setExperienciasEscolaresPositivas(request.experienciasEscolaresPositivas());
        anamnese.setExperienciasEscolaresNegativas(request.experienciasEscolaresNegativas());
        anamnese.setAdaptacoesRecursosEResultados(request.adaptacoesRecursosEResultados());
        anamnese.setObjetivosConhecimentosConsolidados(request.objetivosConhecimentosConsolidados());
        anamnese.setAreasDisciplinasFacilidade(copyList(request.areasDisciplinasFacilidade()));
        anamnese.setAreasDisciplinasDificuldade(copyList(request.areasDisciplinasDificuldade()));
        return anamnese;
    }

    private static PerfilEstudante toPerfilEstudante(PerfilEstudanteRequestDto request) {
        PerfilEstudante perfil = new PerfilEstudante();
        perfil.setComunicacaoCompreensaoOrientacoes(request.comunicacaoCompreensaoOrientacoes());
        perfil.setLeituraEscritaLinguagem(request.leituraEscritaLinguagem());
        perfil.setRaciocinioLogicoMatematico(request.raciocinioLogicoMatematico());
        perfil.setAtencaoMemoriaFuncoesExecutivas(request.atencaoMemoriaFuncoesExecutivas());
        perfil.setOrganizacaoPlanejamentoRealizacaoTarefas(request.organizacaoPlanejamentoRealizacaoTarefas());
        perfil.setInteracaoSocialParticipacaoSala(request.interacaoSocialParticipacaoSala());
        perfil.setAspectosSensoriaisRelevantes(request.aspectosSensoriaisRelevantes());
        perfil.setMobilidadeAcessoTecnologiasRecursos(request.mobilidadeAcessoTecnologiasRecursos());
        perfil.setAutonomiaContextoFamiliar(request.autonomiaContextoFamiliar());
        perfil.setAutonomiaContextoEscolar(request.autonomiaContextoEscolar());
        perfil.setEstrategiasQueFavorecemAprendizagem(request.estrategiasQueFavorecemAprendizagem());
        perfil.setSituacoesQueDificultamAprendizagem(request.situacoesQueDificultamAprendizagem());
        return perfil;
    }

    private static ContextoPsicossocial toContextoPsicossocial(ContextoPsicossocialRequestDto request) {
        ContextoPsicossocial contexto = new ContextoPsicossocial();
        contexto.setRelacaoComCursoEExpectativas(request.relacaoComCursoEExpectativas());
        contexto.setRedeApoioFamiliarSocial(request.redeApoioFamiliarSocial());
        contexto.setConflitosOuFatoresPsicossociais(request.conflitosOuFatoresPsicossociais());
        contexto.setObservacoesFrequenciaRotinaPermanencia(request.observacoesFrequenciaRotinaPermanencia());
        return contexto;
    }

    private static Potencialidades toPotencialidades(PotencialidadesRequestDto request) {
        Potencialidades potencialidades = new Potencialidades();
        potencialidades.setPotencialidadesAcademicas(request.potencialidadesAcademicas());
        potencialidades.setInteressesHabilidades(request.interessesHabilidades());
        potencialidades.setFormasPreferenciaisAprendizagemEDemonstracao(request.formasPreferenciaisAprendizagemEDemonstracao());
        potencialidades.setRecursosQueFavorecemDesempenho(request.recursosQueFavorecemDesempenho());
        return potencialidades;
    }

    private static NecessidadesEducacionais toNecessidadesEducacionais(NecessidadesEducacionaisRequestDto request) {
        NecessidadesEducacionais necessidades = new NecessidadesEducacionais();
        necessidades.setBarreiras(request.barreiras() == null ? new ArrayList<>() : request.barreiras().stream()
                .map(EstudoDeCasoMapper::toBarreira)
                .collect(java.util.stream.Collectors.toCollection(ArrayList::new)));
        return necessidades;
    }

    private static BarreiraEducacional toBarreira(BarreiraEducacionalRequestDto request) {
        BarreiraEducacional barreira = new BarreiraEducacional();
        barreira.setDimensao(request.dimensao());
        barreira.setBarreiraNecessidade(request.barreiraNecessidade());
        barreira.setEvidenciasImpactos(request.evidenciasImpactos());
        barreira.setPrioridade(request.prioridade());
        return barreira;
    }

    private static SintesePsicopedagogica toSintesePsicopedagogica(SintesePsicopedagogicaRequestDto request) {
        SintesePsicopedagogica sintese = new SintesePsicopedagogica();
        sintese.setIdentificacaoNecessidadesEspecificas(request.identificacaoNecessidadesEspecificas());
        sintese.setAvancosObjetivosConhecimentosAlcancados(request.avancosObjetivosConhecimentosAlcancados());
        sintese.setDificuldadesBarreirasComRepercussaoEducacional(request.dificuldadesBarreirasComRepercussaoEducacional());
        sintese.setPotencialidadesECondicoesFacilitadoras(request.potencialidadesECondicoesFacilitadoras());
        sintese.setPrincipaisDemandasIdentificadasNoCaso(request.principaisDemandasIdentificadasNoCaso());
        return sintese;
    }

    private static ChecklistApoios toChecklistApoios(ChecklistApoiosRequestDto request) {
        ChecklistApoios checklist = new ChecklistApoios();
        checklist.setAcessibilidadeAmbiente(copyList(request.acessibilidadeAmbiente()));
        checklist.setAcessibilidadeAmbienteOutro(request.acessibilidadeAmbienteOutro());
        checklist.setComunicacaoMateriais(copyList(request.comunicacaoMateriais()));
        checklist.setComunicacaoMateriaisOutro(request.comunicacaoMateriaisOutro());
        checklist.setMetodologia(copyList(request.metodologia()));
        checklist.setMetodologiaOutro(request.metodologiaOutro());
        checklist.setAvaliacao(copyList(request.avaliacao()));
        checklist.setAvaliacaoOutro(request.avaliacaoOutro());
        checklist.setCurriculo(copyList(request.curriculo()));
        checklist.setCurriculoOutro(request.curriculoOutro());
        checklist.setApoiosInstitucionais(copyList(request.apoiosInstitucionais()));
        checklist.setApoioInstitucionalOutro(request.apoioInstitucionalOutro());
        checklist.setApoiosExternosEncaminhamentos(request.apoiosExternosEncaminhamentos());
        checklist.setPsicopedagogoResponsavel(request.psicopedagogoResponsavel());
        checklist.setCoordenadorResponsavel(request.coordenadorResponsavel());
        checklist.setData(request.data());
        return checklist;
    }

    private static <T> ArrayList<T> copyList(List<T> values) {
        return values == null ? new ArrayList<>() : new ArrayList<>(values);
    }
}
