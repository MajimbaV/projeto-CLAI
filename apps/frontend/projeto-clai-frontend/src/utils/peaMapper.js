
export function mapearParaPeaDTO(pea, alunoId, peiId) {
    return {
        alunoId: alunoId,
        peiId: peiId,
        componenteCurricular: pea.componenteCurricular || null,
        semestreAno: pea.semestreAno || null,
        docente: pea.docente || null,
        objetivoGeral: pea.objetivoGeral || null,
        objetivosEspecificos: pea.objetivosEspecificos || null,
        conteudosProgramaticos: pea.conteudosProgramaticos || null,
        metodologia: pea.metodologia || null,
        avaliacao: pea.avaliacao || null,
        bibliografiaBasica: pea.bibliografiaBasica || null,
        bibliografiaComplementar: pea.bibliografiaComplementar || null,
    }
}

export function mapearParaPeaForm(peaDTO) {
    return {
        alunoId: peaDTO.alunoId || '',
        peiId: peaDTO.peiId || '',
        componenteCurricular: peaDTO.componenteCurricular || '',
        semestreAno: peaDTO.semestreAno || '',
        docente: peaDTO.docente || '',
        objetivoGeral: peaDTO.objetivoGeral || '',
        objetivosEspecificos: peaDTO.objetivosEspecificos || '',
        conteudosProgramaticos: peaDTO.conteudosProgramaticos || '',
        metodologia: peaDTO.metodologia || '',
        avaliacao: peaDTO.avaliacao || '',
        bibliografiaBasica: peaDTO.bibliografiaBasica || '',
        bibliografiaComplementar: peaDTO.bibliografiaComplementar || '',
    }
}