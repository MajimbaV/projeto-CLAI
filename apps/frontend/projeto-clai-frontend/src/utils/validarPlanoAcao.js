const PERGUNTAS_SIM_NAO = [
  {
    campoAfirmacao: "comorbidadeRelevante",
    campoLista: "comorbidadeDescricao",
    mensagemAfirmacaoObrigatoria: "Informe se há comorbidade relevante",
    mensagemListaSim:
      "É necessário descrever as comorbidades quando marcado como SIM.",
    mensagemListaNao:
      "A lista de comorbidades deve estar vazia quando marcado como NAO.",
  },
  {
    campoAfirmacao: "fazUsoMedicacao",
    campoLista: "medicacaoDescricao",
    mensagemAfirmacaoObrigatoria: "Informe se faz uso de medicação",
    mensagemListaSim:
      "É necessário descrever as medicações quando marcado como SIM.",
    mensagemListaNao:
      "A lista de medicações deve estar vazia quando marcado como NAO.",
  },
  {
    campoAfirmacao: "frequentaServicoApoio",
    campoLista: "servicoApoioDescricao",
    mensagemAfirmacaoObrigatoria: "Informe se frequenta serviços de apoio",
    mensagemListaSim:
      "É necessário descrever os serviços de apoio quando marcado como SIM.",
    mensagemListaNao:
      "A lista de serviços de apoio deve estar vazia quando marcado como NAO.",
  },
  {
    campoAfirmacao: "apresentouDocumentos",
    campoLista: "documentosDescricao",
    mensagemAfirmacaoObrigatoria:
      "Informe se apresentou documentos comprobatórios",
    mensagemListaSim:
      "É necessário descrever os documentos apresentados quando marcado como SIM.",
    mensagemListaNao:
      "A lista de documentos deve estar vazia quando marcado como NAO.",
  },
];

const CAMPOS_DESCRITIVOS = [
  {
    campo: "necessidades",
    mensagem: "As necessidades específicas são obrigatórias",
  },
  {
    campo: "relatoDificuldades",
    mensagem: "O relato de avanços e dificuldades é obrigatório",
  },
  { campo: "demandas", mensagem: "As principais demandas são obrigatórias" },
  {
    campo: "propostas",
    mensagem: "As propostas de intervenção são obrigatórias",
  },
];

function obterDataAtualLocal() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function temItemPreenchido(lista) {
  return lista.some((item) => item.trim() !== "");
}


export function validarPlanoAcao(formData, dataAtual = obterDataAtualLocal()) {
  const erros = {};

  if (!formData.matricula) {
    erros.matricula = "Selecione um aluno.";
  } else if (!/^\d+$/.test(formData.matricula)) {
    erros.matricula = "A matrícula deve conter apenas números.";
  }

  if (!formData.dataPlano) {
    erros.dataPlano = "A data do plano é obrigatória";
  } else if (formData.dataPlano > dataAtual) {
    erros.dataPlano = "A data do plano não pode ser uma data futura";
  }

  for (const {
    campoAfirmacao,
    campoLista,
    mensagemAfirmacaoObrigatoria,
    mensagemListaSim,
    mensagemListaNao,
  } of PERGUNTAS_SIM_NAO) {
    const resposta = formData[campoAfirmacao];
    const lista = formData[campoLista];

    if (resposta !== "SIM" && resposta !== "NAO") {
      erros[campoAfirmacao] = mensagemAfirmacaoObrigatoria;
      continue;
    }

    if (resposta === "SIM" && !temItemPreenchido(lista)) {
      erros[campoLista] = mensagemListaSim;
    } else if (resposta === "NAO" && lista.length > 0) {
      erros[campoLista] = mensagemListaNao;
    }
  }

  for (const { campo, mensagem } of CAMPOS_DESCRITIVOS) {
    if (!formData[campo] || formData[campo].trim() === "") {
      erros[campo] = mensagem;
    }
  }

  return erros;
}

export function prepararPayloadPlanoAcao(formData) {
  function prepararLista(resposta, lista) {
    if (resposta === "NAO") return [];
    return lista.map((item) => item.trim()).filter((item) => item !== "");
  }

  return {
    matricula: formData.matricula,
    comorbidadeRelevante: formData.comorbidadeRelevante,
    comorbidadeDescricao: prepararLista(
      formData.comorbidadeRelevante,
      formData.comorbidadeDescricao,
    ),
    fazUsoMedicacao: formData.fazUsoMedicacao,
    medicacaoDescricao: prepararLista(
      formData.fazUsoMedicacao,
      formData.medicacaoDescricao,
    ),
    frequentaServicoApoio: formData.frequentaServicoApoio,
    servicoApoioDescricao: prepararLista(
      formData.frequentaServicoApoio,
      formData.servicoApoioDescricao,
    ),
    apresentouDocumentos: formData.apresentouDocumentos,
    documentosDescricao: prepararLista(
      formData.apresentouDocumentos,
      formData.documentosDescricao,
    ),
    necessidades: formData.necessidades.trim(),
    relatoDificuldades: formData.relatoDificuldades.trim(),
    demandas: formData.demandas.trim(),
    propostas: formData.propostas.trim(),
    dataPlano: formData.dataPlano,
  };
}