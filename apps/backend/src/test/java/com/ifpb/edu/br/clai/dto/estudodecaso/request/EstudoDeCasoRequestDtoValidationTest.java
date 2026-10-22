package com.ifpb.edu.br.clai.dto.estudodecaso.request;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioAcessibilidade;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.ApoioComunicacao;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.OrigemEncaminhamento;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.StatusEstudoDeCaso;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class EstudoDeCasoRequestDtoValidationTest {
    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    @BeforeAll
    static void setUpValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    static void closeValidatorFactory() {
        validatorFactory.close();
    }

    @Test
    void acceptsOutroOriginWithDescription() {
        assertTrue(validator.validate(motivo(OrigemEncaminhamento.OUTRO, "Outro setor")).isEmpty());
    }

    @Test
    void rejectsOutroOriginWithoutDescription() {
        assertFalse(validator.validate(motivo(OrigemEncaminhamento.OUTRO, "  ")).isEmpty());
    }

    @Test
    void rejectsDescriptionForStandardOrigin() {
        assertFalse(validator.validate(motivo(OrigemEncaminhamento.DOCENTE, "Outro setor")).isEmpty());
    }

    @Test
    void acceptsOtherSupportTextAlongsideEnumSelections() {
        var checklist = checklist(
                List.of(ApoioAcessibilidade.ACESSO_FISICO), "Rampa",
                List.of(ApoioComunicacao.LINGUAGEM_OBJETIVA), null
        );

        assertTrue(validator.validate(checklist).isEmpty());
    }

    @Test
    void rejectsBlankOtherSupportText() {
        var checklist = checklist(null, "   ", null, null);

        assertFalse(validator.validate(checklist).isEmpty());
    }

    @Test
    void acceptsCompleteRequestWithEmptyCollectionsAndNoDiagnoses() {
        var violations = validator.validate(validRequest());

        assertTrue(violations.isEmpty(), violations.toString());
    }

    @Test
    void rejectsMissingSection() {
        var request = validRequest();
        var missingAnamnese = new EstudoDeCasoRequestDto(
                request.identificacao(),
                request.motivoDemanda(),
                request.necessidadesEspecificas(),
                null,
                request.perfilEstudante(),
                request.contextoPsicossocial(),
                request.potencialidades(),
                request.necessidadesEducacionais(),
                request.sintesePsicopedagogica(),
                request.checklistApoios(),
                request.statusEstudoDeCaso()
        );

        assertFalse(validator.validate(missingAnamnese).isEmpty());
    }

    @Test
    void rejectsMissingRequiredList() {
        var identificacao = new IdentificacaoRequestDto(
                UUID.randomUUID(),
                null,
                "Profissional"
        );

        assertFalse(validator.validate(identificacao).isEmpty());
    }

    @Test
    void rejectsFutureChecklistDate() {
        var checklist = checklist(null, null, null, null);
        var futureChecklist = new ChecklistApoiosRequestDto(
                checklist.acessibilidadeAmbiente(),
                checklist.acessibilidadeAmbienteOutro(),
                checklist.comunicacaoMateriais(),
                checklist.comunicacaoMateriaisOutro(),
                checklist.metodologia(),
                checklist.metodologiaOutro(),
                checklist.avaliacao(),
                checklist.avaliacaoOutro(),
                checklist.curriculo(),
                checklist.curriculoOutro(),
                checklist.apoiosInstitucionais(),
                checklist.apoioInstitucionalOutro(),
                checklist.apoiosExternosEncaminhamentos(),
                checklist.psicopedagogoResponsavel(),
                checklist.coordenadorResponsavel(),
                LocalDate.now().plusDays(1)
        );

        assertFalse(validator.validate(futureChecklist).isEmpty());
    }

    private MotivoDemandaRequestDto motivo(OrigemEncaminhamento origem, String outro) {
        return new MotivoDemandaRequestDto(
                origem,
                outro,
                "Motivo principal",
                "Demanda do estudante",
                "Demanda do profissional",
                "Demanda do responsável",
                "Demanda da equipe"
        );
    }

    private ChecklistApoiosRequestDto checklist(
            List<ApoioAcessibilidade> acessibilidade,
            String acessibilidadeOutro,
            List<ApoioComunicacao> comunicacao,
            String comunicacaoOutro
    ) {
        return new ChecklistApoiosRequestDto(
                    acessibilidade == null ? List.of() : acessibilidade,
                acessibilidadeOutro,
                    comunicacao == null ? List.of() : comunicacao,
                comunicacaoOutro,
                List.of(),
                null,
                List.of(),
                null,
                List.of(),
                null,
                List.of(),
                null,
                "Sem encaminhamentos externos no momento",
                "Profissional psicopedagogo",
                "Coordenação responsável",
                LocalDate.now()
        );
    }

    private EstudoDeCasoRequestDto validRequest() {
        return new EstudoDeCasoRequestDto(
                new IdentificacaoRequestDto(UUID.randomUUID(), List.of(), "Profissional"),
                motivo(OrigemEncaminhamento.DOCENTE, null),
                new NecessidadesEspecificasRequestDto(
                        "Necessidade informada",
                        null,
                        List.of(),
                        List.of(),
                        List.of(),
                        "Sem encaminhamentos anteriores",
                        "Sem serviços de apoio anteriores"
                ),
                new AnamneseRequestDto(
                        "Histórico",
                        "Experiências positivas",
                        "Experiências negativas",
                        "Adaptações e resultados",
                        "Objetivos consolidados",
                        List.of(),
                        List.of()
                ),
                new PerfilEstudanteRequestDto(
                        "Comunicação",
                        "Leitura e escrita",
                        "Raciocínio lógico",
                        "Atenção e memória",
                        "Organização e planejamento",
                        "Interação social",
                        "Aspectos sensoriais",
                        "Mobilidade e tecnologia",
                        "Autonomia familiar",
                        "Autonomia escolar",
                        "Estratégias favoráveis",
                        "Situações dificultadoras"
                ),
                new ContextoPsicossocialRequestDto(
                        "Relação com o curso",
                        "Rede de apoio",
                        "Fatores psicossociais",
                        "Frequência e rotina"
                ),
                new PotencialidadesRequestDto(
                        "Potencialidades acadêmicas",
                        "Interesses",
                        "Formas de aprendizagem",
                        "Recursos favoráveis"
                ),
                new NecessidadesEducacionaisRequestDto(List.of()),
                new SintesePsicopedagogicaRequestDto(
                        "Necessidades identificadas",
                        "Avanços",
                        "Dificuldades",
                        "Potencialidades",
                        "Demandas"
                ),
                checklist(null, null, null, null),
                StatusEstudoDeCaso.VALIDO
        );
    }
}
