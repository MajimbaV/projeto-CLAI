-- Baseline schema for the application.

SET default_tablespace = '';
SET default_table_access_method = heap;

-- Tables

CREATE TABLE public.a_areas_dificuldade (
    estudo_de_caso_id uuid NOT NULL,
    a_area_disciplina_dificuldade character varying(300)
);

CREATE TABLE public.a_areas_facilidade (
    estudo_de_caso_id uuid NOT NULL,
    a_area_disciplina_facilidade character varying(300)
);

CREATE TABLE public.aluno (
    id uuid NOT NULL,
    al_curso character varying(100) NOT NULL,
    al_email character varying(60),
    al_matricula character varying(100) NOT NULL,
    al_nascimento date NOT NULL,
    al_nome character varying(100) NOT NULL,
    al_telefone character varying(255),
    rs_parentesco character varying(30),
    rs_nome character varying(100),
    al_periodo_letivo character varying(255) NOT NULL,
    al_periodo_ingresso character varying(255) NOT NULL,
    rs_email character varying(60),
    rs_telefone character varying(25),
    status boolean
);

CREATE TABLE public.ca_acessibilidade (
    estudo_de_caso_id uuid NOT NULL,
    ca_opcao character varying(50),
    CONSTRAINT ca_acessibilidade_ca_opcao_check CHECK (
        ca_opcao IN (
            'ACESSO_FISICO',
            'LUGAR_EM_SALA',
            'ILUMINACAO',
            'REDUCAO_DE_ESTIMULOS'
        )
    )
);

CREATE TABLE public.ca_apoios_institucionais (
    estudo_de_caso_id uuid NOT NULL,
    ca_opcao character varying(50),
    CONSTRAINT ca_apoios_institucionais_ca_opcao_check CHECK (
        ca_opcao IN (
            'ASSISTENCIA_ESTUDANTIL',
            'MONITORIA',
            'ASSISTENTE_INCLUSIVO',
            'CUIDADOR',
            'PSICOPEDAGOGIA'
        )
    )
);

CREATE TABLE public.ca_avaliacao (
    estudo_de_caso_id uuid NOT NULL,
    ca_opcao character varying(50),
    CONSTRAINT ca_avaliacao_ca_opcao_check CHECK (
        ca_opcao IN (
            'TEMPO_ADICIONAL',
            'FORMATO_ACESSIVEL',
            'AMBIENTE_ADEQUADO',
            'FORMA_ALTERNATIVA_DE_RESPOSTA'
        )
    )
);

CREATE TABLE public.ca_comunicacao_materiais (
    estudo_de_caso_id uuid NOT NULL,
    ca_opcao character varying(50),
    CONSTRAINT ca_comunicacao_materiais_ca_opcao_check CHECK (
        ca_opcao IN (
            'MATERIAL_AMPLIADO',
            'LIBRAS_INTERPRETE',
            'LINGUAGEM_OBJETIVA',
            'RECURSOS_VISUAIS'
        )
    )
);

CREATE TABLE public.ca_curriculo (
    estudo_de_caso_id uuid NOT NULL,
    ca_opcao character varying(50),
    CONSTRAINT ca_curriculo_ca_opcao_check CHECK (
        ca_opcao IN (
            'ADAPTACAO_DE_PEQUENO_PORTE',
            'ADAPTACAO_DE_GRANDE_PORTE',
            'TEMPORALIDADE',
            'PRIORIZACAO_DE_OBJETIVOS'
        )
    )
);

CREATE TABLE public.ca_metodologia (
    estudo_de_caso_id uuid NOT NULL,
    ca_opcao character varying(50),
    CONSTRAINT ca_metodologia_ca_opcao_check CHECK (
        ca_opcao IN (
            'FRAGMENTACAO_DE_TAREFAS',
            'MEDIACAO',
            'ANTECIPACAO_DE_ROTINA',
            'RECURSOS_CONCRETOS_DIGITAIS'
        )
    )
);

