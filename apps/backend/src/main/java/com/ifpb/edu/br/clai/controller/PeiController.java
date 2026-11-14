package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.pei.PeiRequestDto;
import com.ifpb.edu.br.clai.dto.pei.PeiResponseDto;
import com.ifpb.edu.br.clai.service.PeiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/peis")
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
}
