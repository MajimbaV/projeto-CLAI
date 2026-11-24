package com.ifpb.edu.br.clai.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ifpb.edu.br.clai.dto.rai.request.RaiRequestDto;
import com.ifpb.edu.br.clai.dto.rai.response.RaiResponseDto;
import com.ifpb.edu.br.clai.service.RaiService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping("/rais")
public class RaiController {

    private final RaiService raiService;

    public RaiController(RaiService raiService) {
        this.raiService = raiService;
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
