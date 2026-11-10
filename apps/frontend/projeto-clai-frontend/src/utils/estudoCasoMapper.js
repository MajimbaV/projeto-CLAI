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

export function mapearParaEstudoCasoAtualizacaoDTO(dadosEstudoCaso) {
  const dto = mapearParaEstudoCasoDTO(dadosEstudoCaso);
  delete dto.identificacao
  // Adiciona o campo situacaoEstudoDeCaso para atualização
  dto.situacaoEstudoDeCaso = "VALIDO";

  return dto;
}


/**
 * Mapeia o payload da API para o formato de estado esperado pelo formulário EstudoCasoForm.
 * @param {Object} payload O objeto JSON recebido da API.
 * @returns {Object} O estado formatado para o form.
 */
export function mapearPayloadParaForm(payload) {
  if (!payload) return {};

  // Função auxiliar para lidar com arrays que viram strings
  const joinArray = (arr) => (Array.isArray(arr) ? arr.join(", ") : arr || "");

  // Mapeamento de prioridades para o select
  const mapPrioridade = (prioridade) => {
    const mapa = { ALTA: "Alta", MEDIA: "Média", BAIXA: "Baixa" };
    return mapa[prioridade] || "";
  };

  // Mapeamento das dimensões de barreiras da API para os rótulos do front-end
  const mapDimensaoBarreira = (dimensaoEnum) => {
    const mapa = {
      ACESSO_FISICO_AMBIENTAL: "Acesso físico/ambiental",
      COMUNICACAO: "Comunicação",
      CURRICULO_METODOLOGIA: "Currículo/metodologia",
      AVALIACAO: "Avaliação",
      ORGANIZACAO_TEMPORALIDADE: "Organização/temporalidade",
      INTERACAO_PARTICIPACAO: "Interação/participação",
      TECNOLOGIA_ASSISTIVA_RECURSOS: "Tecnologia assistiva/recursos",
      OUTRA: "Outra",
    };
    return mapa[dimensaoEnum] || dimensaoEnum;
  };

  // Dicionários para mapear os Enums do Checklist para os rótulos do front-end
  const mapApoioAcessibilidade = { ACESSO_FISICO: "Acesso físico", LUGAR_SALA: "Lugar em sala", ILUMINACAO: "Iluminação", REDUCAO_ESTIMULOS: "Redução de estímulos" };
  const mapApoioComunicacao = { MATERIAL_AMPLIADO: "Material ampliado", LIBRAS_INTERPRETE: "Libras/intérprete", LINGUAGEM_OBJETIVA: "Linguagem objetiva", RECURSOS_VISUAIS: "Recursos visuais" };
  const mapApoioMetodologia = { FRAGMENTACAO_TAREFAS: "Fragmentação de tarefas", MEDIACAO: "Mediação", ANTECIPACAO_ROTINA: "Antecipação de rotina", RECURSOS_CONCRETOS_DIGITAIS: "Recursos concretos/digitais" };
  const mapApoioAvaliacao = { TEMPO_ADICIONAL: "Tempo adicional", FORMATO_ACESSIVEL: "Formato acessível", AMBIENTE_ADEQUADO: "Ambiente adequado", FORMA_ALTERNATIVA_DE_RESPOSTA: "Forma alternativa de resposta" };
  const mapApoioCurriculo = { ADAPTACAO_PEQUENO_PORTE: "Adaptação de pequeno porte", ADAPTACAO_GRANDE_PORTE: "Adaptação de grande porte", TEMPORALIDADE: "Temporalidade", PRIORIZACAO_OBJETIVOS: "Priorização de objetivos" };
  const mapApoioInstitucional = { ASSISTENCIA_ESTUDANTIL: "Assistência estudantil", MONITORIA: "Monitoria", ASSISTENTE_INCLUSIVO: "Assistente inclusivo", CUIDADOR: "Cuidador", PSICOPEDAGOGIA: "Psicopedagogia" };

  const converterApoios = (arr, mapa) => (Array.isArray(arr) ? arr.map((item) => mapa[item] || item) : []);

  const nes = payload.necessidadesEspecificas || {};
  const anam = payload.anamnese || {};
  const md = payload.motivoDemanda || {};
  const perf = payload.perfilEstudante || {};
  const ctx = payload.contextoPsicossocial || {};
  const pot = payload.potencialidades || {};
  const chk = payload.checklistApoios || {};
  const sint = payload.sintesePsicopedagogica || {};

  return {
    // 1. Identificação
    dataAtendimentos: joinArray(payload.identificacao?.datasAnamnese),
    profissionalResponsavel: payload.identificacao?.nomeProfissional || "",
    
    // 2. Motivo
    motivoPrincipal: md.motivoPrincipal || "",
    origemEncaminhamento: md.origemEncaminhamento || "",
    origemOutro: md.outroOrigemEncaminhamento || "",
    demandaEstudante: md.demandaDoEstudante || "",
    demandaFamilia: md.demandaDoResponsavel || "",
    demandaEquipe: md.demandaEquipeEscolar || "",

    // 3. Necessidades Específicas
    necessidadeEspecifica: nes.necessidadeInformada || "",
    diagnosticos: joinArray(nes.diagnosticos),
    
    documentosApresentados: Array.isArray(nes.documentos) && nes.documentos.length > 0 ? "sim" : "nao",
    documentos: nes.documentos || [],
    documentosQuais: "", // O form preenche a lista, mas pode-se extrair as descrições se necessário
    documentosDataProfissional: "", // Caso queira agregar

    condicaoAssociada: Array.isArray(nes.condicoesAssociadas) && nes.condicoesAssociadas.length > 0 ? "sim" : "nao",
    condicaoAssociadaQual: joinArray(nes.condicoesAssociadas),

    medicacaoContinua: Array.isArray(nes.medicacoesContinuas) && nes.medicacoesContinuas.length > 0 ? "sim" : "nao",
    medicacaoQual: joinArray(nes.medicacoesContinuas),

    encaminhamentosAnteriores: nes.encaminhamentosAnteriores || "",
    servicosApoio: nes.servicosApoioAtuaisAnteriores || "",

    // 4. Anamnese
    historicoEscolar: anam.historicoEscolar || "",
    experienciasPositivas: anam.experienciasEscolaresPositivas || "",
    experienciasNegativas: anam.experienciasEscolaresNegativas || "",
    adaptacoesRecursos: anam.adaptacoesRecursosEResultados || "",
    conhecimentosConsolidados: anam.objetivosConhecimentosConsolidados || "",
    areasFacilidade: joinArray(anam.areasDisciplinasFacilidade),
    areasDificuldade: joinArray(anam.areasDisciplinasDificuldade),

    // 5. Perfil
    comunicacaoCompreensao: perf.comunicacaoCompreensaoOrientacoes || "",
    leituraEscritaLinguagem: perf.leituraEscritaLinguagem || "",
    raciocinioLogico: perf.raciocinioLogicoMatematico || "",
    atencaoMemoria: perf.atencaoMemoriaFuncoesExecutivas || "",
    organizacaoTarefas: perf.organizacaoPlanejamentoRealizacaoTarefas || "",
    interacaoSocial: perf.interacaoSocialParticipacaoSala || "",
    aspectosSensoriais: perf.aspectosSensoriaisRelevantes || "",
    mobilidadeTecnologia: perf.mobilidadeAcessoTecnologiasRecursos || "",
    autonomiaFamiliar: perf.autonomiaContextoFamiliar || "",
    autonomiaEscolar: perf.autonomiaContextoEscolar || "",
    estrategiasAprendizagem: perf.estrategiasQueFavorecemAprendizagem || "",
    situacoesDificultam: perf.situacoesQueDificultamAprendizagem || "",

    // 6. Contexto
    relacaoCursoExpectativas: ctx.relacaoComCursoEExpectativas || "",
    redeApoio: ctx.redeApoioFamiliarSocial || "",
    fatoresPsicossociais: ctx.conflitosOuFatoresPsicossociais || "",
    frequenciaRotina: ctx.observacoesFrequenciaRotinaPermanencia || "",

    // 7. Potencialidades
    potencialidadesAcademicas: pot.potencialidadesAcademicas || "",
    interessesHabilidades: pot.interessesHabilidades || "",
    preferenciasAprendizagem: pot.formasPreferenciaisAprendizagemEDemonstracao || "",
    recursosPessoaisTecnologicos: pot.recursosQueFavorecemDesempenho || "",

    // 8. Barreiras (Necessidades Educacionais)
    barreiras: payload.necessidadesEducacionais?.barreiras?.map((b) => ({
      dimensao: mapDimensaoBarreira(b.dimensao),
      identificada: b.barreiraNecessidade || "",
      evidenciasImpactos: b.evidenciasImpactos || "",
      prioridade: mapPrioridade(b.prioridade),
    })) || [],

    // 9. Síntese
    sinteseNecessidades: sint.sinteseNecessidades || "",
    sinteseAvancos: sint.sinteseAvancos || "",
    sinteseBarreiras: sint.sinteseBarreiras || "",
    sintesePotencialidades: sint.sintesePotencialidades || "",
    sinteseDemandas: sint.sinteseDemandas || "",

    // 10. Checklist de Apoios
    apoios: {
      acessibilidade: converterApoios(chk.acessibilidadeAmbiente, mapApoioAcessibilidade),
      acessibilidadeOutro: chk.acessibilidadeAmbienteOutro || "",
      
      comunicacaoMateriais: converterApoios(chk.comunicacaoMateriais, mapApoioComunicacao),
      comunicacaoMateriaisOutro: chk.comunicacaoMateriaisOutro || "",
      
      metodologia: converterApoios(chk.metodologia, mapApoioMetodologia),
      metodologiaOutro: chk.metodologiaOutro || "",
      
      avaliacao: converterApoios(chk.avaliacao, mapApoioAvaliacao),
      avaliacaoOutro: chk.avaliacaoOutro || "",
      
      curriculo: converterApoios(chk.curriculo, mapApoioCurriculo),
      curriculoOutro: chk.curriculoOutro || "",
      
      apoiosInstitucionais: converterApoios(chk.apoiosInstitucionais, mapApoioInstitucional),
      apoiosInstitucionaisOutro: chk.apoioInstitucionalOutro || "",
    },
    
    encaminhamentosExternos: chk.apoiosExternosEncaminhamentos || "",
    assinaturaPsicopedagogo: chk.psicopedagogoResponsavel || "",
    assinaturaCoordenador: chk.coordenadorResponsavel || "",
    dataEstudoCaso: chk.data || "",
  };
}