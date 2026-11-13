

export function mapearParaPeiDTO(pei, alunoId) {
  return {
    alunoId: alunoId,
    historico: pei.historico || null,
    necessidadesEspecificas: pei.necessidadesEspecificas || null,
    conhecimentosHabilidadesInteresses: pei.conhecimentosHabilidadesCapacidadesInteressesNecessidades || null,
    dificuldadesApresentadas: pei.dificuldadesApresentadas || null,
    propostasAdaptacoes: pei.propostasAdaptacoesCurriculares || null,
    ativo: true,
  };
}

export function mapearParaPeiForm(peiDTO) {
    return {
        alunoId: peiDTO.alunoId || '',
        historico: peiDTO.historico || '',
        necessidadesEspecificas: peiDTO.necessidadesEspecificas || '',
        conhecimentosHabilidadesCapacidadesInteressesNecessidades: peiDTO.conhecimentosHabilidadesInteresses || '',
        dificuldadesApresentadas: peiDTO.dificuldadesApresentadas || '',
        propostasAdaptacoesCurriculares: peiDTO.propostasAdaptacoes || '',
    };
}