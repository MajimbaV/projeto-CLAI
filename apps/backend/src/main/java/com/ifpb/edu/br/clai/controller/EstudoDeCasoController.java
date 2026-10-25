package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.estudodecaso.response.EstudoDeCasoResponseDto;
import com.ifpb.edu.br.clai.dto.estudodecaso.request.create.EstudoDeCasoRequestDto;
import com.ifpb.edu.br.clai.service.EstudoDeCasoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Alterar isso quando fizer deploy
@RequestMapping("/estudos-de-caso")
public class EstudoDeCasoController {

    private final EstudoDeCasoService estudoDeCasoService;

    public EstudoDeCasoController(EstudoDeCasoService estudoDeCasoService) {
        this.estudoDeCasoService = estudoDeCasoService;
    }

    @PostMapping
    public ResponseEntity<EstudoDeCasoResponseDto> createEstudoDeCaso(
            @Valid @RequestBody EstudoDeCasoRequestDto dto
    ) {
        EstudoDeCasoResponseDto response = estudoDeCasoService.createEstudoDeCaso(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }
}
