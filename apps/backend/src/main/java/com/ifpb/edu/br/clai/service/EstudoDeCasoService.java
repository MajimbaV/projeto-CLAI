package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.AlunoResponseDto;
import com.ifpb.edu.br.clai.dto.estudodecaso.response.EstudoDeCasoResponseDto;
import com.ifpb.edu.br.clai.dto.estudodecaso.request.create.*;
import com.ifpb.edu.br.clai.exception.FieldValidationException;
import com.ifpb.edu.br.clai.mapper.EstudoDeCasoMapper;
import com.ifpb.edu.br.clai.model.Aluno;
import com.ifpb.edu.br.clai.model.estudodecaso.EstudoDeCaso;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.DimensaoNecessidadeEducacional;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.OrigemEncaminhamento;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.StatusEstudoDeCaso;
import com.ifpb.edu.br.clai.repository.EstudoDeCasoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class EstudoDeCasoService {

    private final EstudoDeCasoRepository estudoDeCasoRepository;
    private final AlunoService alunoService;

    public EstudoDeCasoService(EstudoDeCasoRepository estudoDeCasoRepository, AlunoService alunoService) {
        this.estudoDeCasoRepository = estudoDeCasoRepository;
        this.alunoService = alunoService;
    }

    public EstudoDeCasoResponseDto createEstudoDeCaso(EstudoDeCasoRequestDto dto) {
        validarRegras(dto);

        Aluno aluno = dto.identificacao() != null && dto.identificacao().alunoId() != null
                ? alunoService.buscarOuFalhar(dto.identificacao().alunoId())
                : null;
        EstudoDeCaso estudoDeCaso = EstudoDeCasoMapper.requestToEntity(prepararParaMapeamento(dto), aluno);
        EstudoDeCaso estudoDeCasoSalvo = estudoDeCasoRepository.save(estudoDeCaso);
        return EstudoDeCasoMapper.entityToResponse(estudoDeCasoSalvo);
    }

    @Transactional
    public EstudoDeCasoResponseDto createEstudoDeCasoCombinado(CadastroCombinadoRequestDto dto){
        AlunoResponseDto alunoSalvo = alunoService.createAluno(dto.aluno());

        Aluno novoAluno = alunoService.buscarOuFalhar(alunoSalvo.id());
        EstudoDeCaso estudoDeCaso = EstudoDeCasoMapper.requestToEntity(prepararParaMapeamento(dto.estudoDeCaso()), novoAluno);
        EstudoDeCaso estudoDeCasoSalvo = estudoDeCasoRepository.save(estudoDeCaso);
        return EstudoDeCasoMapper.entityToResponse(estudoDeCasoSalvo);
    }

    private EstudoDeCasoRequestDto prepararParaMapeamento(EstudoDeCasoRequestDto dto) {
        return new EstudoDeCasoRequestDto(
                dto.identificacao() != null ? dto.identificacao() : new IdentificacaoRequestDto(null, null, null),
                dto.motivoDemanda() != null ? dto.motivoDemanda() : new MotivoDemandaRequestDto(null, null, null, null, null, null, null),
                dto.necessidadesEspecificas() != null ? dto.necessidadesEspecificas()
                        : new NecessidadesEspecificasRequestDto(null, null, null, null, null, null, null),
                dto.anamnese() != null ? dto.anamnese() : new AnamneseRequestDto(null, null, null, null, null, null, null),
                dto.perfilEstudante() != null ? dto.perfilEstudante()
                        : new PerfilEstudanteRequestDto(null, null, null, null, null, null, null, null, null, null, null, null),
                dto.contextoPsicossocial() != null ? dto.contextoPsicossocial()
                        : new ContextoPsicossocialRequestDto(null, null, null, null),
                dto.potencialidades() != null ? dto.potencialidades() : new PotencialidadesRequestDto(null, null, null, null),
                dto.necessidadesEducacionais() != null ? dto.necessidadesEducacionais()
                        : new NecessidadesEducacionaisRequestDto(null),
                dto.sintesePsicopedagogica() != null ? dto.sintesePsicopedagogica()
                        : new SintesePsicopedagogicaRequestDto(null, null, null, null, null),
                dto.checklistApoios() != null ? dto.checklistApoios()
                        : new ChecklistApoiosRequestDto(null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null),
                dto.statusEstudoDeCaso()
        );
    }

    private void validarRegras(EstudoDeCasoRequestDto dto) {
        Map<String, String> errors = new LinkedHashMap<>();
        if (dto == null) {
            errors.put("request", "O corpo da requisição é obrigatório.");
            throw new FieldValidationException(errors);
        }

        if (dto.statusEstudoDeCaso() == null) {
            errors.put("statusEstudoDeCaso", "O status do estudo de caso é obrigatório.");
        }

        validarOrigemOutro(dto.motivoDemanda(), errors);
        validarNecessidadesEducacionais(dto.necessidadesEducacionais(), errors);

        if (dto.statusEstudoDeCaso() == StatusEstudoDeCaso.COMPLETO) {
            validarEstudoCompleto(dto, errors);
        }

        if (!errors.isEmpty()) {
            throw new FieldValidationException(errors);
        }
    }

    private void validarEstudoCompleto(EstudoDeCasoRequestDto dto, Map<String, String> errors) {
        IdentificacaoRequestDto identificacao = dto.identificacao();
        if (identificacao == null) {
            required(errors, "identificacao");
        } else {
            required(errors, "identificacao.alunoId", identificacao.alunoId());
            requiredList(errors, "identificacao.datasAnamnese", identificacao.datasAnamnese());
            requiredText(errors, "identificacao.nomeProfissional", identificacao.nomeProfissional());
        }

        MotivoDemandaRequestDto motivo = dto.motivoDemanda();
        if (motivo == null) {
            required(errors, "motivoDemanda");
        } else {
            required(errors, "motivoDemanda.origemEncaminhamento", motivo.origemEncaminhamento());
            requiredText(errors, "motivoDemanda.motivoPrincipal", motivo.motivoPrincipal());
            requiredText(errors, "motivoDemanda.demandaDoEstudante", motivo.demandaDoEstudante());
            requiredText(errors, "motivoDemanda.demandaDoProfissional", motivo.demandaDoProfissional());
            requiredText(errors, "motivoDemanda.demandaDoResponsavel", motivo.demandaDoResponsavel());
            requiredText(errors, "motivoDemanda.demandaEquipeEscolar", motivo.demandaEquipeEscolar());
        }

        NecessidadesEspecificasRequestDto necessidades = dto.necessidadesEspecificas();
        if (necessidades == null) {
            required(errors, "necessidadesEspecificas");
        } else {
            requiredText(errors, "necessidadesEspecificas.necessidadeInformada", necessidades.necessidadeInformada());
            validarDocumentosComprobatorios(necessidades, errors);
            requiredText(errors, "necessidadesEspecificas.encaminhamentosAnteriores", necessidades.encaminhamentosAnteriores());
            requiredText(errors, "necessidadesEspecificas.servicosApoioAtuaisAnteriores", necessidades.servicosApoioAtuaisAnteriores());
        }

        AnamneseRequestDto anamnese = dto.anamnese();
        if (anamnese == null) {
            required(errors, "anamnese");
        } else {
            requiredText(errors, "anamnese.historicoEscolar", anamnese.historicoEscolar());
            requiredText(errors, "anamnese.experienciasEscolaresPositivas", anamnese.experienciasEscolaresPositivas());
            requiredText(errors, "anamnese.experienciasEscolaresNegativas", anamnese.experienciasEscolaresNegativas());
            requiredText(errors, "anamnese.adaptacoesRecursosEResultados", anamnese.adaptacoesRecursosEResultados());
            requiredText(errors, "anamnese.objetivosConhecimentosConsolidados", anamnese.objetivosConhecimentosConsolidados());
            requiredList(errors, "anamnese.areasDisciplinasFacilidade", anamnese.areasDisciplinasFacilidade());
            requiredList(errors, "anamnese.areasDisciplinasDificuldade", anamnese.areasDisciplinasDificuldade());
        }

        PerfilEstudanteRequestDto perfil = dto.perfilEstudante();
        if (perfil == null) {
            required(errors, "perfilEstudante");
        } else {
            requiredText(errors, "perfilEstudante.comunicacaoCompreensaoOrientacoes", perfil.comunicacaoCompreensaoOrientacoes());
            requiredText(errors, "perfilEstudante.leituraEscritaLinguagem", perfil.leituraEscritaLinguagem());
            requiredText(errors, "perfilEstudante.raciocinioLogicoMatematico", perfil.raciocinioLogicoMatematico());
            requiredText(errors, "perfilEstudante.atencaoMemoriaFuncoesExecutivas", perfil.atencaoMemoriaFuncoesExecutivas());
            requiredText(errors, "perfilEstudante.organizacaoPlanejamentoRealizacaoTarefas", perfil.organizacaoPlanejamentoRealizacaoTarefas());
            requiredText(errors, "perfilEstudante.interacaoSocialParticipacaoSala", perfil.interacaoSocialParticipacaoSala());
            requiredText(errors, "perfilEstudante.aspectosSensoriaisRelevantes", perfil.aspectosSensoriaisRelevantes());
            requiredText(errors, "perfilEstudante.mobilidadeAcessoTecnologiasRecursos", perfil.mobilidadeAcessoTecnologiasRecursos());
            requiredText(errors, "perfilEstudante.autonomiaContextoFamiliar", perfil.autonomiaContextoFamiliar());
            requiredText(errors, "perfilEstudante.autonomiaContextoEscolar", perfil.autonomiaContextoEscolar());
            requiredText(errors, "perfilEstudante.estrategiasQueFavorecemAprendizagem", perfil.estrategiasQueFavorecemAprendizagem());
            requiredText(errors, "perfilEstudante.situacoesQueDificultamAprendizagem", perfil.situacoesQueDificultamAprendizagem());
        }

        ContextoPsicossocialRequestDto contexto = dto.contextoPsicossocial();
        if (contexto == null) {
            required(errors, "contextoPsicossocial");
        } else {
            requiredText(errors, "contextoPsicossocial.relacaoComCursoEExpectativas", contexto.relacaoComCursoEExpectativas());
            requiredText(errors, "contextoPsicossocial.redeApoioFamiliarSocial", contexto.redeApoioFamiliarSocial());
            requiredText(errors, "contextoPsicossocial.conflitosOuFatoresPsicossociais", contexto.conflitosOuFatoresPsicossociais());
            requiredText(errors, "contextoPsicossocial.observacoesFrequenciaRotinaPermanencia", contexto.observacoesFrequenciaRotinaPermanencia());
        }

        PotencialidadesRequestDto potencialidades = dto.potencialidades();
        if (potencialidades == null) {
            required(errors, "potencialidades");
        } else {
            requiredText(errors, "potencialidades.potencialidadesAcademicas", potencialidades.potencialidadesAcademicas());
            requiredText(errors, "potencialidades.interessesHabilidades", potencialidades.interessesHabilidades());
            requiredText(errors, "potencialidades.formasPreferenciaisAprendizagemEDemonstracao", potencialidades.formasPreferenciaisAprendizagemEDemonstracao());
            requiredText(errors, "potencialidades.recursosQueFavorecemDesempenho", potencialidades.recursosQueFavorecemDesempenho());
        }

        SintesePsicopedagogicaRequestDto sintese = dto.sintesePsicopedagogica();
        if (sintese == null) {
            required(errors, "sintesePsicopedagogica");
        } else {
            requiredText(errors, "sintesePsicopedagogica.identificacaoNecessidadesEspecificas", sintese.identificacaoNecessidadesEspecificas());
            requiredText(errors, "sintesePsicopedagogica.avancosObjetivosConhecimentosAlcancados", sintese.avancosObjetivosConhecimentosAlcancados());
            requiredText(errors, "sintesePsicopedagogica.dificuldadesBarreirasComRepercussaoEducacional", sintese.dificuldadesBarreirasComRepercussaoEducacional());
            requiredText(errors, "sintesePsicopedagogica.potencialidadesECondicoesFacilitadoras", sintese.potencialidadesECondicoesFacilitadoras());
            requiredText(errors, "sintesePsicopedagogica.principaisDemandasIdentificadasNoCaso", sintese.principaisDemandasIdentificadasNoCaso());
        }

        ChecklistApoiosRequestDto checklist = dto.checklistApoios();
        if (checklist == null) {
            required(errors, "checklistApoios");
        } else {
            requiredList(errors, "checklistApoios.acessibilidadeAmbiente", checklist.acessibilidadeAmbiente());
            requiredList(errors, "checklistApoios.comunicacaoMateriais", checklist.comunicacaoMateriais());
            requiredList(errors, "checklistApoios.metodologia", checklist.metodologia());
            requiredList(errors, "checklistApoios.avaliacao", checklist.avaliacao());
            requiredList(errors, "checklistApoios.curriculo", checklist.curriculo());
            requiredList(errors, "checklistApoios.apoiosInstitucionais", checklist.apoiosInstitucionais());
            requiredText(errors, "checklistApoios.apoiosExternosEncaminhamentos", checklist.apoiosExternosEncaminhamentos());
            requiredText(errors, "checklistApoios.psicopedagogoResponsavel", checklist.psicopedagogoResponsavel());
            requiredText(errors, "checklistApoios.coordenadorResponsavel", checklist.coordenadorResponsavel());
            required(errors, "checklistApoios.data", checklist.data());
        }
    }

    private void validarDocumentosComprobatorios(
            NecessidadesEspecificasRequestDto necessidades,
            Map<String, String> errors
    ) {
        if (necessidades.documentos() == null) return;
        for (int index = 0; index < necessidades.documentos().size(); index++) {
            DocumentoComprobatorioRequestDto documento = necessidades.documentos().get(index);
            String prefix = "necessidadesEspecificas.documentos[" + index + "]";
            if (documento == null) {
                required(errors, prefix);
                continue;
            }
            requiredText(errors, prefix + ".descricao", documento.descricao());
            required(errors, prefix + ".data", documento.data());
            requiredText(errors, prefix + ".profissional", documento.profissional());
        }
    }

    private void validarOrigemOutro(MotivoDemandaRequestDto motivo, Map<String, String> errors) {
        if (motivo == null) return;
        boolean outroInformado = motivo.outroOrigemEncaminhamento() != null;
        if (motivo.origemEncaminhamento() == OrigemEncaminhamento.OUTRO) {
            requiredText(errors, "motivoDemanda.outroOrigemEncaminhamento", motivo.outroOrigemEncaminhamento());
        } else if (outroInformado) {
            errors.put("motivoDemanda.outroOrigemEncaminhamento", "Este campo só pode ser informado quando a origem for OUTRO.");
        }
    }

    private void validarNecessidadesEducacionais(
            NecessidadesEducacionaisRequestDto necessidades,
            Map<String, String> errors
    ) {
        if (necessidades == null || necessidades.barreiras() == null) return;

        Set<DimensaoNecessidadeEducacional> dimensoes = new HashSet<>();
        for (int index = 0; index < necessidades.barreiras().size(); index++) {
            BarreiraEducacionalRequestDto barreira = necessidades.barreiras().get(index);
            String prefix = "necessidadesEducacionais.barreiras[" + index + "]";
            if (barreira == null) {
                required(errors, prefix);
                continue;
            }
            required(errors, prefix + ".dimensao", barreira.dimensao());
            requiredText(errors, prefix + ".barreiraNecessidade", barreira.barreiraNecessidade());
            requiredText(errors, prefix + ".evidenciasImpactos", barreira.evidenciasImpactos());
            required(errors, prefix + ".prioridade", barreira.prioridade());

            if (barreira.dimensao() != null && !dimensoes.add(barreira.dimensao())) {
                errors.put(prefix + ".dimensao", "Não é permitido informar mais de uma barreira para a mesma dimensão.");
            }
        }
    }

    private void required(Map<String, String> errors, String field) {
        errors.putIfAbsent(field, "Campo obrigatório para um estudo de caso completo.");
    }

    private void requiredText(Map<String, String> errors, String field, String value) {
        if (value == null || value.isBlank()) {
            required(errors, field);
        }
    }

    private void required(Map<String, String> errors, String field, Object value) {
        if (value == null) {
            required(errors, field);
        }
    }

    private void requiredList(Map<String, String> errors, String field, Collection<?> value) {
        if (value == null || value.isEmpty()) {
            required(errors, field);
        }
    }
}
