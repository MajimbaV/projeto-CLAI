import { useState } from "react";
import ChevronLeft from "../../../assets/ChevronLeft.png";
import EditImg from "../../../assets/Edit.png";
import { useGetAlunoByMatricula } from "../../../hooks/useGetAlunoByMatricula";

import "./AlunoPlanejamento.css";

const ABAS_PLANEJAMENTO = [
  { id: "estudo-caso", titulo: "Estudo de caso" },
  { id: "plano-atendimento", titulo: "Plano de atendimento" },
  { id: "adaptacoes", titulo: "Adaptações" },
  { id: "documentos", titulo: "Outros documentos" },
];

const SECOES_ESTUDO_CONFIG = [
  {
    titulo: "Identificação",
    chaves: ["identificacao", "dadosIdentificacao", "identificacaoAluno"],
  },
  {
    titulo: "Encaminhamento",
    chaves: [
      "encaminhamento",
      "motivoEncaminhamento",
      "descricaoEncaminhamento",
    ],
  },
  {
    titulo: "Documentação e necessidade específica",
    chaves: [
      "documentacaoNecessidade",
      "documentacao",
      "necessidadeEspecifica",
      "necessidadeEspecial",
      "laudo",
      "diagnostico",
    ],
  },
  {
    titulo: "Anamnese",
    chaves: ["anamnese"],
  },
  {
    titulo: "Perfil de aprendizagem",
    chaves: ["perfilAprendizagem", "aprendizagem"],
  },
  {
    titulo: "Contexto psicossocial",
    chaves: ["contextoPsicossocial", "contexto"],
  },
  {
    titulo: "Potencialidades",
    chaves: ["potencialidades", "pontosFortes"],
  },
  {
    titulo: "Barreiras educacionais",
    chaves: ["barreirasEducacionais", "barreiras"],
  },
  {
    titulo: "Síntese psicopedagógica",
    chaves: ["sintesePsicopedagogica", "sintese"],
  },
  {
    titulo: "Apoios e adaptações",
    chaves: ["apoiosAdaptacoes", "apoios", "adaptacoes"],
  },
];

const CAMPOS_METADADOS = new Set([
  "id",
  "_id",
  "estudoCasoId",
  "idEstudoCaso",
  "titulo",
  "dataCriacao",
  "dataAtualizacao",
  "createdAt",
  "updatedAt",
  "status",
  "situacao",
  "matriculaAluno",
  "alunoMatricula",
  "alunoId",
  "alunoNome",
  "nomeAluno",
  "secoes",
  "sections",
]);

function temConteudo(valor) {
  if (valor === undefined || valor === null) return false;

  if (typeof valor === "string") {
    return valor.trim() !== "";
  }

  if (Array.isArray(valor)) {
    return valor.some(temConteudo);
  }

  if (typeof valor === "object") {
    return Object.values(valor).some(temConteudo);
  }

  return true;
}

function formatarRotulo(chave) {
  const rotulo = String(chave)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .trim();

  return rotulo.charAt(0).toUpperCase() + rotulo.slice(1);
}

function exibir(valor) {
  if (valor === undefined || valor === null || valor === "") {
    return "Não informado";
  }

  return valor;
}

function formatarData(data) {
  if (!data) return "Não informado";

  const texto = String(data);
  const partes = texto.slice(0, 10).split("-");

  if (partes.length !== 3 || partes[0].length !== 4) {
    return texto;
  }

  const [ano, mes, dia] = partes;

  return `${dia}/${mes}/${ano}`;
}

