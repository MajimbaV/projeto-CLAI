import { useQuery } from "@tanstack/react-query";
import { getCursoBySigla } from "../../services/CursoService";

export function useGetCursoBySigla(sigla) {

    return useQuery({
        queryKey: ["curso", sigla],
        queryFn: () => getCursoBySigla(sigla),
        staleTime: 5 * 60 * 1000, // 5 minutos
        placeholderData: (prev) => prev,
    })
}
