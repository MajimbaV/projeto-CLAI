package com.ifpb.edu.br.clai.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.Pattern;
import java.util.UUID;

import com.ifpb.edu.br.clai.dto.rai.request.RaiRequestDto;
import com.ifpb.edu.br.clai.dto.rai.response.RaiResponseDto;
import com.ifpb.edu.br.clai.service.RaiService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping({"/rai", "/rais"})
@Validated
public class RaiController {

    private final RaiService raiService;

    public RaiController(RaiService raiService) {
        this.raiService = raiService;
    }

    @GetMapping
    public ResponseEntity<Page<RaiResponseDto>> getAllRais(
            @RequestParam(required = false)
            @Pattern(regexp = "^(?:\\s*|.{3,})$", message = "A busca por nome deve conter no mínimo 3 caracteres")
            String nomeAluno,
            @RequestParam(required = false)
            @Pattern(regexp = "^(?:\\s*|\\d+)$", message = "A matrícula para busca deve conter apenas números")
            String matriculaAluno,
            @RequestParam(required = false) UUID peaId,
            @RequestParam(required = false) UUID peiId,
            @PageableDefault(page = 0, size = 20) Pageable pageable
    ) {
        return ResponseEntity.ok(raiService.getAllRais(nomeAluno, matriculaAluno, peaId, peiId, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RaiResponseDto> getRaiById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(raiService.getRaiById(id));
    }

    @PostMapping
    public ResponseEntity<RaiResponseDto> createRai(@Valid @RequestBody RaiRequestDto request) {
        RaiResponseDto response = raiService.createRai(request);

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(response.id())
            .toUri();

        return ResponseEntity.created(location).body(response);
    }
}
