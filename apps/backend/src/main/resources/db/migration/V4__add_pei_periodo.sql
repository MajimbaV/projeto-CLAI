ALTER TABLE public.pei
    ADD COLUMN pei_periodo character varying(255);

UPDATE public.pei AS pei
SET pei_periodo = aluno.al_periodo_letivo
FROM public.aluno AS aluno
WHERE aluno.id = pei.aluno_id;

ALTER TABLE public.pei
    ALTER COLUMN pei_periodo SET NOT NULL;
