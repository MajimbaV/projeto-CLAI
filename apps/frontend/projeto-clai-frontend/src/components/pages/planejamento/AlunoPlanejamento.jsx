import { useState } from "react";
import ChevronLeft from "../../../assets/ChevronLeft.png";
import EditImg from "../../../assets/Edit.png";
import PlanoAcaoView from "../planoacao/PlanoAcaoView";
import EstudoCasoView from "../estudodecaso/EstudoCasoView";
import PeiView from "../pei/PeiView";
import RaiView from "../rai/RaiView";
import { getPeas } from "../../../services/PeaServiceMock";
import { getRais } from "../../../services/RaiServiceMock";
import "./AlunoPlanejamento.css";

const ABAS_PLANEJAMENTO = [
  { id: "estudo-caso", titulo: "Estudo de Caso" },
  { id: "plano-acao", titulo: "Planos de Ação" },
  { id: "pei", titulo: "PEI" },
  { id: "documentos", titulo: "Outros documentos" },
];

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

function AlunoPlanejamento({
  aluno = {},
  documentos = {},
  errors = {},
  loadings = {},
  onBack,
  onNovoEstudoCaso,
  onNovoPlanoAcao,
  onEditarEstudoCaso,
  onEditarPlanoAcao,
  onNovoPei,
  onEditarPei,
  onNovoPea,
  onNovoRai,
  onEditarRai,
}) {
  const [abaAtiva, setAbaAtiva] = useState("estudo-caso");
  const [estudosExpandidos, setEstudosExpandidos] = useState([]);
  const [planosExpandidos, setPlanosExpandidos] = useState([]);
  const [peisExpandidos, setPeisExpandidos] = useState([]);
  const [peasExpandidos, setPeasExpandidos] = useState([]);
  const [raisExpandidos, setRaisExpandidos] = useState([]);

  function alternarEstudo(id) {
    setEstudosExpandidos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id],
    );
  }

  function alternarPlano(id) {
    setPlanosExpandidos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id],
    );
  }

  function alternarPei(id) {
    setPeisExpandidos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id],
    );
  }

  function alternarPea(id) {
    setPeasExpandidos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id],
    );
  }

  function alternarRai(id) {
    setRaisExpandidos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id],
    );
  }

  if (loadings.aluno) {
    return (
      <div className="aluno-planejamento-body">
        <p className="planejamento-mensagem">Carregando dados do aluno...</p>
      </div>
    );
  }

  if (errors.aluno) {
    return (
      <div className="aluno-planejamento-body">
        <p className="planejamento-mensagem">
          Erro ao carregar o aluno:{" "}
          {errors.aluno.detail || errors.aluno.message || String(errors.aluno)}
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

  const curso =
    aluno?.curso?.nomeCurso ??
    aluno?.alunoCurso ??
    aluno?.curso ??
    "Não informado";

  const periodoIngresso = aluno.periodoIngresso || aluno.log;
  const periodoAluno = aluno.periodoAluno;
  const possuiStatus = typeof aluno.ativo === "boolean";

  const listaEstudos = Array.isArray(documentos?.estudosCaso)
    ? documentos.estudosCaso
    : [];

  const listaPlanos = Array.isArray(documentos?.planosAcao)
    ? documentos.planosAcao
    : [];

  const listaPeis = Array.isArray(documentos?.peis) ? documentos.peis : [];

  function renderizarEstudosCaso() {
    if (loadings.estudosCaso) {
      return (
        <p className="planejamento-mensagem">Carregando estudos de caso...</p>
      );
    }

    if (errors.estudosCaso) {
      return (
        <p className="planejamento-erro">
          Erro ao carregar os estudos de caso:{" "}
          {errors.estudosCaso.detail ||
            errors.estudosCaso.message ||
            String(errors.estudosCaso)}
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
            estudo.idEstudoCaso ??
            `${matricula}-${index}`;

          const titulo = idEstudo
            ? `Estudo de Caso #${idEstudo.toString().slice(-6)}`
            : `Estudo de Caso #${index + 1}`;

          const expandido = estudosExpandidos.includes(idEstudo);
          const painelId = `estudo-caso-${idEstudo}`;

          const dataCriacao = estudo.checklistApoios?.data || estudo.createdAt;

          const status = estudo.status || estudo.situacaoEstudoDeCaso;

          return (
            <article
              className="planejamento-estudo planejamento-plano-acao"
              key={idEstudo}
            >
              <div className="planejamento-estudo-cabecalho planejamento-plano-acao-cabecalho">
                <button
                  type="button"
                  className="planejamento-estudo-toggle planejamento-plano-acao-toggle"
                  onClick={() => alternarEstudo(idEstudo)}
                  aria-expanded={expandido}
                  aria-controls={painelId}
                >
                  <span
                    className="planejamento-estudo-icone planejamento-plano-acao-icone"
                    aria-hidden="true"
                  >
                    EC
                  </span>

                  <span className="planejamento-estudo-resumo planejamento-plano-acao-resumo">
                    <strong>{titulo}</strong>

                    <span className="planejamento-estudo-metadados">
                      {dataCriacao
                        ? `Data do estudo: ${formatarData(dataCriacao)}`
                        : "Data do estudo não informada"}
                      {status ? ` · ${status}` : ""}
                    </span>
                  </span>

                  <span
                    className={`planejamento-estudo-seta planejamento-plano-acao-seta ${
                      expandido ? "expandido" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>

                {expandido && (
                  <button
                    type="button"
                    className="planejamento-estudo-editar planejamento-plano-acao-editar"
                    title="Editar estudo de caso"
                    aria-label={`Editar ${titulo}`}
                    disabled={!onEditarEstudoCaso}
                    onClick={(evento) => {
                      evento.stopPropagation();
                      onEditarEstudoCaso?.(estudo);
                    }}
                  >
                    <img src={EditImg} alt="" />
                    <span>Editar</span>
                  </button>
                )}
              </div>

              <div
                className="planejamento-estudo-conteudo planejamento-plano-acao-conteudo"
                id={painelId}
                hidden={!expandido}
              >
                {expandido && (
                  <EstudoCasoView dados={estudo} onEdit={onEditarEstudoCaso} />
                )}
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  function renderizarPlanosAcao() {
    if (loadings.planosAcao) {
      return (
        <p className="planejamento-mensagem">Carregando Planos de Ação...</p>
      );
    }

    if (errors.planosAcao) {
      return (
        <p className="planejamento-erro">
          Erro ao carregar os Planos de Ação:{" "}
          {errors.planosAcao.detail ||
            errors.planosAcao.message ||
            String(errors.planosAcao)}
        </p>
      );
    }

    if (listaPlanos.length === 0) {
      return (
        <div className="planejamento-vazio">
          <div className="planejamento-vazio-icone">+</div>
          <h3>Nenhum Plano de Ação cadastrado</h3>
          <p>
            Os Planos de Ação deste aluno aparecerão aqui depois de serem
            cadastrados.
          </p>

          {onNovoPlanoAcao && (
            <button
              type="button"
              className="planejamento-botao-principal"
              onClick={onNovoPlanoAcao}
            >
              Criar Plano de Ação
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="planejamento-lista-planos">
        {listaPlanos.map((plano, index) => {
          const idPlano =
            plano.id ??
            plano._id ??
            plano.planoAcaoId ??
            `${matricula}-${index}`;

          const titulo = idPlano
            ? `Plano de Ação #${idPlano.toString().slice(-6)}`
            : `Plano de Ação #${index + 1}`;

          const expandido = planosExpandidos.includes(idPlano);
          const painelId = `plano-acao-${idPlano}`;

          return (
            <article className="planejamento-plano-acao" key={idPlano}>
              <div className="planejamento-plano-acao-cabecalho">
                <button
                  type="button"
                  className="planejamento-plano-acao-toggle"
                  onClick={() => alternarPlano(idPlano)}
                  aria-expanded={expandido}
                  aria-controls={painelId}
                >
                  <span
                    className="planejamento-plano-acao-icone"
                    aria-hidden="true"
                  >
                    PA
                  </span>

                  <span className="planejamento-plano-acao-resumo">
                    <strong>{titulo}</strong>

                    <span>
                      {plano.dataPlano
                        ? `Data do plano: ${formatarData(plano.dataPlano)}`
                        : "Data do plano não informada"}
                      {" · "}
                      Situação:{" "}
                      {exibir(plano.statusAtivo ? "Ativo" : "Inativo")}
                    </span>
                  </span>

                  <span
                    className={`planejamento-plano-acao-seta ${
                      expandido ? "expandido" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>

                {expandido && (
                  <button
                    type="button"
                    className="planejamento-estudo-editar planejamento-plano-acao-editar"
                    title="Editar Plano de Ação"
                    aria-label="Editar Plano de Ação"
                    disabled={!onEditarPlanoAcao}
                    onClick={(evento) => {
                      evento.stopPropagation();
                      onEditarPlanoAcao?.(plano);
                    }}
                  >
                    <img src={EditImg} alt="" />
                    <span>Editar</span>
                  </button>
                )}
              </div>

              <div
                className="planejamento-plano-acao-conteudo"
                id={painelId}
                hidden={!expandido}
              >
                {expandido && (
                  <PlanoAcaoView plano={plano} onEdit={onEditarPlanoAcao} />
                )}
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  function renderizarPeis() {
    if (loadings.peis) {
      return (
        <p className="planejamento-mensagem">
          Carregando Planos de Ensino Individualizado...
        </p>
      );
    }

    if (errors.peis) {
      return (
        <p className="planejamento-erro">
          Erro ao carregar os PEIs:{" "}
          {errors.peis.detail || errors.peis.message || String(errors.peis)}
        </p>
      );
    }

    if (listaPeis.length === 0) {
      return (
        <div className="planejamento-vazio">
          <div className="planejamento-vazio-icone">+</div>
          <h3>Nenhum PEI cadastrado</h3>
          <p>
            Os Planos de Ensino Individualizado deste aluno aparecerão aqui
            depois de serem cadastrados.
          </p>

          {onNovoPei && (
            <button
              type="button"
              className="planejamento-botao-principal"
              onClick={onNovoPei}
            >
              Criar PEI
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="planejamento-lista-planos planejamento-lista-peis">
        {listaPeis.map((pei, index) => {
          const identificadorPei = pei?.id ?? pei?._id;
          const idPei = identificadorPei ?? `${matricula}-pei-${index}`;

          const expandido = peisExpandidos.includes(idPei);
          const painelId = `pei-${idPei}`;

          const titulo =
            identificadorPei != null
              ? `Plano de Ensino Individualizado #${identificadorPei.toString().slice(-6)}`
              : `Plano de Ensino Individualizado #${index + 1}`;

          // Busca os PEAs vinculados ao PEI atual.
          const listaPeas =
            identificadorPei != null
              ? (getPeas({
                  page: 0,
                  size: 100,
                  filters: { peiId: identificadorPei },
                })?.content ?? [])
              : [];

          return (
            <article
              className="planejamento-plano-acao planejamento-pei-item"
              key={idPei}
            >
              <div className="planejamento-plano-acao-cabecalho">
                <button
                  type="button"
                  className="planejamento-plano-acao-toggle"
                  onClick={() => alternarPei(idPei)}
                  aria-expanded={expandido}
                  aria-controls={painelId}
                >
                  <span
                    className="planejamento-plano-acao-icone"
                    aria-hidden="true"
                  >
                    PEI
                  </span>

                  <span className="planejamento-plano-acao-resumo">
                    <strong>{titulo}</strong>

                    <span>
                      Período: {exibir(pei.periodoPei)}
                      {" · "}
                      Situação: {exibir(pei.statusAtivo ? "Ativo" : "Inativo")}
                    </span>
                  </span>

                  <span
                    className={`planejamento-plano-acao-seta ${
                      expandido ? "expandido" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>
              </div>

              <div
                className="planejamento-plano-acao-conteudo planejamento-pei-conteudo"
                id={painelId}
                hidden={!expandido}
              >
                {expandido && (
                  <div className="planejamento-pei-detalhes">
                    <PeiView dados={pei} onEdit={onEditarPei} />

                    <div className="planejamento-lista-header">
                      <div>
                        <h2>Planos de Ensino e Aprendizagem</h2>
                        <p>
                          Consulte os PEAs vinculados a este Plano de Ensino
                          Individualizado.
                        </p>
                      </div>

                      <span className="planejamento-contador">
                        {listaPeas.length}{" "}
                        {listaPeas.length === 1 ? "registro" : "registros"}
                      </span>
                    </div>

                    {listaPeas.length === 0 ? (
                      <p className="planejamento-mensagem">
                        Nenhum Plano de Ensino e Aprendizagem cadastrado para
                        este PEI.
                      </p>
                    ) : (
                      <div className="planejamento-lista-peas">
                        {listaPeas.map((pea, peaIndex) => {
                          const identificadorPea = pea?.id ?? pea?._id;

                          const idPea =
                            identificadorPea ?? `${idPei}-pea-${peaIndex}`;

                          const tituloPea =
                            pea.componenteCurricular ||
                            `Plano de Ensino e Aprendizagem #${peaIndex + 1}`;

                          const peaExpandido = peasExpandidos.includes(idPea);

                          const painelPeaId = `pea-${idPea}`;

                          // Busca somente os RAIs associados ao PEA atual.
                          const listaRais =
                            identificadorPea != null
                              ? (getRais({
                                  page: 0,
                                  size: 100,
                                  filters: { peaId: identificadorPea },
                                })?.content ?? [])
                              : [];

                          return (
                            <article
                              className="planejamento-pea-item"
                              key={idPea}
                            >
                              <div className="planejamento-pea-cabecalho">
                                <button
                                  type="button"
                                  className="planejamento-pea-toggle"
                                  onClick={() => alternarPea(idPea)}
                                  aria-expanded={peaExpandido}
                                  aria-controls={painelPeaId}
                                >
                                  <span
                                    className="planejamento-pea-icone"
                                    aria-hidden="true"
                                  >
                                    PEA
                                  </span>

                                  <span className="planejamento-pea-resumo">
                                    <strong>{tituloPea}</strong>

                                    <span>
                                      Período: {exibir(pea.semestreAno)}
                                      {" · "}
                                      Docente: {exibir(pea.docente)}
                                    </span>
                                  </span>

                                  <span
                                    className={`planejamento-pea-seta ${
                                      peaExpandido ? "expandido" : ""
                                    }`}
                                    aria-hidden="true"
                                  >
                                    ⌄
                                  </span>
                                </button>
                              </div>

                              <div
                                className="planejamento-pea-conteudo"
                                id={painelPeaId}
                                hidden={!peaExpandido}
                              >
                                {peaExpandido && (
                                  <>
                                    <div className="planejamento-pea-dados">
                                      <div className="planejamento-pea-campo">
                                        <span>Componente curricular</span>
                                        <p>
                                          {exibir(pea.componenteCurricular)}
                                        </p>
                                      </div>

                                      <div className="planejamento-pea-campo">
                                        <span>Período letivo</span>
                                        <p>{exibir(pea.semestreAno)}</p>
                                      </div>

                                      <div className="planejamento-pea-campo">
                                        <span>Docente</span>
                                        <p>{exibir(pea.docente)}</p>
                                      </div>
                                    </div>

                                    <div className="planejamento-pea-detalhes">
                                      <div className="planejamento-pea-campo">
                                        <span>Objetivo geral</span>
                                        <p>{exibir(pea.objetivoGeral)}</p>
                                      </div>

                                      <div className="planejamento-pea-campo">
                                        <span>Objetivos específicos</span>
                                        <p>
                                          {exibir(pea.objetivosEspecificos)}
                                        </p>
                                      </div>

                                      <div className="planejamento-pea-campo">
                                        <span>Conteúdos programáticos</span>
                                        <p>
                                          {exibir(pea.conteudosProgramaticos)}
                                        </p>
                                      </div>

                                      <div className="planejamento-pea-campo">
                                        <span>Metodologia</span>
                                        <p>{exibir(pea.metodologia)}</p>
                                      </div>

                                      <div className="planejamento-pea-campo">
                                        <span>Avaliação</span>
                                        <p>{exibir(pea.avaliacao)}</p>
                                      </div>

                                      <div className="planejamento-pea-campo">
                                        <span>Bibliografia básica</span>
                                        <p>{exibir(pea.bibliografiaBasica)}</p>
                                      </div>

                                      <div className="planejamento-pea-campo">
                                        <span>Bibliografia complementar</span>
                                        <p>
                                          {exibir(pea.bibliografiaComplementar)}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="planejamento-rai-container">
                                      <div className="planejamento-lista-header">
                                        <div>
                                          <h2>
                                            Relatórios de Acompanhamento
                                            Individualizado
                                          </h2>
                                          <p>
                                            Consulte os RAIs associados a este
                                            PEA.
                                          </p>
                                        </div>

                                        <span className="planejamento-contador">
                                          {listaRais.length}{" "}
                                          {listaRais.length === 1
                                            ? "registro"
                                            : "registros"}
                                        </span>
                                      </div>

                                      {listaRais.length === 0 ? (
                                        <p className="planejamento-mensagem">
                                          Nenhum Relatório de Acompanhamento
                                          Individualizado cadastrado para este
                                          PEA.
                                        </p>
                                      ) : (
                                        <div className="planejamento-lista-rais">
                                          {listaRais.map((rai, raiIndex) => {
                                            const identificadorRai =
                                              rai?.id ?? rai?._id;

                                            const idRai =
                                              identificadorRai ??
                                              `${idPea}-rai-${raiIndex}`;

                                            const raiExpandido =
                                              raisExpandidos.includes(idRai);

                                            const painelRaiId = `rai-${idRai}`;

                                            return (
                                              <article
                                                className="planejamento-rai-item"
                                                key={idRai}
                                              >
                                                <div className="planejamento-rai-cabecalho">
                                                  <button
                                                    type="button"
                                                    className="planejamento-rai-toggle"
                                                    onClick={() =>
                                                      alternarRai(idRai)
                                                    }
                                                    aria-expanded={raiExpandido}
                                                    aria-controls={painelRaiId}
                                                  >
                                                    <span
                                                      className="planejamento-rai-icone"
                                                      aria-hidden="true"
                                                    >
                                                      RAI
                                                    </span>

                                                    <span className="planejamento-rai-resumo">
                                                      <strong>
                                                        {`Relatório de Acompanhamento #${raiIndex + 1}`}
                                                      </strong>

                                                      <span>
                                                        Data:{" "}
                                                        {formatarData(rai.data)}
                                                      </span>
                                                    </span>

                                                    <span
                                                      className={`planejamento-rai-seta ${
                                                        raiExpandido
                                                          ? "expandido"
                                                          : ""
                                                      }`}
                                                      aria-hidden="true"
                                                    >
                                                      ⌄
                                                    </span>
                                                  </button>
                                                </div>

                                                <div
                                                  className="planejamento-rai-conteudo"
                                                  id={painelRaiId}
                                                  hidden={!raiExpandido}
                                                >
                                                  {raiExpandido && (
                                                    <RaiView
                                                      dados={rai}
                                                      onEdit={
                                                        onEditarRai
                                                          ? () =>
                                                              onEditarRai(
                                                                rai,
                                                                pei,
                                                                pea,
                                                                aluno,
                                                              )
                                                          : undefined
                                                      }
                                                    />
                                                  )}
                                                </div>
                                              </article>
                                            );
                                          })}
                                        </div>
                                      )}

                                      <button
                                        type="button"
                                        className="planejamento-botao-principal"
                                        disabled={
                                          !onNovoRai || identificadorPea == null
                                        }
                                        onClick={() =>
                                          onNovoRai?.(pei, pea, aluno)
                                        }
                                      >
                                        <span aria-hidden="true">+</span>
                                        Adicionar RAI
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    )}

                    <button
                      type="button"
                      className="planejamento-botao-principal"
                      disabled={!onNovoPea || identificadorPei == null}
                      onClick={() => onNovoPea?.(pei, aluno)}
                    >
                      <span aria-hidden="true">+</span>
                      Adicionar PEA
                    </button>
                  </div>
                )}
              </div>
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

        {abaAtiva === "estudo-caso" && onNovoEstudoCaso && (
          <button
            type="button"
            className="planejamento-botao-principal"
            onClick={onNovoEstudoCaso}
          >
            <span aria-hidden="true">+</span>
            Novo estudo de caso
          </button>
        )}

        {abaAtiva === "plano-acao" && onNovoPlanoAcao && (
          <button
            type="button"
            className="planejamento-botao-principal"
            onClick={onNovoPlanoAcao}
          >
            <span aria-hidden="true">+</span>
            Novo Plano de Ação
          </button>
        )}

        {abaAtiva === "pei" && onNovoPei && (
          <button
            type="button"
            className="planejamento-botao-principal"
            onClick={onNovoPei}
          >
            <span aria-hidden="true">+</span>
            Novo PEI
          </button>
        )}
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
        <div
          className="planejamento-abas"
          role="tablist"
          aria-label="Documentos do planejamento do aluno"
        >
          {ABAS_PLANEJAMENTO.map((aba) => (
            <button
              type="button"
              role="tab"
              key={aba.id}
              id={`aba-${aba.id}`}
              aria-controls={`painel-${aba.id}`}
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

          {abaAtiva === "pei" && (
            <>
              <div className="planejamento-lista-header">
                <div>
                  <h2>Planos de Ensino Individualizado</h2>
                  <p>
                    Consulte os PEIs cadastrados para este aluno e abra um
                    registro para visualizar suas informações.
                  </p>
                </div>

                <span className="planejamento-contador">
                  {listaPeis.length}{" "}
                  {listaPeis.length === 1 ? "registro" : "registros"}
                </span>
              </div>

              {renderizarPeis()}
            </>
          )}

          {abaAtiva === "plano-acao" && (
            <>
              <div className="planejamento-lista-header">
                <div>
                  <h2>Planos de Ação</h2>
                  <p>
                    Consulte as informações clínicas, necessidades e propostas
                    de intervenção do aluno.
                  </p>
                </div>

                <span className="planejamento-contador">
                  {listaPlanos.length}{" "}
                  {listaPlanos.length === 1 ? "registro" : "registros"}
                </span>
              </div>

              {renderizarPlanosAcao()}
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
