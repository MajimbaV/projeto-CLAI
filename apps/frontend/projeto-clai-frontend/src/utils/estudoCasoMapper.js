import { stringParaArray, stringParaEnum, adaptarListaParaEnums, extrairListaCondicional, formatarParaYYYYMMDD } from "./conversors";

export function mapearParaEstudoCasoDTO(dadosEstudoCaso, alunoId) {
  return {
    //Identificação
    identificacao:{
      alunoId: alunoId || null,
      datasAnamnese: stringParaArray(dadosEstudoCaso.dataAtendimentos)
        .map(data => formatarParaYYYYMMDD(data))
        .filter(Boolean), // Remove datas inválidas
      nomeProfissional: dadosEstudoCaso.profissionalResponsavel || null,
    },

    //Motivo Demanda
    motivoDemanda: {
    origemEncaminhamento: dadosEstudoCaso.origemEncaminhamento ? stringParaEnum(dadosEstudoCaso.origemEncaminhamento) : null,
    outroOrigemEncaminhamento: dadosEstudoCaso.origemOutro || null,
    motivoPrincipal: dadosEstudoCaso.motivoPrincipal || null,
    
    demandaDoEstudante: dadosEstudoCaso.demandaEstudante || null,
    demandaDoResponsavel: dadosEstudoCaso.demandaFamilia || null,
    demandaEquipeEscolar: dadosEstudoCaso.demandaEquipe || null,
    },

    //Necessidades Específicas
    necessidadesEspecificas: {
      necessidadeInformada: dadosEstudoCaso.necessidadeEspecifica || null,
      diagnosticos: stringParaArray(dadosEstudoCaso.diagnosticos),
    
      // Documentos Comprobatórios
      documentos: dadosEstudoCaso.documentosApresentados === "sim" && dadosEstudoCaso.documentos
        ? dadosEstudoCaso.documentos.map(doc => ({
          descricao: doc.descricao || null,
          data: doc.data || null,
          profissional: doc.profissional || null
        }))
        : [],

      condicoesAssociadas: extrairListaCondicional(dadosEstudoCaso.condicaoAssociada, dadosEstudoCaso.condicaoAssociadaQual),
      medicacoesContinuas: extrairListaCondicional(dadosEstudoCaso.medicacaoContinua, dadosEstudoCaso.medicacaoQual),
      
      encaminhamentosAnteriores: dadosEstudoCaso.encaminhamentosAnteriores || null,
      servicosApoioAtuaisAnteriores: dadosEstudoCaso.servicosApoio || null,
    },
    
    // Anamnese
    anamnese: {
      historicoEscolar: dadosEstudoCaso.historicoEscolar || null,
      experienciasEscolaresPositivas: dadosEstudoCaso.experienciasPositivas || null,
      experienciasEscolaresNegativas: dadosEstudoCaso.experienciasNegativas || null,
      adaptacoesRecursosEResultados: dadosEstudoCaso.adaptacoesRecursos || null,
      objetivosConhecimentosConsolidados: dadosEstudoCaso.conhecimentosConsolidados || null,
      areasDisciplinasFacilidade: stringParaArray(dadosEstudoCaso.areasFacilidade), // DTO espera List
      areasDisciplinasDificuldade: stringParaArray(dadosEstudoCaso.areasDificuldade), // DTO espera List
    },


    // Perfil Estudante
    perfilEstudante: {
      comunicacaoCompreensaoOrientacoes: dadosEstudoCaso.comunicacaoCompreensao || null,
      leituraEscritaLinguagem: dadosEstudoCaso.leituraEscritaLinguagem || null,
      raciocinioLogicoMatematico: dadosEstudoCaso.raciocinioLogico || null,
      atencaoMemoriaFuncoesExecutivas: dadosEstudoCaso.atencaoMemoria || null,
      organizacaoPlanejamentoRealizacaoTarefas: dadosEstudoCaso.organizacaoTarefas || null,
      interacaoSocialParticipacaoSala: dadosEstudoCaso.interacaoSocial || null,
      aspectosSensoriaisRelevantes: dadosEstudoCaso.aspectosSensoriais || null,
      mobilidadeAcessoTecnologiasRecursos: dadosEstudoCaso.mobilidadeTecnologia || null,
      autonomiaContextoFamiliar: dadosEstudoCaso.autonomiaFamiliar || null,
      autonomiaContextoEscolar: dadosEstudoCaso.autonomiaEscolar || null,
      estrategiasQueFavorecemAprendizagem: dadosEstudoCaso.estrategiasAprendizagem || null,
      situacoesQueDificultamAprendizagem: dadosEstudoCaso.situacoesDificultam || null,

    },
    
    // Contexto Psicossocial
    contextoPsicossocial: {
      relacaoComCursoEExpectativas: dadosEstudoCaso.relacaoCursoExpectativas || null,
      redeApoioFamiliarSocial: dadosEstudoCaso.redeApoio || null,
      conflitosOuFatoresPsicossociais: dadosEstudoCaso.fatoresPsicossociais || null,
      observacoesFrequenciaRotinaPermanencia: dadosEstudoCaso.frequenciaRotina || null,
    },


    // Potencialidades
    potencialidades: {
      potencialidadesAcademicas: dadosEstudoCaso.potencialidadesAcademicas || null,
      interessesHabilidades: dadosEstudoCaso.interessesHabilidades || null,
      formasPreferenciaisAprendizagemEDemonstracao: dadosEstudoCaso.preferenciasAprendizagem || null,
      recursosQueFavorecemDesempenho: dadosEstudoCaso.recursosPessoaisTecnologicos || null,
    },

    // Necessidades Educacionais
    necessidadesEducacionais: {
      barreiras: (dadosEstudoCaso.barreiras || []).map(b => ({
        dimensao: b.dimensao ? stringParaEnum(b.dimensao) : null,
        barreiraNecessidade: b.identificada || null, 
        evidenciasImpactos: b.evidenciasImpactos || null,
        prioridade: b.prioridade ? stringParaEnum(b.prioridade) : null
      })),
    },

    // Síntese Psicopedagógica
    sintesePsicopedagogica: {
      identificacaoNecessidadesEspecificas: dadosEstudoCaso.sinteseNecessidades || null,
      avancosObjetivosConhecimentosAlcancados: dadosEstudoCaso.sinteseAvancos || null,
      dificuldadesBarreirasComRepercussaoEducacional: dadosEstudoCaso.sinteseBarreiras || null,
      potencialidadesECondicoesFacilitadoras: dadosEstudoCaso.sintesePotencialidades || null,
      principaisDemandasIdentificadasNoCaso: dadosEstudoCaso.sinteseDemandas || null,

    },

    // Apoios 
    checklistApoios: {
      acessibilidadeAmbiente: adaptarListaParaEnums(dadosEstudoCaso.apoios?.acessibilidade),
      acessibilidadeAmbienteOutro: dadosEstudoCaso.apoios?.acessibilidadeOutro || null,
      
      comunicacaoMateriais: adaptarListaParaEnums(dadosEstudoCaso.apoios?.comunicacaoMateriais),
      comunicacaoMateriaisOutro: dadosEstudoCaso.apoios?.comunicacaoMateriaisOutro || null,
      
      metodologia: adaptarListaParaEnums(dadosEstudoCaso.apoios?.metodologia),
      metodologiaOutro: dadosEstudoCaso.apoios?.metodologiaOutro || null,
      
      avaliacao: adaptarListaParaEnums(dadosEstudoCaso.apoios?.avaliacao),
      avaliacaoOutro: dadosEstudoCaso.apoios?.avaliacaoOutro || null,
      
      curriculo: adaptarListaParaEnums(dadosEstudoCaso.apoios?.curriculo),
      curriculoOutro: dadosEstudoCaso.apoios?.curriculoOutro || null,
      
      apoiosInstitucionais: adaptarListaParaEnums(dadosEstudoCaso.apoios?.apoiosInstitucionais),
      apoioInstitucionalOutro: dadosEstudoCaso.apoios?.apoiosInstitucionaisOutro || null,
  
      // Finalizações
      apoiosExternosEncaminhamentos: dadosEstudoCaso.encaminhamentosExternos || null,
      psicopedagogoResponsavel: dadosEstudoCaso.assinaturaPsicopedagogo || null,
      coordenadorResponsavel: dadosEstudoCaso.assinaturaCoordenador || null,
      data: dadosEstudoCaso.dataEstudoCaso || null,
    },

  };
}