CREATE TABLE public.estudo_de_caso (
    id uuid NOT NULL,
    a_adaptacoes_recursos_resultados character varying(1000),
    a_experiencias_escolares_negativas character varying(1000),
    a_experiencias_escolares_positivas character varying(1000),
    a_historico_escolar character varying(1000),
    a_objetivos_conhecimentos_consolidados character varying(1000),
    ca_acessibilidade_outro character varying(500),
    ca_apoio_institucional_outro character varying(500),
    ca_apoios_externos_encaminhamentos character varying(1500),
    ca_avaliacao_outro character varying(500),
    ca_comunicacao_outro character varying(500),
    ca_coordenador_responsavel character varying(200),
    ca_curriculo_outro character varying(500),
    ca_data date,
    ca_metodologia_outro character varying(500),
    ca_psicopedagogo_responsavel character varying(200),
    c_conflitos_fatores_psicossociais character varying(500),
    c_observacoes_frequencia_rotina_permanencia character varying(500),
    c_rede_apoio_familiar_social character varying(500),
    c_relacao_curso_expectativas character varying(500),
    ide_nome_profissional character varying(60),
    m_demanda_estudante character varying(255),
    m_demanda_responsavel character varying(255),
    m_demanda_equipe character varying(255),
    m_motivo character varying(300),
    m_origem_encaminhamento character varying(255),
    m_origem_encaminhamento_outro character varying(100),
    n_encaminhamentos_anteriores character varying(1000),
    n_especifica_informada character varying(150),
    n_servicos_apoio_atuais_anteriores character varying(1000),
    p_aspectos_sensoriais_relevantes character varying(500),
    p_atencao_memoria_funcoes_executivas character varying(500),
    p_autonomia_contexto_escolar character varying(500),
    p_autonomia_contexto_familiar character varying(500),
    p_comunicacao_compreensao_orientacoes character varying(500),
    p_estrategias_favorecem_aprendizagem character varying(500),
    p_interacao_social_participacao_sala character varying(500),
    p_leitura_escrita_linguagem character varying(500),
    p_mobilidade_acesso_tecnologias_recursos character varying(500),
    p_organizacao_planejamento_realizacao_tarefas character varying(500),
    p_raciocinio_logico_matematico character varying(500),
    p_situacoes_dificultam_aprendizagem character varying(500),
    pot_formas_preferenciais_aprendizagem character varying(500),
    pot_interesses_habilidades character varying(500),
    pot_potencialidades_academicas character varying(500),
    pot_recursos_favoraveis_desempenho character varying(500),
    sp_avancos_objetivos_conhecimentos_alcancados character varying(1000),
    sp_dificuldades_barreiras_repercussao_educacional character varying(1000),
    sp_identificacao_necessidades_especificas character varying(1000),
    sp_potencialidades_condicoes_facilitadoras character varying(1000),
    sp_principais_demandas_identificadas character varying(1000),
    situacao character varying(255) NOT NULL,
    aluno_id uuid,
    CONSTRAINT estudo_de_caso_m_origem_encaminhamento_check CHECK (
        m_origem_encaminhamento IN (
            'CLAI',
            'COPED',
            'CAEST',
            'COORDENACAO_DE_CURSO',
            'DOCENTE',
            'FAMILIA',
            'ESTUDANTE',
            'OUTRO'
        )
    ),
    CONSTRAINT estudo_de_caso_situacao_check CHECK (
        situacao IN ('VALIDO', 'ARQUIVADO')
    )
);

CREATE TABLE public.identificacao_datas_anamnese (
    estudo_de_caso_id uuid NOT NULL,
    ide_data_anamnese date NOT NULL
);

CREATE TABLE public.n_condicoes_associadas (
    estudo_de_caso_id uuid NOT NULL,
    n_condicao_associada character varying(300)
);

CREATE TABLE public.n_diagnosticos (
    estudo_de_caso_id uuid NOT NULL,
    n_diagnostico character varying(255)
);

CREATE TABLE public.n_documentos_comprobatorios (
    estudo_de_caso_id uuid NOT NULL,
    n_documento_data date,
    n_documento_descricao character varying(300),
    n_documento_profissional character varying(150)
);

CREATE TABLE public.n_medicacoes_continuas (
    estudo_de_caso_id uuid NOT NULL,
    n_medicacao_continua character varying(300)
);

CREATE TABLE public.ne_barreiras_educacionais (
    estudo_de_caso_id uuid NOT NULL,
    barreira_necessidade character varying(1000),
    dimensao character varying(50),
    evidencias_impactos character varying(1500),
    prioridade character varying(10),
    CONSTRAINT ne_barreiras_educacionais_dimensao_check CHECK (
        dimensao IN (
            'ACESSO_FISICO_AMBIENTAL',
            'COMUNICACAO',
            'CURRICULO_METODOLOGIA',
            'AVALIACAO',
            'ORGANIZACAO_TEMPORALIDADE',
            'INTERACAO_PARTICIPACAO',
            'TECNOLOGIA_ASSISTIVA_RECURSOS',
            'OUTRA'
        )
    ),
    CONSTRAINT ne_barreiras_educacionais_prioridade_check CHECK (
        prioridade IN ('ALTA', 'MEDIA', 'BAIXA')
    )
);

