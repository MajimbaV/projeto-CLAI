package com.ifpb.edu.br.clai.dto.estudodecaso;

import com.ifpb.edu.br.clai.model.estudodecaso.enums.StatusEstudoDeCaso;

import java.util.UUID;

public record EstudoDeCasoResponseDto(UUID id, StatusEstudoDeCaso statusEstudoDeCaso) {}
