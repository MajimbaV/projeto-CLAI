package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.curso.CursoRequestDto;
import com.ifpb.edu.br.clai.dto.curso.CursoResponseDto;
import com.ifpb.edu.br.clai.model.curso.enums.Modalidade;
import com.ifpb.edu.br.clai.model.curso.enums.NivelEnsino;
import com.ifpb.edu.br.clai.model.curso.enums.Turno;
import com.ifpb.edu.br.clai.service.CursoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

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

    @GetMapping
    public ResponseEntity<Page<CursoResponseDto>> listarCursos(
            @RequestParam(required = false) String nomeCurso,
            @RequestParam(required = false) Modalidade modalidade,
            @RequestParam(required = false) NivelEnsino nivelEnsino,
            @RequestParam(required = false) Turno turno,
            @RequestParam(required = false, defaultValue = "true") Boolean statusAtivo,
            Pageable pageable) {

        Page<CursoResponseDto> page = cursoService.getAllCursos(nomeCurso, statusAtivo, modalidade, nivelEnsino, turno, pageable);

        return ResponseEntity.ok(page);
    }

    @GetMapping("/sigla/{sigla}")
    public ResponseEntity<CursoResponseDto> getCursoBySigla(@PathVariable String sigla) {
        CursoResponseDto response = cursoService.getCursoBySigla(sigla);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoResponseDto> getCursoById(@PathVariable("id") UUID id) {
        CursoResponseDto response = cursoService.getCursoById(id);
        return ResponseEntity.ok(response);
    }
}
