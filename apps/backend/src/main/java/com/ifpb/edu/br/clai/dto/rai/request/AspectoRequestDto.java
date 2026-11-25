package com.ifpb.edu.br.clai.dto.rai.request;

import java.util.List;

import jakarta.validation.constraints.Size;

public record AspectoRequestDto<T>(
    List<T> tipos,

    @Size(max = 255, message = "O campo outros não pode exceder 255 caracteres.")
    String outros,

    String comentario
) {
    public AspectoRequestDto {
        tipos = tipos != null ? tipos : List.of();
    }
}
