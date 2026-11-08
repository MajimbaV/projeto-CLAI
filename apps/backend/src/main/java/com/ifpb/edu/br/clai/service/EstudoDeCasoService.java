package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.dto.aluno.AlunoResponseDto;
import com.ifpb.edu.br.clai.dto.estudodecaso.response.EstudoDeCasoResponseDto;
import com.ifpb.edu.br.clai.dto.estudodecaso.request.create.*;
import com.ifpb.edu.br.clai.exception.FieldValidationException;
import com.ifpb.edu.br.clai.exception.ResourceNotFoundException;
import com.ifpb.edu.br.clai.mapper.EstudoDeCasoMapper;
import com.ifpb.edu.br.clai.model.aluno.Aluno;
import com.ifpb.edu.br.clai.model.estudodecaso.*;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.DimensaoNecessidadeEducacional;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.OrigemEncaminhamento;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;
import com.ifpb.edu.br.clai.repository.EstudoDeCasoRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.ifpb.edu.br.clai.mapper.EstudoDeCasoMapper.*;

@Service
public class EstudoDeCasoService {

    private final EstudoDeCasoRepository estudoDeCasoRepository;
    private final AlunoService alunoService;

    public EstudoDeCasoService(EstudoDeCasoRepository estudoDeCasoRepository, AlunoService alunoService) {
        this.estudoDeCasoRepository = estudoDeCasoRepository;
        this.alunoService = alunoService;
    }

    public EstudoDeCasoResponseDto createEstudoDeCaso(EstudoDeCasoRequestDto dto) {
        EstudoDeCasoRequestDto dtoLimpo = prepararParaMapeamentoEstudoDeCaso(dto);
        validarRegras(dtoLimpo.motivoDemanda(), dtoLimpo.necessidadesEducacionais(), dtoLimpo.necessidadesEspecificas());

        Aluno aluno = alunoService.buscarOuFalhar(dtoLimpo.identificacao().alunoId());

        EstudoDeCaso estudoDeCaso = EstudoDeCasoMapper.requestToEntity(dtoLimpo, aluno);
        arquivarEstudosPorMatricula(aluno.getAlunoMatricula());
        EstudoDeCaso estudoDeCasoSalvo = estudoDeCasoRepository.save(estudoDeCaso);
        return EstudoDeCasoMapper.entityToResponse(estudoDeCasoSalvo);
    }

    @Transactional
    public EstudoDeCasoResponseDto createEstudoDeCasoCombinado(EstudoDeCasoCombinadoRequestDto dto) {
        validarIdentificacaoCombinada(dto);
        validarRegras(dto.motivoDemanda(), dto.necessidadesEducacionais(), dto.necessidadesEspecificas());

        AlunoResponseDto alunoSalvo = alunoService.createAluno(dto.identificacao().aluno());
        Aluno novoAluno = alunoService.buscarOuFalhar(alunoSalvo.id());

        EstudoDeCasoRequestDto dtoLimpo = prepararParaMapeamentoEstudoDeCaso(
                new EstudoDeCasoRequestDto(
                        new IdentificacaoRequestDto(
                                alunoSalvo.id(),
                                dto.identificacao().datasAnamnese(),
                                dto.identificacao().nomeProfissional()
                        ),
                        dto.motivoDemanda(),
                        dto.necessidadesEspecificas(),
                        dto.anamnese(),
                        dto.perfilEstudante(),
                        dto.contextoPsicossocial(),
                        dto.potencialidades(),
                        dto.necessidadesEducacionais(),
                        dto.sintesePsicopedagogica(),
                        dto.checklistApoios()
                )
        );
        EstudoDeCaso estudoDeCaso = EstudoDeCasoMapper.requestToEntity(dtoLimpo, novoAluno);
        arquivarEstudosPorMatricula(novoAluno.getAlunoMatricula());
        EstudoDeCaso estudoDeCasoSalvo = estudoDeCasoRepository.save(estudoDeCaso);
        return EstudoDeCasoMapper.entityToResponse(estudoDeCasoSalvo);
    }

    private EstudoDeCasoRequestDto prepararParaMapeamentoEstudoDeCaso(EstudoDeCasoRequestDto dto) {
        return new EstudoDeCasoRequestDto(
                dto.identificacao() != null ? dto.identificacao() : new IdentificacaoRequestDto(null, null, null),
                dto.motivoDemanda() != null ? dto.motivoDemanda() : new MotivoDemandaRequestDto(null, null, null, null, null, null),
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
                        null, null, null, null, null, null, null, null)
        );
    }

    private void validarIdentificacaoCombinada(EstudoDeCasoCombinadoRequestDto dto) {
        Map<String, String> errors = new LinkedHashMap<>();
        if (dto == null) {
            required(errors, "body");
        } else if (dto.identificacao() == null) {
            required(errors, "identificacao");
        } else if (dto.identificacao().aluno() == null) {
            required(errors, "identificacao.aluno");
        }

        if (!errors.isEmpty()) {
            throw new FieldValidationException(errors);
        }
    }

    private void validarRegras(MotivoDemandaRequestDto motivoDemanda, NecessidadesEducacionaisRequestDto necessidadesEducacionais, NecessidadesEspecificasRequestDto necessidadesEspecificasRequestDto) {
        Map<String, String> errors = new LinkedHashMap<>();


        validarOrigemOutro(motivoDemanda, errors);
        validarNecessidadesEducacionais(necessidadesEducacionais, errors);
        validarDocumentosComprobatorios(necessidadesEspecificasRequestDto, errors);

        if (!errors.isEmpty()) {
            throw new FieldValidationException(errors);
        }
    }

    private void validarDocumentosComprobatorios(
            NecessidadesEspecificasRequestDto necessidades,
            Map<String, String> errors
    ) {
        if (necessidades == null || necessidades.documentos() == null) return;
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


    private boolean alterarStatusParaArquivado(List<EstudoDeCaso> estudos) {
        boolean sofreuAlteracao = false;

        for (EstudoDeCaso estudo : estudos) {
            if (estudo.getSituacaoEstudoDeCaso() == SituacaoEstudoDeCaso.VALIDO) {
                estudo.setSituacaoEstudoDeCaso(SituacaoEstudoDeCaso.ARQUIVADO);
                sofreuAlteracao = true;
            }
        }

        return sofreuAlteracao;
    }

    @Transactional
    public void arquivarEstudosPorMatricula(String matricula) {
        alunoService.getAlunoByMatricula(matricula);

        List<EstudoDeCaso> estudos = estudoDeCasoRepository.findByIdentificacaoAlunoIdAlunoMatricula(matricula);

        if (!estudos.isEmpty()) {
            boolean sofreuAlteracao = alterarStatusParaArquivado(estudos);
            if (sofreuAlteracao) {
                estudoDeCasoRepository.saveAll(estudos);
            }
        }
    }

    public EstudoDeCasoResponseDto updateEstudoDeCaso(UUID id, EstudoDeCasoAtualizacaoRequestDTO dto) {
        EstudoDeCaso estudoDeCaso = estudoDeCasoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudo de caso não encontrado com o ID: " + id));


        validarRegras(dto.motivoDemanda(), dto.necessidadesEducacionais(), dto.necessidadesEspecificas());
        EstudoDeCasoMapper.aplicarUpdate(dto, estudoDeCaso);

        EstudoDeCaso estudoAtualizado = estudoDeCasoRepository.save(estudoDeCaso);

        return EstudoDeCasoMapper.entityToResponse(estudoAtualizado);
    }

}
