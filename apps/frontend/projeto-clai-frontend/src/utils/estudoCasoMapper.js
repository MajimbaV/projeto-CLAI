import { stringParaArray, stringParaEnum, adaptarListaParaEnums, extrairListaCondicional, formatarParaYYYYMMDD } from "./conversors";

export function mapearParaEstudoCasoDTO(dadosFormulario, alunoId, statusEstudoDeCaso = "INCOMPLETO") {
  return {
    //Identificação
    identificacao:{
      alunoId: alunoId || null,
      datasAnamnese: stringParaArray(dadosFormulario.dataAtendimentos)
        .map(data => formatarParaYYYYMMDD(data))
        .filter(Boolean), // Remove datas inválidas
      nomeProfissional: dadosFormulario.profissionalResponsavel || null,
    },

    //Motivo Demanda
    motivoDemanda: {
    origemEncaminhamento: dadosFormulario.origemEncaminhamento ? stringParaEnum(dadosFormulario.origemEncaminhamento) : null,
    outroOrigemEncaminhamento: dadosFormulario.origemOutro || null,
    motivoPrincipal: dadosFormulario.motivoPrincipal || null,
    
    demandaDoEstudante: dadosFormulario.demandaEstudante || null,
    demandaDoProfissional: null, // Não achei equivalência no documento original
    demandaDoResponsavel: dadosFormulario.demandaFamilia || null,
    demandaEquipeEscolar: dadosFormulario.demandaEquipe || null,
    },

    //Necessidades Específicas
    necessidadesEspecificas: {
      necessidadeInformada: dadosFormulario.necessidadeEspecifica || null,
      diagnosticos: stringParaArray(dadosFormulario.diagnosticos),
    
      // Documentos Comprobatórios
      documentos: dadosFormulario.documentosApresentados === "sim" && dadosFormulario.documentos
        ? dadosFormulario.documentos.map(doc => ({
          descricao: doc.descricao || null,
          data: doc.data || null,
          profissional: doc.profissional || null
        }))
        : [],

      condicoesAssociadas: extrairListaCondicional(dadosFormulario.condicaoAssociada, dadosFormulario.condicaoAssociadaQual),
      medicacoesContinuas: extrairListaCondicional(dadosFormulario.medicacaoContinua, dadosFormulario.medicacaoQual),
      
      encaminhamentosAnteriores: dadosFormulario.encaminhamentosAnteriores || null,
      servicosApoioAtuaisAnteriores: dadosFormulario.servicosApoio || null,
    },
    
    // Anamnese
    anamnese: {
      historicoEscolar: dadosFormulario.historicoEscolar || null,
      experienciasEscolaresPositivas: dadosFormulario.experienciasPositivas || null,
      experienciasEscolaresNegativas: dadosFormulario.experienciasNegativas || null,
      adaptacoesRecursosEResultados: dadosFormulario.adaptacoesRecursos || null,
      objetivosConhecimentosConsolidados: dadosFormulario.conhecimentosConsolidados || null,
      areasDisciplinasFacilidade: stringParaArray(dadosFormulario.areasFacilidade), // DTO espera List
      areasDisciplinasDificuldade: stringParaArray(dadosFormulario.areasDificuldade), // DTO espera List
    },


    // Perfil Estudante
    perfilEstudante: {
      comunicacaoCompreensaoOrientacoes: dadosFormulario.comunicacaoCompreensao || null,
      leituraEscritaLinguagem: dadosFormulario.leituraEscritaLinguagem || null,
      raciocinioLogicoMatematico: dadosFormulario.raciocinioLogico || null,
      atencaoMemoriaFuncoesExecutivas: dadosFormulario.atencaoMemoria || null,
      organizacaoPlanejamentoRealizacaoTarefas: dadosFormulario.organizacaoTarefas || null,
      interacaoSocialParticipacaoSala: dadosFormulario.interacaoSocial || null,
      aspectosSensoriaisRelevantes: dadosFormulario.aspectosSensoriais || null,
      mobilidadeAcessoTecnologiasRecursos: dadosFormulario.mobilidadeTecnologia || null,
      autonomiaContextoFamiliar: dadosFormulario.autonomiaFamiliar || null,
      autonomiaContextoEscolar: dadosFormulario.autonomiaEscolar || null,
      estrategiasQueFavorecemAprendizagem: dadosFormulario.estrategiasAprendizagem || null,
      situacoesQueDificultamAprendizagem: dadosFormulario.situacoesDificultam || null,

    },
    
    // Contexto Psicossocial
    contextoPsicossocial: {
      relacaoComCursoEExpectativas: dadosFormulario.relacaoCursoExpectativas || null,
      redeApoioFamiliarSocial: dadosFormulario.redeApoio || null,
      conflitosOuFatoresPsicossociais: dadosFormulario.fatoresPsicossociais || null,
      observacoesFrequenciaRotinaPermanencia: dadosFormulario.frequenciaRotina || null,
    },


    // Potencialidades
    potencialidades: {
      potencialidadesAcademicas: dadosFormulario.potencialidadesAcademicas || null,
      interessesHabilidades: dadosFormulario.interessesHabilidades || null,
      formasPreferenciaisAprendizagemEDemonstracao: dadosFormulario.preferenciasAprendizagem || null,
      recursosQueFavorecemDesempenho: dadosFormulario.recursosPessoaisTecnologicos || null,
    },

    // Necessidades Educacionais
    necessidadesEducacionais: {
      barreiras: (dadosFormulario.barreiras || []).map(b => ({
        dimensao: b.dimensao ? stringParaEnum(b.dimensao) : null,
        barreiraNecessidade: b.identificada || null, 
        evidenciasImpactos: b.evidenciasImpactos || null,
        prioridade: b.prioridade ? stringParaEnum(b.prioridade) : null
      })),
    },

    // Síntese Psicopedagógica
    sintesePsicopedagogica: {
      identificacaoNecessidadesEspecificas: dadosFormulario.sinteseNecessidades || null,
      avancosObjetivosConhecimentosAlcancados: dadosFormulario.sinteseAvancos || null,
      dificuldadesBarreirasComRepercussaoEducacional: dadosFormulario.sinteseBarreiras || null,
      potencialidadesECondicoesFacilitadoras: dadosFormulario.sintesePotencialidades || null,
      principaisDemandasIdentificadasNoCaso: dadosFormulario.sinteseDemandas || null,

    },

    // Apoios 
    checklistApoios: {
      acessibilidadeAmbiente: adaptarListaParaEnums(dadosFormulario.apoios?.acessibilidade),
      acessibilidadeAmbienteOutro: dadosFormulario.apoios?.acessibilidadeOutro || null,
      
      comunicacaoMateriais: adaptarListaParaEnums(dadosFormulario.apoios?.comunicacaoMateriais),
      comunicacaoMateriaisOutro: dadosFormulario.apoios?.comunicacaoMateriaisOutro || null,
      
      metodologia: adaptarListaParaEnums(dadosFormulario.apoios?.metodologia),
      metodologiaOutro: dadosFormulario.apoios?.metodologiaOutro || null,
      
      avaliacao: adaptarListaParaEnums(dadosFormulario.apoios?.avaliacao),
      avaliacaoOutro: dadosFormulario.apoios?.avaliacaoOutro || null,
      
      curriculo: adaptarListaParaEnums(dadosFormulario.apoios?.curriculo),
      curriculoOutro: dadosFormulario.apoios?.curriculoOutro || null,
      
      apoiosInstitucionais: adaptarListaParaEnums(dadosFormulario.apoios?.apoiosInstitucionais),
      apoioInstitucionalOutro: dadosFormulario.apoios?.apoiosInstitucionaisOutro || null,
  
      // Finalizações
      apoiosExternosEncaminhamentos: dadosFormulario.encaminhamentosExternos || null,
      psicopedagogoResponsavel: dadosFormulario.assinaturaPsicopedagogo || null,
      coordenadorResponsavel: dadosFormulario.assinaturaCoordenador || null,
      data: dadosFormulario.dataEstudoCaso || null,
    },

    statusEstudoDeCaso: statusEstudoDeCaso
  };
}

export function mapearParaEstudoCasoDTOCombinado(dadosEstudoCaso, dadosAluno, statusEstudoDeCaso = "INCOMPLETO") {
  const estudoCasoDTO = mapearParaEstudoCasoDTO(dadosEstudoCaso, null, statusEstudoDeCaso);

  return {
    aluno: {...dadosAluno},
    estudoDeCaso: {
      ...estudoCasoDTO,
    }
  }
}