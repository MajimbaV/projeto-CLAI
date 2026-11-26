
CREATE TABLE public.pea (
    pea_id uuid NOT NULL,
    aluno_id uuid NOT NULL,
    pei_id uuid NOT NULL,
    componente_curricular text,
    semestre_ano text,
    docente text,
    objetivo_geral text,
    objetivos_especificos text,
    conteudos_programaticos text,
    metodologia text,
    avaliacao text,
    bibliografia_basica text,
    bibliografia_complementar text,
    status boolean NOT NULL DEFAULT TRUE,

    CONSTRAINT pk_pea PRIMARY KEY (pea_id)
    );

CREATE INDEX idx_pea_aluno_id
    ON public.pea (aluno_id);

CREATE INDEX idx_pea_pei_id
    ON public.pea (pei_id);

CREATE INDEX idx_pea_aluno_status
    ON public.pea (aluno_id, status);

ALTER TABLE public.pea
    ADD CONSTRAINT fk_pea_aluno
    FOREIGN KEY (aluno_id)
    REFERENCES public.aluno (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE public.pea
    ADD CONSTRAINT fk_pea_pei
    FOREIGN KEY (pei_id)
    REFERENCES public.pei (pei_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
