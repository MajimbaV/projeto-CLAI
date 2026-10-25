package com.ifpb.edu.br.clai.dto.estudodecaso.response;

import com.ifpb.edu.br.clai.dto.AlunoResponseDto;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record EstudoDeCasoResponseDto(
        UUID id,
        StatusEstudoDeCaso statusEstudoDeCaso,
        IdentificacaoResponseDto identificacao,
        MotivoDemandaResponseDto motivoDemanda,
        NecessidadesEspecificasResponseDto necessidadesEspecificas,
        AnamneseResponseDto anamnese,
        PerfilEstudanteResponseDto perfilEstudante,
        ContextoPsicossocialResponseDto contextoPsicossocial,
        PotencialidadesResponseDto potencialidades,
        NecessidadesEducacionaisResponseDto necessidadesEducacionais,
        SintesePsicopedagogicaResponseDto sintesePsicopedagogica,
        ChecklistApoiosResponseDto checklistApoios,
        SituacaoEstudoDeCaso situacaoEstudoDeCaso
) {
    public record IdentificacaoResponseDto(
            UUID alunoId,
            AlunoResponseDto aluno,
            List<LocalDate> datasAnamnese,
            String nomeProfissional
    ) {}

    public record MotivoDemandaResponseDto(
            OrigemEncaminhamento origemEncaminhamento,
            String outroOrigemEncaminhamento,
            String motivoPrincipal,
            String demandaDoEstudante,
            String demandaDoProfissional,
            String demandaDoResponsavel,
            String demandaEquipeEscolar
    ) {}

    public record NecessidadesEspecificasResponseDto(
            String necessidadeInformada,
            List<String> diagnosticos,
            List<DocumentoComprobatorioResponseDto> documentos,
            List<String> condicoesAssociadas,
            List<String> medicacoesContinuas,
            String encaminhamentosAnteriores,
            String servicosApoioAtuaisAnteriores
    ) {}

    public record DocumentoComprobatorioResponseDto(
            String descricao,
            LocalDate data,
            String profissional
    ) {}

    public record AnamneseResponseDto(
            String historicoEscolar,
            String experienciasEscolaresPositivas,
            String experienciasEscolaresNegativas,
            String adaptacoesRecursosEResultados,
            String objetivosConhecimentosConsolidados,
            List<String> areasDisciplinasFacilidade,
            List<String> areasDisciplinasDificuldade
    ) {}

    public record PerfilEstudanteResponseDto(
            String comunicacaoCompreensaoOrientacoes,
            String leituraEscritaLinguagem,
            String raciocinioLogicoMatematico,
            String atencaoMemoriaFuncoesExecutivas,
            String organizacaoPlanejamentoRealizacaoTarefas,
            String interacaoSocialParticipacaoSala,
            String aspectosSensoriaisRelevantes,
            String mobilidadeAcessoTecnologiasRecursos,
            String autonomiaContextoFamiliar,
            String autonomiaContextoEscolar,
            String estrategiasQueFavorecemAprendizagem,
            String situacoesQueDificultamAprendizagem
    ) {}

    public record ContextoPsicossocialResponseDto(
            String relacaoComCursoEExpectativas,
            String redeApoioFamiliarSocial,
            String conflitosOuFatoresPsicossociais,
            String observacoesFrequenciaRotinaPermanencia
    ) {}

    public record PotencialidadesResponseDto(
            String potencialidadesAcademicas,
            String interessesHabilidades,
            String formasPreferenciaisAprendizagemEDemonstracao,
            String recursosQueFavorecemDesempenho
    ) {}

    public record NecessidadesEducacionaisResponseDto(
            List<BarreiraEducacionalResponseDto> barreiras
    ) {}

    public record BarreiraEducacionalResponseDto(
            DimensaoNecessidadeEducacional dimensao,
            String barreiraNecessidade,
            String evidenciasImpactos,
            PrioridadeNecessidadeEducacional prioridade
    ) {}

    public record SintesePsicopedagogicaResponseDto(
            String identificacaoNecessidadesEspecificas,
            String avancosObjetivosConhecimentosAlcancados,
            String dificuldadesBarreirasComRepercussaoEducacional,
            String potencialidadesECondicoesFacilitadoras,
            String principaisDemandasIdentificadasNoCaso
    ) {}

    public record ChecklistApoiosResponseDto(
            List<ApoioAcessibilidade> acessibilidadeAmbiente,
            String acessibilidadeAmbienteOutro,
            List<ApoioComunicacao> comunicacaoMateriais,
            String comunicacaoMateriaisOutro,
            List<ApoioMetodologia> metodologia,
            String metodologiaOutro,
            List<ApoioAvaliacao> avaliacao,
            String avaliacaoOutro,
            List<ApoioCurriculo> curriculo,
            String curriculoOutro,
            List<ApoioInstitucional> apoiosInstitucionais,
            String apoioInstitucionalOutro,
            String apoiosExternosEncaminhamentos,
            String psicopedagogoResponsavel,
            String coordenadorResponsavel,
            LocalDate data
    ) {}
}