export function mapearParaEstudoCasoDTOCombinado(dadosEstudoCaso, dadosAluno) {
  return {
    //Identificação
    identificacao:{
      aluno: {...dadosAluno},
      datasAnamnese: stringParaArray(dadosEstudoCaso.dataAtendimentos)
        .map(data => formatarParaYYYYMMDD(data))
        .filter(Boolean), // Remove datas inválidas
      nomeProfissional: dadosEstudoCaso.profissionalResponsavel || null,
    },

    //Motivo Demanda
    motivoDemanda: {
    origemEncaminhamento: dadosEstudoCaso.origemEncaminhamento ? stringParaEnum(dadosEstudoCaso.origemEncaminhamento) : null,
    outroOrigemEncaminhamento: dadosEstudoCaso.origemOutro || null,
    motivoPrincipal: dadosEstudoCaso.motivoPrincipal || null,
    
    demandaDoEstudante: dadosEstudoCaso.demandaEstudante || null,
    demandaDoResponsavel: dadosEstudoCaso.demandaFamilia || null,
    demandaEquipeEscolar: dadosEstudoCaso.demandaEquipe || null,
    },

    //Necessidades Específicas
    necessidadesEspecificas: {
      necessidadeInformada: dadosEstudoCaso.necessidadeEspecifica || null,
      diagnosticos: stringParaArray(dadosEstudoCaso.diagnosticos),
    
      // Documentos Comprobatórios
      documentos: dadosEstudoCaso.documentosApresentados === "sim" && dadosEstudoCaso.documentos
        ? dadosEstudoCaso.documentos.map(doc => ({
          descricao: doc.descricao || null,
          data: doc.data || null,
          profissional: doc.profissional || null
        }))
        : [],

      condicoesAssociadas: extrairListaCondicional(dadosEstudoCaso.condicaoAssociada, dadosEstudoCaso.condicaoAssociadaQual),
      medicacoesContinuas: extrairListaCondicional(dadosEstudoCaso.medicacaoContinua, dadosEstudoCaso.medicacaoQual),
      
      encaminhamentosAnteriores: dadosEstudoCaso.encaminhamentosAnteriores || null,
      servicosApoioAtuaisAnteriores: dadosEstudoCaso.servicosApoio || null,
    },
    
    // Anamnese
    anamnese: {
      historicoEscolar: dadosEstudoCaso.historicoEscolar || null,
      experienciasEscolaresPositivas: dadosEstudoCaso.experienciasPositivas || null,
      experienciasEscolaresNegativas: dadosEstudoCaso.experienciasNegativas || null,
      adaptacoesRecursosEResultados: dadosEstudoCaso.adaptacoesRecursos || null,
      objetivosConhecimentosConsolidados: dadosEstudoCaso.conhecimentosConsolidados || null,
      areasDisciplinasFacilidade: stringParaArray(dadosEstudoCaso.areasFacilidade), // DTO espera List
      areasDisciplinasDificuldade: stringParaArray(dadosEstudoCaso.areasDificuldade), // DTO espera List
    },


    // Perfil Estudante
    perfilEstudante: {
      comunicacaoCompreensaoOrientacoes: dadosEstudoCaso.comunicacaoCompreensao || null,
      leituraEscritaLinguagem: dadosEstudoCaso.leituraEscritaLinguagem || null,
      raciocinioLogicoMatematico: dadosEstudoCaso.raciocinioLogico || null,
      atencaoMemoriaFuncoesExecutivas: dadosEstudoCaso.atencaoMemoria || null,
      organizacaoPlanejamentoRealizacaoTarefas: dadosEstudoCaso.organizacaoTarefas || null,
      interacaoSocialParticipacaoSala: dadosEstudoCaso.interacaoSocial || null,
      aspectosSensoriaisRelevantes: dadosEstudoCaso.aspectosSensoriais || null,
      mobilidadeAcessoTecnologiasRecursos: dadosEstudoCaso.mobilidadeTecnologia || null,
      autonomiaContextoFamiliar: dadosEstudoCaso.autonomiaFamiliar || null,
      autonomiaContextoEscolar: dadosEstudoCaso.autonomiaEscolar || null,
      estrategiasQueFavorecemAprendizagem: dadosEstudoCaso.estrategiasAprendizagem || null,
      situacoesQueDificultamAprendizagem: dadosEstudoCaso.situacoesDificultam || null,

    },
    
    // Contexto Psicossocial
    contextoPsicossocial: {
      relacaoComCursoEExpectativas: dadosEstudoCaso.relacaoCursoExpectativas || null,
      redeApoioFamiliarSocial: dadosEstudoCaso.redeApoio || null,
      conflitosOuFatoresPsicossociais: dadosEstudoCaso.fatoresPsicossociais || null,
      observacoesFrequenciaRotinaPermanencia: dadosEstudoCaso.frequenciaRotina || null,
    },


    // Potencialidades
    potencialidades: {
      potencialidadesAcademicas: dadosEstudoCaso.potencialidadesAcademicas || null,
      interessesHabilidades: dadosEstudoCaso.interessesHabilidades || null,
      formasPreferenciaisAprendizagemEDemonstracao: dadosEstudoCaso.preferenciasAprendizagem || null,
      recursosQueFavorecemDesempenho: dadosEstudoCaso.recursosPessoaisTecnologicos || null,
    },

    // Necessidades Educacionais
    necessidadesEducacionais: {
      barreiras: (dadosEstudoCaso.barreiras || []).map(b => ({
        dimensao: b.dimensao ? stringParaEnum(b.dimensao) : null,
        barreiraNecessidade: b.identificada || null, 
        evidenciasImpactos: b.evidenciasImpactos || null,
        prioridade: b.prioridade ? stringParaEnum(b.prioridade) : null
      })),
    },

    // Síntese Psicopedagógica
    sintesePsicopedagogica: {
      identificacaoNecessidadesEspecificas: dadosEstudoCaso.sinteseNecessidades || null,
      avancosObjetivosConhecimentosAlcancados: dadosEstudoCaso.sinteseAvancos || null,
      dificuldadesBarreirasComRepercussaoEducacional: dadosEstudoCaso.sinteseBarreiras || null,
      potencialidadesECondicoesFacilitadoras: dadosEstudoCaso.sintesePotencialidades || null,
      principaisDemandasIdentificadasNoCaso: dadosEstudoCaso.sinteseDemandas || null,

    },

    // Apoios 
    checklistApoios: {
      acessibilidadeAmbiente: adaptarListaParaEnums(dadosEstudoCaso.apoios?.acessibilidade),
      acessibilidadeAmbienteOutro: dadosEstudoCaso.apoios?.acessibilidadeOutro || null,
      
      comunicacaoMateriais: adaptarListaParaEnums(dadosEstudoCaso.apoios?.comunicacaoMateriais),
      comunicacaoMateriaisOutro: dadosEstudoCaso.apoios?.comunicacaoMateriaisOutro || null,
      
      metodologia: adaptarListaParaEnums(dadosEstudoCaso.apoios?.metodologia),
      metodologiaOutro: dadosEstudoCaso.apoios?.metodologiaOutro || null,
      
      avaliacao: adaptarListaParaEnums(dadosEstudoCaso.apoios?.avaliacao),
      avaliacaoOutro: dadosEstudoCaso.apoios?.avaliacaoOutro || null,
      
      curriculo: adaptarListaParaEnums(dadosEstudoCaso.apoios?.curriculo),
      curriculoOutro: dadosEstudoCaso.apoios?.curriculoOutro || null,
      
      apoiosInstitucionais: adaptarListaParaEnums(dadosEstudoCaso.apoios?.apoiosInstitucionais),
      apoioInstitucionalOutro: dadosEstudoCaso.apoios?.apoiosInstitucionaisOutro || null,
  
      // Finalizações
      apoiosExternosEncaminhamentos: dadosEstudoCaso.encaminhamentosExternos || null,
      psicopedagogoResponsavel: dadosEstudoCaso.assinaturaPsicopedagogo || null,
      coordenadorResponsavel: dadosEstudoCaso.assinaturaCoordenador || null,
      data: dadosEstudoCaso.dataEstudoCaso || null,
    },

  };
}