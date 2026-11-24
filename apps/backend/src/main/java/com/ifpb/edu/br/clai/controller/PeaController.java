package com.ifpb.edu.br.clai.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.UUID;

import com.ifpb.edu.br.clai.dto.pea.PeaRequestDto;
import com.ifpb.edu.br.clai.dto.pea.PeaResponseDto;
import com.ifpb.edu.br.clai.service.PeaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping("/peas")
@Validated
public class PeaController {
    private final PeaService peaService;

    public PeaController(PeaService peaService){
        this.peaService = peaService;
    }

    @PostMapping
    public ResponseEntity<PeaResponseDto> createPea(@Valid @RequestBody PeaRequestDto request) {
        PeaResponseDto response = peaService.createPea(request);

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(response.id())
            .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<PeaResponseDto>> getAllPeas(
            @RequestParam(required = false)
            @Size(min = 3, message = "A busca por nome deve conter no mínimo 3 caracteres")
            String nomeAluno,

            @RequestParam(required = false)
            @Pattern(regexp = "^\\d+$", message = "A matrícula para busca deve conter apenas números")
            String matriculaAluno,

            @RequestParam(required = false) UUID peiId,
            @RequestParam(required = false) Boolean statusAtivo,
            @PageableDefault(page = 0, size = 20) Pageable pageable
    ) {
        Page<PeaResponseDto> peas = peaService.getAllPeas(
                nomeAluno,
                matriculaAluno,
                peiId,
                statusAtivo,
                pageable
        );
        return ResponseEntity.ok(peas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PeaResponseDto> getPeaById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(peaService.getPeaById(id));
    }
}