function obterSecoesEstudo(estudo) {
  if (!estudo || typeof estudo !== "object") {
    return [];
  }

  const secoesOriginais = estudo.secoes || estudo.sections;

  if (Array.isArray(secoesOriginais) && secoesOriginais.length > 0) {
    return secoesOriginais
      .filter((secao) => secao && typeof secao === "object")
      .map((secao) => {
        const {
          titulo,
          nome,
          campos,
          conteudo,
          descricao,
          respostas,
          ...outrosCampos
        } = secao;

        return {
          titulo: titulo || nome || "Informações",
          valor: campos ?? conteudo ?? descricao ?? respostas ?? outrosCampos,
        };
      })
      .filter((secao) => temConteudo(secao.valor));
  }

  const chavesReconhecidas = new Set(
    SECOES_ESTUDO_CONFIG.flatMap((secao) => secao.chaves),
  );

  const secoesConhecidas = SECOES_ESTUDO_CONFIG.map((secao) => {
    const chaveEncontrada = secao.chaves.find((chave) =>
      temConteudo(estudo[chave]),
    );

    if (!chaveEncontrada) return null;

    return {
      titulo: secao.titulo,
      valor: estudo[chaveEncontrada],
    };
  }).filter(Boolean);

  const outrosCampos = Object.fromEntries(
    Object.entries(estudo).filter(
      ([chave, valor]) =>
        !CAMPOS_METADADOS.has(chave) &&
        !chavesReconhecidas.has(chave) &&
        temConteudo(valor),
    ),
  );

  if (Object.keys(outrosCampos).length > 0) {
    secoesConhecidas.push({
      titulo: "Outras informações",
      valor: outrosCampos,
    });
  }

  return secoesConhecidas;
}

