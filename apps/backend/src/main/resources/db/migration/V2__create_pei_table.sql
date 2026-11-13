
-- Criação da tabela PEI
CREATE TABLE PUBLIC.pei (
                            pei_id UUID NOT NULL,
                            historico TEXT,
                            necessidades_especificas TEXT,
                            conhecimentos_habilidades_interesses TEXT,
                            dificuldades_apresentadas TEXT,
                            propostas_adaptacoes TEXT,
                            aluno_id UUID NOT NULL,
                            ativo BOOLEAN DEFAULT TRUE,

                            CONSTRAINT pk_pei PRIMARY KEY (pei_id),

                            CONSTRAINT fk_aluno
                                FOREIGN KEY (aluno_id)
                                    REFERENCES PUBLIC.aluno(id)
);

-- Índice único parcial:
-- Garante apenas um PEI ativo por aluno
CREATE UNIQUE INDEX idx_pei_aluno_ativo
    ON PUBLIC.pei (aluno_id)
    WHERE ativo = TRUE;


-- Function para impedir alteração do aluno_id
CREATE OR REPLACE FUNCTION fn_atualizar_id_aluno()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.aluno_id <> NEW.aluno_id THEN
        RAISE EXCEPTION
            'Não é permitido alterar o aluno_id de um PEI existente.';
END IF;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger executada antes de qualquer UPDATE
CREATE TRIGGER trg_impedir_alteracao_aluno_id
    BEFORE UPDATE ON PUBLIC.pei
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_id_aluno();