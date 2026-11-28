package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.pei.PeiRequestDto;
import com.ifpb.edu.br.clai.dto.pei.PeiResponseDto;
import com.ifpb.edu.br.clai.dto.pei.PeiUpdateRequestDto;
import com.ifpb.edu.br.clai.service.PeiService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping("/peis")
@Validated
public class PeiController {

    private final PeiService peiService;

    public PeiController(PeiService peiService) {
        this.peiService = peiService;
    }

    @PostMapping
    public ResponseEntity<PeiResponseDto> criar(@Valid @RequestBody PeiRequestDto request) {
        PeiResponseDto response = peiService.criar(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();
        return ResponseEntity.created(location).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<PeiResponseDto>> getAllPeis(
            @RequestParam(required = false)
            @Size(min = 3, message = "A busca por nome deve conter no mínimo 3 caracteres")
            String nomeAluno,

            @RequestParam(required = false)
            @Pattern(regexp = "^\\d+$", message = "A matrícula para busca deve conter apenas números")
            String matriculaAluno,

            @RequestParam(required = false)
            Boolean statusAtivo,

            @PageableDefault(page = 0, size = 20) Pageable pageable
    ) {
        Page<PeiResponseDto> peis = peiService.getAllPeis(nomeAluno, matriculaAluno, statusAtivo, pageable);
        return ResponseEntity.ok(peis);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PeiResponseDto> getPeiById(@PathVariable("id") UUID id) {
        PeiResponseDto response = peiService.getPeiById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PeiResponseDto> atualizar(
            @PathVariable("id") UUID id,
            @Valid @RequestBody PeiUpdateRequestDto request
    ) {
        return ResponseEntity.ok(peiService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desativar(@PathVariable("id") UUID id) {
        peiService.desativar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/ativar")
    public ResponseEntity<Void> ativar(@PathVariable("id") UUID id) {
        peiService.ativar(id);
        return ResponseEntity.noContent().build();
    }
}