function ValorEstudo({ valor }) {
  if (!temConteudo(valor)) {
    return <p className="planejamento-sem-conteudo">Não informado</p>;
  }

  if (typeof valor === "boolean") {
    return <p>{valor ? "Sim" : "Não"}</p>;
  }

  if (Array.isArray(valor)) {
    return (
      <ul className="planejamento-valor-lista">
        {valor.filter(temConteudo).map((item, index) => (
          <li key={index}>
            {typeof item === "object" && item !== null ? (
              <ValorEstudo valor={item} />
            ) : (
              String(item)
            )}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof valor === "object") {
    const rotulo = valor.label || valor.rotulo || valor.campo || valor.nome;

    const valorInterno =
      valor.valor ?? valor.value ?? valor.resposta ?? valor.conteudo;

    if (rotulo && valorInterno !== undefined) {
      return (
        <div className="planejamento-valor-identificado">
          <span>{rotulo}</span>
          <ValorEstudo valor={valorInterno} />
        </div>
      );
    }

    const campos = Object.entries(valor).filter(
      ([chave, conteudo]) =>
        chave !== "id" && chave !== "_id" && temConteudo(conteudo),
    );

    if (campos.length === 0) {
      return <p className="planejamento-sem-conteudo">Não informado</p>;
    }

    return (
      <div className="planejamento-campos-aninhados">
        {campos.map(([chave, conteudo]) => (
          <div className="planejamento-campo-aninhado" key={chave}>
            <span>{formatarRotulo(chave)}</span>
            <ValorEstudo valor={conteudo} />
          </div>
        ))}
      </div>
    );
  }

  return <p className="planejamento-valor-texto">{String(valor)}</p>;
}

function AlunoPlanejamento({
  matriculaAluno,
  onBack,
  onNovoEstudoCaso,
  onEditarEstudoCaso,
  estudosCaso = [],
  isLoadingEstudosCaso = false,
  erroEstudosCaso = null,
}) {
  const [abaAtiva, setAbaAtiva] = useState("estudo-caso");
  const [estudosExpandidos, setEstudosExpandidos] = useState([]);

  const {
    data: aluno,
    isLoading,
    error,
  } = useGetAlunoByMatricula(matriculaAluno);

  function alternarEstudo(id) {
    setEstudosExpandidos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id],
    );
  }

  if (isLoading) {
    return (
      <div className="aluno-planejamento-body">
        <p className="planejamento-mensagem">Carregando dados do aluno...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aluno-planejamento-body">
        <p className="planejamento-mensagem">
          Erro ao carregar o aluno:{" "}
          {error.detail || error.message || String(error)}
        </p>

        <button type="button" className="planejamento-voltar" onClick={onBack}>
          <img src={ChevronLeft} alt="" />
          Voltar para alunos
        </button>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="aluno-planejamento-body">
        <p className="planejamento-mensagem">Aluno não encontrado.</p>

        <button type="button" className="planejamento-voltar" onClick={onBack}>
          <img src={ChevronLeft} alt="" />
          Voltar para alunos
        </button>
      </div>
    );
  }

  const nome = aluno.alunoNome || aluno.nome;
  const matricula = aluno.alunoMatricula || aluno.matricula;
  const curso = aluno.alunoCurso || aluno.curso;
  const periodoIngresso = aluno.periodoIngresso || aluno.log;
  const periodoAluno = aluno.periodoAluno;

  const possuiStatus = typeof aluno.ativo === "boolean";

  const listaEstudos = Array.isArray(estudosCaso) ? estudosCaso : [];

  function renderizarEstudosCaso() {
    if (isLoadingEstudosCaso) {
      return (
        <p className="planejamento-mensagem">Carregando estudos de caso...</p>
      );
    }

    if (erroEstudosCaso) {
      return (
        <p className="planejamento-erro">
          Erro ao carregar os estudos de caso:{" "}
          {erroEstudosCaso.detail ||
            erroEstudosCaso.message ||
            String(erroEstudosCaso)}
        </p>
      );
    }

    if (listaEstudos.length === 0) {
      return (
        <div className="planejamento-vazio">
          <div className="planejamento-vazio-icone">+</div>

          <h3>Nenhum estudo de caso cadastrado</h3>

          <p>
            Os estudos de caso deste aluno aparecerão aqui depois de serem
            cadastrados.
          </p>

          <button
            type="button"
            className="planejamento-botao-principal"
            onClick={onNovoEstudoCaso}
          >
            Criar estudo de caso
          </button>
        </div>
      );
    }

    return (
      <div className="planejamento-lista-estudos">
        {listaEstudos.map((estudo, index) => {
          const idEstudo =
            estudo.id ??
            estudo._id ??
            estudo.estudoCasoId ??
            estudo.idEstudoCaso;

          const id = idEstudo ?? `${matricula}-${index}`;

          const titulo = estudo.titulo || `Estudo de caso ${index + 1}`;

          const expandido = estudosExpandidos.includes(id);
          const secoes = obterSecoesEstudo(estudo);

          const dataCriacao = estudo.dataCriacao || estudo.createdAt;
          const status = estudo.status || estudo.situacao;

          return (
            <article className="planejamento-estudo" key={id}>
              <div className="planejamento-estudo-cabecalho">
                <button
                  type="button"
                  className="planejamento-estudo-toggle"
                  onClick={() => alternarEstudo(id)}
                  aria-expanded={expandido}
                >
                  <span className="planejamento-estudo-icone">
                    <span>EC</span>
                  </span>

                  <span className="planejamento-estudo-resumo">
                    <strong>{titulo}</strong>

                    <span className="planejamento-estudo-metadados">
                      {dataCriacao
                        ? `Criado em ${formatarData(dataCriacao)}`
                        : "Data de criação não informada"}

                      {status ? ` · ${status}` : ""}
                    </span>
                  </span>

                  <span
                    className={`planejamento-estudo-seta ${
                      expandido ? "expandido" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>

                <button
                  type="button"
                  className="planejamento-estudo-editar"
                  title="Editar estudo de caso"
                  aria-label={`Editar ${titulo}`}
                  disabled={idEstudo == null || !onEditarEstudoCaso}
                  onClick={() => onEditarEstudoCaso?.(estudo)}
                >
                  <img src={EditImg} alt="" />
                  <span>Editar</span>
                </button>
              </div>

              {expandido && (
                <div className="planejamento-estudo-conteudo">
                  {secoes.length > 0 ? (
                    secoes.map((secao, secaoIndex) => (
                      <section
                        className="planejamento-secao-estudo"
                        key={`${id}-secao-${secaoIndex}`}
                      >
                        <h4>{secao.titulo}</h4>
                        <ValorEstudo valor={secao.valor} />
                      </section>
                    ))
                  ) : (
                    <p className="planejamento-sem-conteudo">
                      Este estudo de caso ainda não possui informações
                      disponíveis para exibição.
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="aluno-planejamento-body">
      <div className="aluno-planejamento-header">
        <div className="planejamento-header-texto">
          <button
            type="button"
            className="planejamento-voltar"
            onClick={onBack}
          >
            <img src={ChevronLeft} alt="" />
            Voltar para alunos
          </button>

          <h1>Planejamento do aluno</h1>

          <p>
            Consulte os estudos de caso e os documentos relacionados ao aluno.
          </p>
        </div>

        <button
          type="button"
          className="planejamento-botao-principal"
          onClick={onNovoEstudoCaso}
        >
          <span aria-hidden="true">+</span>
          Novo estudo de caso
        </button>
      </div>

      <section className="planejamento-aluno-card">
        <div className="planejamento-aluno-perfil">
          <div className="planejamento-aluno-avatar">
            {(nome || "A").trim().charAt(0).toUpperCase()}
          </div>

          <div className="planejamento-aluno-identificacao">
            <h2>{exibir(nome)}</h2>
            <p>Matrícula: {exibir(matricula)}</p>
          </div>

          {possuiStatus && (
            <span
              className={`planejamento-status ${
                aluno.ativo ? "ativo" : "arquivado"
              }`}
            >
              <span className="planejamento-status-ponto" />
              {aluno.ativo ? "Ativo" : "Arquivado"}
            </span>
          )}
        </div>

        <div className="planejamento-aluno-dados">
          <div className="planejamento-dado">
            <span>Curso</span>
            <p>{exibir(curso)}</p>
          </div>

          <div className="planejamento-dado">
            <span>Período de ingresso</span>
            <p>{exibir(periodoIngresso)}</p>
          </div>

          <div className="planejamento-dado">
            <span>Período letivo</span>
            <p>{exibir(periodoAluno)}</p>
          </div>
        </div>
      </section>

      <section className="planejamento-documentos">
        <div className="planejamento-abas" role="tablist">
          {ABAS_PLANEJAMENTO.map((aba) => (
            <button
              type="button"
              role="tab"
              key={aba.id}
              aria-selected={abaAtiva === aba.id}
              className={`planejamento-aba ${
                abaAtiva === aba.id ? "ativa" : ""
              }`}
              onClick={() => setAbaAtiva(aba.id)}
            >
              {aba.titulo}
            </button>
          ))}
        </div>

        <div className="planejamento-conteudo-aba">
          {abaAtiva === "estudo-caso" && (
            <>
              <div className="planejamento-lista-header">
                <div>
                  <h2>Estudos de caso</h2>
                  <p>
                    Consulte os registros e abra um estudo para ver seu conteúdo
                    completo.
                  </p>
                </div>

                <span className="planejamento-contador">
                  {listaEstudos.length}{" "}
                  {listaEstudos.length === 1 ? "registro" : "registros"}
                </span>
              </div>

              {renderizarEstudosCaso()}
            </>
          )}

          {abaAtiva === "plano-atendimento" && (
            <div className="planejamento-em-breve">
              <h2>Plano de atendimento</h2>
              <p>
                Esta área poderá reunir os planos de acompanhamento do aluno.
              </p>
              <span>Funcionalidade a ser implementada</span>
            </div>
          )}

          {abaAtiva === "adaptacoes" && (
            <div className="planejamento-em-breve">
              <h2>Adaptações</h2>
              <p>
                Esta área poderá reunir as adaptações e os apoios educacionais
                do aluno.
              </p>
              <span>Funcionalidade a ser implementada</span>
            </div>
          )}

          {abaAtiva === "documentos" && (
            <div className="planejamento-em-breve">
              <h2>Outros documentos</h2>
              <p>
                Outros documentos relacionados ao aluno poderão ser consultados
                nesta área.
              </p>
              <span>Funcionalidade a ser implementada</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AlunoPlanejamento;
