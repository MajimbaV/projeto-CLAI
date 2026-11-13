CREATE TABLE public.curso (
    id uuid NOT NULL,
    curso_nome character varying(255) NOT NULL,
    curso_sigla character varying(255) NOT NULL,
    curso_nivel character varying(255),
    curso_modalidade character varying(255),
    curso_turno character varying(255),
    status boolean,
    CONSTRAINT curso_pkey PRIMARY KEY (id),
    CONSTRAINT uk_curso_sigla UNIQUE (curso_sigla)
);

-- Existing students only have a course name. Keep that information without
-- inventing catalog metadata; imported courses stay inactive until completed.
WITH cursos_legados AS (
    SELECT DISTINCT
        al_curso AS nome_curso,
        md5('clai:legacy-course:' || al_curso) AS hash
    FROM public.aluno
)
INSERT INTO public.curso (
    id,
    curso_nome,
    curso_sigla,
    curso_nivel,
    curso_modalidade,
    curso_turno,
    status
)
SELECT
    (
        substring(hash, 1, 8) || '-' ||
        substring(hash, 9, 4) || '-' ||
        substring(hash, 13, 4) || '-' ||
        substring(hash, 17, 4) || '-' ||
        substring(hash, 21, 12)
    )::uuid,
    nome_curso,
    'LEGACY-' || upper(hash),
    NULL,
    NULL,
    NULL,
    FALSE
FROM cursos_legados;

ALTER TABLE public.aluno
    ADD COLUMN curso_id uuid;

UPDATE public.aluno AS aluno
SET curso_id = curso.id
FROM public.curso AS curso
WHERE curso.curso_sigla =
    'LEGACY-' || upper(md5('clai:legacy-course:' || aluno.al_curso));

ALTER TABLE public.aluno
    ALTER COLUMN curso_id SET NOT NULL,
    ADD CONSTRAINT fk_aluno_curso
        FOREIGN KEY (curso_id) REFERENCES public.curso(id);

CREATE INDEX idx_aluno_curso_id ON public.aluno(curso_id);

ALTER TABLE public.aluno
    DROP COLUMN al_curso;
