CREATE TABLE public.rai (
    rai_id uuid NOT NULL,
    aluno_id uuid NOT NULL,
    pea_id uuid NOT NULL,
    relacionamento_outros character varying(255),
    relacionamento_comentario text,
    cognitiva_outros character varying(255),
    cognitiva_comentario text,
    socioemocional_outros character varying(255),
    socioemocional_comentario text,
    avancos_gerais text,
    dificuldades_aprendizagem text,
    fatores_externos text,
    parecer text,
    data_relatorio date,
    status boolean NOT NULL DEFAULT TRUE,

    CONSTRAINT pk_rai PRIMARY KEY (rai_id),
    CONSTRAINT uk_rai_pea UNIQUE (pea_id),
    CONSTRAINT fk_rai_aluno FOREIGN KEY (aluno_id)
        REFERENCES public.aluno (id),
    CONSTRAINT fk_rai_pea FOREIGN KEY (pea_id)
        REFERENCES public.pea (pea_id)
);

CREATE INDEX idx_rai_aluno_id
    ON public.rai (aluno_id);

CREATE TABLE public.rai_relacionamento (
    rai_id uuid NOT NULL,
    tipo_relacionamento character varying(255),

    CONSTRAINT fk_rai_relacionamento_rai FOREIGN KEY (rai_id)
        REFERENCES public.rai (rai_id)
        ON DELETE CASCADE,
    CONSTRAINT ck_rai_relacionamento_tipo CHECK (
        tipo_relacionamento IN (
            'AFETIVO',
            'AGRESSIVO',
            'SOCIALIZADO',
            'ANTISSOCIAL',
            'OUTROS'
        )
    )
);

CREATE INDEX idx_rai_relacionamento_rai_id
    ON public.rai_relacionamento (rai_id);

CREATE TABLE public.rai_habilidade_cognitiva (
    rai_id uuid NOT NULL,
    tipo_habilidade_cognitiva character varying(255),

    CONSTRAINT fk_rai_habilidade_cognitiva_rai FOREIGN KEY (rai_id)
        REFERENCES public.rai (rai_id)
        ON DELETE CASCADE,
    CONSTRAINT ck_rai_habilidade_cognitiva_tipo CHECK (
        tipo_habilidade_cognitiva IN (
            'FOCO',
            'MEMORIA',
            'ATENCAO',
            'COMPREENSAO_GERAL',
            'CRIATIVIDADE',
            'RESPONSABILIDADES_SOCIAIS',
            'OUTROS'
        )
    )
);

CREATE INDEX idx_rai_habilidade_cognitiva_rai_id
    ON public.rai_habilidade_cognitiva (rai_id);

CREATE TABLE public.rai_habilidade_socioemocional (
    rai_id uuid NOT NULL,
    tipo_habilidade_socioemocional character varying(255),

    CONSTRAINT fk_rai_habilidade_socioemocional_rai FOREIGN KEY (rai_id)
        REFERENCES public.rai (rai_id)
        ON DELETE CASCADE,
    CONSTRAINT ck_rai_habilidade_socioemocional_tipo CHECK (
        tipo_habilidade_socioemocional IN (
            'EMPATIA',
            'AUTOESTIMA',
            'ETICA',
            'AUTOCONHECIMENTO',
            'CONFIANCA',
            'COMPROMISSO',
            'AUTONOMIA',
            'CRIATIVIDADE',
            'PACIENCIA',
            'OUTROS'
        )
    )
);

CREATE INDEX idx_rai_habilidade_socioemocional_rai_id
    ON public.rai_habilidade_socioemocional (rai_id);

CREATE TABLE public.rai_habilidade_desenvolvida (
    id uuid NOT NULL,
    rai_id uuid NOT NULL,
    habilidade_desenvolvida text,
    nivel_aprendizado character varying(255),
    observacoes text,

    CONSTRAINT pk_rai_habilidade_desenvolvida PRIMARY KEY (id),
    CONSTRAINT fk_rai_habilidade_desenvolvida_rai FOREIGN KEY (rai_id)
        REFERENCES public.rai (rai_id)
        ON DELETE CASCADE,
    CONSTRAINT ck_rai_habilidade_desenvolvida_nivel CHECK (
        nivel_aprendizado IS NULL OR nivel_aprendizado IN (
            'SATISFATORIO',
            'BOM',
            'OTIMO'
        )
    )
);

CREATE INDEX idx_rai_habilidade_desenvolvida_rai_id
    ON public.rai_habilidade_desenvolvida (rai_id);
