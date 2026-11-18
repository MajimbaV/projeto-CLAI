package com.ifpb.edu.br.clai.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ifpb.edu.br.clai.dto.pea.PeaRequestDto;
import com.ifpb.edu.br.clai.dto.pea.PeaResponseDto;
import com.ifpb.edu.br.clai.service.PeaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping("/peas")
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
}
