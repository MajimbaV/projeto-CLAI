CREATE TABLE PUBLIC.pea (
    pea_id UUID NOT NULL,
    aluno_id UUID NOT NULL,
    pei_id UUID NOT NULL,
    componente_curricular VARCHAR(255),
    semestre_ano VARCHAR(255),
    docente VARCHAR(255),
    objetivo_geral TEXT,
    objetivos_especificos TEXT,
    conteudos_programaticos TEXT,
    metodologia TEXT,
    avaliacao TEXT,
    bibliografia_basica TEXT,
    bibliografia_complementar TEXT,
    status BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT pk_pea PRIMARY KEY (pea_id),
    CONSTRAINT fk_pea_aluno FOREIGN KEY (aluno_id) REFERENCES PUBLIC.aluno(id),
    CONSTRAINT fk_pea_pei FOREIGN KEY (pei_id) REFERENCES PUBLIC.pei(pei_id)
    );
