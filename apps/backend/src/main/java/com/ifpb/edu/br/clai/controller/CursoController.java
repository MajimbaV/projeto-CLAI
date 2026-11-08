package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.curso.CursoRequestDto;
import com.ifpb.edu.br.clai.dto.curso.CursoResponseDto;
import com.ifpb.edu.br.clai.service.CursoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping("/cursos")
public class CursoController {
    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @PostMapping
    public ResponseEntity<CursoResponseDto> createCurso(@Valid @RequestBody CursoRequestDto dto){
        CursoResponseDto response = cursoService.createCurso(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }


}
