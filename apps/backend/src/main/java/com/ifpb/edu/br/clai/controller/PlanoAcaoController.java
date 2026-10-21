package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.PlanoAcaoRequestDto;
import com.ifpb.edu.br.clai.dto.PlanoAcaoResponseDto;
import com.ifpb.edu.br.clai.service.PlanoAcaoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping("/plano-acao")
public class PlanoAcaoController {
    private final PlanoAcaoService planoAcaoService;

    public PlanoAcaoController(PlanoAcaoService planoAcaoService){
        this.planoAcaoService = planoAcaoService;
    }

    @PostMapping
    ResponseEntity<PlanoAcaoResponseDto> createPlanoAcao(@Valid @RequestBody PlanoAcaoRequestDto dto){
        PlanoAcaoResponseDto response = planoAcaoService.createPlanoAcao(dto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("{/id}").buildAndExpand(response.id()).toUri();

        return ResponseEntity.created(location).body(response);
    }
}
