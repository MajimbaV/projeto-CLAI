package com.ifpb.edu.br.clai.dto.rai.response;

import java.util.List;

public record AspectoResponseDto<T>(
    List<T> tipos,
    String outros,
    String comentario
) {}
