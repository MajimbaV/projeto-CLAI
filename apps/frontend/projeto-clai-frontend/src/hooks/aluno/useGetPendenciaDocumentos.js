import { useGetPeisByMatricula } from "../pei/useGetPeisByMatricula";
import { useGetPlanosAcaoByMatricula } from "../plano-acao/useGetPlanosAcaoByMatricula";
import { useGetEstudosCasoByMatricula } from "../estudo-caso/useGetEstudosCasoByMatricula";

export function useGetPendenciaDocumentos(matriculaAluno) {
    const pendenciaDocumentos = {
        estudoCaso: true,
        planoAcao: true,
        pei: true,
    }

    const { data: peis } = useGetPeisByMatricula(matriculaAluno, { page: 1, size: 100, filters: { statusAtivo: true } });
    const { data: planosAcao } = useGetPlanosAcaoByMatricula(matriculaAluno, { page: 1, size: 100, filters: { statusAtivo: true } });
    const { data: estudosCaso } = useGetEstudosCasoByMatricula(matriculaAluno, { page: 1, size: 100, filters: { statusAtivo: true } });

    if (peis && peis.content && peis.content.length > 0) {
        pendenciaDocumentos.pei = false;
    }

    if (planosAcao && planosAcao.content && planosAcao.content.length > 0) {
        pendenciaDocumentos.planoAcao = false;
    }

    if (estudosCaso && estudosCaso.content && estudosCaso.content.length > 0) {
        pendenciaDocumentos.estudoCaso = false;
    }

    return pendenciaDocumentos;
}