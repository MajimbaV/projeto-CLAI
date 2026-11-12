import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import "./EstudoCasoView.css";

// --- Funções Auxiliares ---
const formatarData = (data) => {
  if (!data) return "Não informada";
  const partes = data.split("-");
  if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
  return data;
};

const formatarEnum = (texto) => {
  if (!texto) return "";
  return texto
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const ValorNulo = () => <span className="estudo-view-valor-vazio">Não informado</span>;

// Componente para exibir um campo de texto/dado simples
const CampoExibicao = ({ label, valor, largo = false }) => (
  <div className={`estudo-view-campo ${largo ? "estudo-view-campo-largo" : ""}`}>
    <span className="estudo-view-label">{label}</span>
    <div className="estudo-view-valor">
      {valor ? valor : <ValorNulo />}
    </div>
  </div>
);

// Componente para exibir Arrays (Listas e Tags)
const ListaExibicao = ({ label, itens, tipo = "lista", formatEnum = false, largo = false }) => {
  const itensValidos = Array.isArray(itens) ? itens.filter(Boolean) : [];
  
  return (
    <div className={`estudo-view-campo ${largo ? "estudo-view-campo-largo" : ""}`}>
      <span className="estudo-view-label">{label}</span>
      <div className="estudo-view-valor">
        {itensValidos.length === 0 ? (
          <ValorNulo />
        ) : tipo === "tags" ? (
          <div className="estudo-view-tags">
            {itensValidos.map((item, i) => (
              <span key={i} className="estudo-view-tag">
                {formatEnum ? formatarEnum(item) : item}
              </span>
            ))}
          </div>
        ) : (
          <ul className="estudo-view-lista">
            {itensValidos.map((item, i) => (
              <li key={i}>{formatEnum ? formatarEnum(item) : item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Componente da Sanfona (Accordion)
const SecaoSanfona = ({ titulo, children, padraoAberto = false }) => {
  const [aberta, setAberta] = useState(padraoAberto);

  return (
    <section className="estudo-view-section">
      <button
        type="button"
        className="estudo-view-section-toggle"
        onClick={() => setAberta(!aberta)}
        aria-expanded={aberta}
      >
        <span className="estudo-view-section-title">{titulo}</span>
        <span className={`estudo-view-section-chevron ${aberta ? "expandido" : ""}`}>
          ▼
        </span>
      </button>
      {aberta && (
        <div className="estudo-view-section-panel">
          {children}
        </div>
      )}
    </section>
  );
};

// --- Componente Principal ---
export default function EstudoCasoView({ dados, onEdit }) {
  if (!dados) return <p>Nenhum dado encontrado.</p>;

  // Garantindo fallback para {} usando || {} para lidar com valores null vindos da API
  const identificacao = dados.identificacao || {};
  const motivoDemanda = dados.motivoDemanda || {};
  const necessidadesEspecificas = dados.necessidadesEspecificas || {};
  const anamnese = dados.anamnese || {};
  const perfilEstudante = dados.perfilEstudante || {};
  const contextoPsicossocial = dados.contextoPsicossocial || {};
  const potencialidades = dados.potencialidades || {};
  const necessidadesEducacionais = dados.necessidadesEducacionais || {};
  const sintesePsicopedagogica = dados.sintesePsicopedagogica || {};
  const checklistApoios = dados.checklistApoios || {};
  const situacaoEstudoDeCaso = dados.situacaoEstudoDeCaso;

  const aluno = identificacao.aluno || {};

  return (
    <div className="estudo-view-container">
      {/* Cabeçalho / Metadados */}
      <div className="estudo-view-metadados">
        <div className="estudo-view-metadados-grupo">
          <div className="estudo-view-metadado-item">
            <span className="estudo-view-metadado-label">Estudante</span>
            <span className="estudo-view-metadado-valor">{aluno.alunoNome || "N/A"}</span>
          </div>
          <div className="estudo-view-metadado-item">
            <span className="estudo-view-metadado-label">Matrícula</span>
            <span className="estudo-view-metadado-valor">{aluno.alunoMatricula || "N/A"}</span>
          </div>
          <div className="estudo-view-metadado-item">
            <span className="estudo-view-metadado-label">Curso</span>
            <span className="estudo-view-metadado-valor">{aluno.alunoCurso || "N/A"}</span>
          </div>
        </div>

        <div className="estudo-view-metadados-grupo">
          <div className="estudo-view-metadado-item" style={{ alignItems: "flex-end" }}>
            <span className="estudo-view-metadado-label">Situação do Documento</span>
            <span className={`estudo-view-badge-situacao ${situacaoEstudoDeCaso === "VALIDO" ? "valido" : "arquivado"}`}>
              {situacaoEstudoDeCaso || "NÃO INFORMADO"}
            </span>
          </div>
        </div>
      </div>

      {/* 1. Identificação Adicional */}
      <SecaoSanfona titulo="1. Dados do Atendimento e Responsáveis" padraoAberto>
        <div className="estudo-view-grid">
          <ListaExibicao label="Data(s) da Anamnese" itens={identificacao.datasAnamnese} tipo="tags" />
          <CampoExibicao label="Profissional Responsável" valor={identificacao.nomeProfissional} />
          <CampoExibicao label="Nome do Responsável Familiar" valor={aluno.nomeResponsavel} />
          <CampoExibicao label="Parentesco / Contato" valor={`${aluno.grauParentesco || ""} ${aluno.responsavelTelefone ? `(${aluno.responsavelTelefone})` : ""}`} />
        </div>
      </SecaoSanfona>

      {/* 2. Motivo da Demanda */}
      <SecaoSanfona titulo="2. Motivo do Encaminhamento e Demanda">
        <div className="estudo-view-grid">
          <CampoExibicao label="Origem do Encaminhamento" valor={motivoDemanda?.origemEncaminhamento} />
          <CampoExibicao label="Outra Origem" valor={motivoDemanda?.outroOrigemEncaminhamento} />
          <CampoExibicao label="Motivo Principal" valor={motivoDemanda?.motivoPrincipal} largo />
          <CampoExibicao label="Demanda do Estudante" valor={motivoDemanda?.demandaDoEstudante} largo />
          <CampoExibicao label="Demanda do Responsável" valor={motivoDemanda?.demandaDoResponsavel} largo />
          <CampoExibicao label="Demanda da Equipe Escolar" valor={motivoDemanda?.demandaEquipeEscolar} largo />
        </div>
      </SecaoSanfona>

      {/* 3. Necessidades Específicas */}
      <SecaoSanfona titulo="3. Necessidades Específicas e Documentação">
        <div className="estudo-view-grid">
          <CampoExibicao label="Necessidade Informada" valor={necessidadesEspecificas.necessidadeInformada} largo />
          <ListaExibicao label="Diagnósticos" itens={necessidadesEspecificas.diagnosticos} tipo="tags" largo />
          
          <CampoExibicao 
            label="Documentos Apresentados" 
            valor={necessidadesEspecificas.documentos?.map(d => `${d.descricao} (${formatarData(d.data)} - ${d.profissional})`).join('\n')} 
            largo 
          />
          
          <ListaExibicao label="Condições Associadas" itens={necessidadesEspecificas.condicoesAssociadas} tipo="tags" />
          <ListaExibicao label="Medicações Contínuas" itens={necessidadesEspecificas.medicacoesContinuas} tipo="tags" />
          
          <CampoExibicao label="Encaminhamentos Anteriores" valor={necessidadesEspecificas.encaminhamentosAnteriores} largo />
          <CampoExibicao label="Serviços de Apoio (Atuais/Anteriores)" valor={necessidadesEspecificas.servicosApoioAtuaisAnteriores} largo />
        </div>
      </SecaoSanfona>

      {/* 4. Anamnese */}
      <SecaoSanfona titulo="4. Anamnese (Histórico Escolar)">
        <div className="estudo-view-grid">
          <CampoExibicao label="Histórico Escolar" valor={anamnese.historicoEscolar} largo />
          <CampoExibicao label="Experiências Positivas" valor={anamnese.experienciasEscolaresPositivas} largo />
          <CampoExibicao label="Experiências Negativas (Barreiras)" valor={anamnese.experienciasEscolaresNegativas} largo />
          <CampoExibicao label="Adaptações e Recursos Utilizados" valor={anamnese.adaptacoesRecursosEResultados} largo />
          <CampoExibicao label="Objetivos/Conhecimentos Consolidados" valor={anamnese.objetivosConhecimentosConsolidados} largo />
          <ListaExibicao label="Áreas/Disciplinas de Facilidade" itens={anamnese.areasDisciplinasFacilidade} tipo="lista" />
          <ListaExibicao label="Áreas/Disciplinas de Dificuldade" itens={anamnese.areasDisciplinasDificuldade} tipo="lista" />
        </div>
      </SecaoSanfona>

      {/* 5. Perfil do Estudante */}
      <SecaoSanfona titulo="5. Perfil de Aprendizagem e Participação">
        <div className="estudo-view-grid">
          <CampoExibicao label="Comunicação e Compreensão" valor={perfilEstudante.comunicacaoCompreensaoOrientacoes} />
          <CampoExibicao label="Leitura, Escrita e Linguagem" valor={perfilEstudante.leituraEscritaLinguagem} />
          <CampoExibicao label="Raciocínio Lógico-Matemático" valor={perfilEstudante.raciocinioLogicoMatematico} />
          <CampoExibicao label="Atenção, Memória e Funções Executivas" valor={perfilEstudante.atencaoMemoriaFuncoesExecutivas} />
          <CampoExibicao label="Organização e Realização de Tarefas" valor={perfilEstudante.organizacaoPlanejamentoRealizacaoTarefas} />
          <CampoExibicao label="Interação Social e Participação" valor={perfilEstudante.interacaoSocialParticipacaoSala} />
          <CampoExibicao label="Aspectos Sensoriais" valor={perfilEstudante.aspectosSensoriaisRelevantes} />
          <CampoExibicao label="Mobilidade e Acesso a Tecnologias" valor={perfilEstudante.mobilidadeAcessoTecnologiasRecursos} />
          <CampoExibicao label="Autonomia no Contexto Familiar" valor={perfilEstudante.autonomiaContextoFamiliar} />
          <CampoExibicao label="Autonomia no Contexto Escolar" valor={perfilEstudante.autonomiaContextoEscolar} />
          <CampoExibicao label="Estratégias que Favorecem Aprendizagem" valor={perfilEstudante.estrategiasQueFavorecemAprendizagem} largo />
          <CampoExibicao label="Situações que Dificultam Aprendizagem" valor={perfilEstudante.situacoesQueDificultamAprendizagem} largo />
        </div>
      </SecaoSanfona>

      {/* 6. Contexto Psicossocial */}
      <SecaoSanfona titulo="6. Contexto Psicossocial">
        <div className="estudo-view-grid">
          <CampoExibicao label="Relação com o Curso e Expectativas" valor={contextoPsicossocial.relacaoComCursoEExpectativas} largo />
          <CampoExibicao label="Rede de Apoio Familiar/Social" valor={contextoPsicossocial.redeApoioFamiliarSocial} largo />
          <CampoExibicao label="Conflitos ou Fatores Psicossociais" valor={contextoPsicossocial.conflitosOuFatoresPsicossociais} largo />
          <CampoExibicao label="Frequência, Rotina e Permanência" valor={contextoPsicossocial.observacoesFrequenciaRotinaPermanencia} largo />
        </div>
      </SecaoSanfona>

      {/* 7. Potencialidades */}
      <SecaoSanfona titulo="7. Potencialidades e Recursos">
        <div className="estudo-view-grid">
          <CampoExibicao label="Potencialidades Acadêmicas" valor={potencialidades.potencialidadesAcademicas} largo />
          <CampoExibicao label="Interesses e Habilidades" valor={potencialidades.interessesHabilidades} largo />
          <CampoExibicao label="Preferências de Aprendizagem" valor={potencialidades.formasPreferenciaisAprendizagemEDemonstracao} largo />
          <CampoExibicao label="Recursos Pessoais/Tecnológicos" valor={potencialidades.recursosQueFavorecemDesempenho} largo />
        </div>
      </SecaoSanfona>

      {/* 8. Barreiras */}
      <SecaoSanfona titulo="8. Barreiras Educacionais Identificadas">
        <div className="estudo-view-barreiras">
          {(!necessidadesEducacionais.barreiras || necessidadesEducacionais.barreiras.length === 0) ? (
            <ValorNulo />
          ) : (
            necessidadesEducacionais.barreiras.map((barreira, i) => (
              <div key={i} className="estudo-view-barreira-card">
                <div className="estudo-view-barreira-header">
                  <h4>{formatarEnum(barreira.dimensao)}</h4>
                  <span className={`estudo-view-prioridade ${barreira.prioridade?.toLowerCase()}`}>
                    Prioridade {formatarEnum(barreira.prioridade)}
                  </span>
                </div>
                <CampoExibicao label="Barreira / Necessidade" valor={barreira.barreiraNecessidade} />
                <CampoExibicao label="Evidências / Impactos" valor={barreira.evidenciasImpactos} />
              </div>
            ))
          )}
        </div>
      </SecaoSanfona>

      {/* 9. Síntese */}
      <SecaoSanfona titulo="9. Síntese Psicopedagógica">
        <div className="estudo-view-grid">
          <CampoExibicao label="Identificação de Necessidades Específicas" valor={sintesePsicopedagogica?.identificacaoNecessidadesEspecificas} largo />
          <CampoExibicao label="Avanços e Objetivos Alcançados" valor={sintesePsicopedagogica?.avancosObjetivosConhecimentosAlcancados} largo />
          <CampoExibicao label="Dificuldades/Barreiras" valor={sintesePsicopedagogica?.dificuldadesBarreirasComRepercussaoEducacional} largo />
          <CampoExibicao label="Potencialidades e Condições Facilitadoras" valor={sintesePsicopedagogica?.potencialidadesECondicoesFacilitadoras} largo />
          <CampoExibicao label="Principais Demandas Identificadas" valor={sintesePsicopedagogica?.principaisDemandasIdentificadasNoCaso} largo />
        </div>
      </SecaoSanfona>

      {/* 10. Checklist de Apoios */}
      <SecaoSanfona titulo="10. Checklist de Apoios e Assinaturas">
        <div className="estudo-view-grid">
          <ListaExibicao label="Acessibilidade e Ambiente" itens={checklistApoios.acessibilidadeAmbiente} formatEnum tipo="tags" />
          <CampoExibicao label="Outro (Acessibilidade)" valor={checklistApoios.acessibilidadeAmbienteOutro} />

          <ListaExibicao label="Comunicação e Materiais" itens={checklistApoios.comunicacaoMateriais} formatEnum tipo="tags" />
          <CampoExibicao label="Outro (Comunicação)" valor={checklistApoios.comunicacaoMateriaisOutro} />

          <ListaExibicao label="Metodologia" itens={checklistApoios.metodologia} formatEnum tipo="tags" />
          <CampoExibicao label="Outro (Metodologia)" valor={checklistApoios.metodologiaOutro} />

          <ListaExibicao label="Avaliação" itens={checklistApoios.avaliacao} formatEnum tipo="tags" />
          <CampoExibicao label="Outro (Avaliação)" valor={checklistApoios.avaliacaoOutro} />

          <ListaExibicao label="Currículo" itens={checklistApoios.curriculo} formatEnum tipo="tags" />
          <CampoExibicao label="Outro (Currículo)" valor={checklistApoios.curriculoOutro} />

          <ListaExibicao label="Apoios Institucionais" itens={checklistApoios.apoiosInstitucionais} formatEnum tipo="tags" />
          <CampoExibicao label="Outro (Institucionais)" valor={checklistApoios.apoioInstitucionalOutro} />
        </div>

        <div className="estudo-view-grid" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <CampoExibicao label="Encaminhamentos Externos" valor={checklistApoios.apoiosExternosEncaminhamentos} largo />
          <CampoExibicao label="Psicopedagogo(a) Responsável" valor={checklistApoios.psicopedagogoResponsavel} />
          <CampoExibicao label="Coordenador(a) Responsável" valor={checklistApoios.coordenadorResponsavel} />
          <CampoExibicao label="Data de Finalização" valor={formatarData(checklistApoios.data)} />
        </div>
      </SecaoSanfona>


      {typeof onEdit === "function" && (
        <div className="estudo-view-rodape">
          <button
            type="button"
            className="estudo-view-btn-editar"
            onClick={() => onEdit(dados)}
          >
            <HiOutlinePencilAlt className="action-icon" />
            <span>Editar este Estudo de Caso</span>
          </button>
        </div>
      )}
    </div>
  );
}