CREATE TABLE public.plano_acao (
    id uuid NOT NULL,
    apresentou_documentos smallint NOT NULL,
    tem_comorbidade smallint NOT NULL,
    data_plano date,
    principais_demandas text,
    uso_medicacao smallint NOT NULL,
    frequenta_apoio smallint NOT NULL,
    necessidades_especificas text,
    propostas_intervencao text,
    relato_avancos_dificuldades text,
    status boolean,
    al_associado character varying(100) NOT NULL,
    CONSTRAINT plano_acao_apresentou_documentos_check CHECK (
        apresentou_documentos BETWEEN 0 AND 1
    ),
    CONSTRAINT plano_acao_frequenta_apoio_check CHECK (
        frequenta_apoio BETWEEN 0 AND 1
    ),
    CONSTRAINT plano_acao_tem_comorbidade_check CHECK (
        tem_comorbidade BETWEEN 0 AND 1
    ),
    CONSTRAINT plano_acao_uso_medicacao_check CHECK (
        uso_medicacao BETWEEN 0 AND 1
    )
);

CREATE TABLE public.plano_comorbidades (
    plano_acao_id uuid NOT NULL,
    comorbidade character varying(255)
);

CREATE TABLE public.plano_documentos (
    plano_acao_id uuid NOT NULL,
    documento character varying(255)
);

CREATE TABLE public.plano_medicacoes (
    plano_acao_id uuid NOT NULL,
    medicacao character varying(255)
);

CREATE TABLE public.plano_servicos_apoio (
    plano_acao_id uuid NOT NULL,
    servico character varying(255)
);

-- Constraints

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.estudo_de_caso
    ADD CONSTRAINT estudo_de_caso_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.plano_acao
    ADD CONSTRAINT plano_acao_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT ukdyv3ywc12s94y1gb8e16b9ny4 UNIQUE (al_matricula);

-- Foreign keys

ALTER TABLE ONLY public.ca_comunicacao_materiais
    ADD CONSTRAINT fk2algbinveo96t2jl6r6bxq48e
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.ca_apoios_institucionais
    ADD CONSTRAINT fk6aqo4t15fr6mycagq2j1o7cr2
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.plano_documentos
    ADD CONSTRAINT fk7viu3oufun0drwcawsycgoc41
        FOREIGN KEY (plano_acao_id)
        REFERENCES public.plano_acao(id);

ALTER TABLE ONLY public.n_medicacoes_continuas
    ADD CONSTRAINT fkbfshpsd15jw97w9d59yd6na6y
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.ne_barreiras_educacionais
    ADD CONSTRAINT fkbp8lhbq11vkd1yhhral4n7os9
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.ca_avaliacao
    ADD CONSTRAINT fkbyh8p2a6o5dx240qx8jw1rgdi
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.identificacao_datas_anamnese
    ADD CONSTRAINT fkc53hc5pulh1s18o64ke0hlsou
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.plano_acao
    ADD CONSTRAINT fkctcl7aj3criublw7y523yux7s
        FOREIGN KEY (al_associado)
        REFERENCES public.aluno(al_matricula);

ALTER TABLE ONLY public.n_diagnosticos
    ADD CONSTRAINT fkdjpf495cely8779q4f1p5hs3d
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.n_documentos_comprobatorios
    ADD CONSTRAINT fkf9rq13lc1ps3jic981aua7jnj
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.a_areas_dificuldade
    ADD CONSTRAINT fkg5cn1s57ge0r7euscmics7ddx
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.plano_comorbidades
    ADD CONSTRAINT fkh02gmqtaorgdpqpatct4p7m3o
        FOREIGN KEY (plano_acao_id)
        REFERENCES public.plano_acao(id);

ALTER TABLE ONLY public.n_condicoes_associadas
    ADD CONSTRAINT fkjxpwgbehi5xa3wndtd0q3q4wf
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.ca_metodologia
    ADD CONSTRAINT fkluqo2nmn2ssonj2cxpu3sxvrj
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.plano_servicos_apoio
    ADD CONSTRAINT fkmmme7omabc6q320vjnd8ltf2p
        FOREIGN KEY (plano_acao_id)
        REFERENCES public.plano_acao(id);

ALTER TABLE ONLY public.plano_medicacoes
    ADD CONSTRAINT fknjhqc45r603j1e1o001swnqlh
        FOREIGN KEY (plano_acao_id)
        REFERENCES public.plano_acao(id);

ALTER TABLE ONLY public.ca_curriculo
    ADD CONSTRAINT fkpfa33qq6uw721f2ry9uvsojds
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.a_areas_facilidade
    ADD CONSTRAINT fkpidg1w8x624d02vma86fu6uqw
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.ca_acessibilidade
    ADD CONSTRAINT fkqmip7md8ykor9mb2kaikus55j
        FOREIGN KEY (estudo_de_caso_id)
        REFERENCES public.estudo_de_caso(id);

ALTER TABLE ONLY public.estudo_de_caso
    ADD CONSTRAINT fks18wkorctfyoivkukshvjhxtk
        FOREIGN KEY (aluno_id)
        REFERENCES public.aluno(id);
