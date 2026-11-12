package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.estudodecaso.request.create.EstudoDeCasoAtualizacaoRequestDTO;
import com.ifpb.edu.br.clai.dto.estudodecaso.request.create.EstudoDeCasoCombinadoRequestDto;
import com.ifpb.edu.br.clai.dto.estudodecaso.response.EstudoDeCasoResponseDto;
import com.ifpb.edu.br.clai.dto.estudodecaso.request.create.EstudoDeCasoRequestDto;
import com.ifpb.edu.br.clai.model.estudodecaso.enums.SituacaoEstudoDeCaso;
import com.ifpb.edu.br.clai.service.EstudoDeCasoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

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

    @PostMapping("/combinado")
    public ResponseEntity<EstudoDeCasoResponseDto> createEstudoDeCasoCombinado(
            @Valid @RequestBody EstudoDeCasoCombinadoRequestDto dto
    ) {
        EstudoDeCasoResponseDto response = estudoDeCasoService.createEstudoDeCasoCombinado(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<EstudoDeCasoResponseDto>> getAllEstudosDeCaso(
            Pageable pageable,
            @RequestParam(value = "nomeAluno", required = false) String nomeAluno,
            @RequestParam(value = "matriculaAluno", required = false) String matriculaAluno,
            @RequestParam(value = "situacao", required = false) SituacaoEstudoDeCaso situacao
    ) {
        Page<EstudoDeCasoResponseDto> response = estudoDeCasoService.getAllEstudosDeCaso(pageable, nomeAluno, matriculaAluno, situacao);
        return ResponseEntity.ok(response);
    }
  
      @PutMapping("/{id}")
    public ResponseEntity<EstudoDeCasoResponseDto> updateEstudoDeCaso(
            @PathVariable("id") UUID id,
            @Valid @RequestBody EstudoDeCasoAtualizacaoRequestDTO dto
    ) {
        EstudoDeCasoResponseDto response = estudoDeCasoService.updateEstudoDeCaso(id, dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstudoDeCasoResponseDto> getEstudoDeCasoById(@PathVariable UUID id) {
        EstudoDeCasoResponseDto response = estudoDeCasoService.getEstudoDeCasoById(id);
        
        return ResponseEntity.ok(response);
    }
}