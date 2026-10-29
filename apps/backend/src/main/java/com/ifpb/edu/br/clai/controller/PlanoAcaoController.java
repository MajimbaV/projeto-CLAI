package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.PlanoAcaoRequestDto;
import com.ifpb.edu.br.clai.dto.PlanoAcaoResponseDto;
import com.ifpb.edu.br.clai.service.PlanoAcaoService;
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
@RequestMapping("/plano-acao")
@Validated
public class PlanoAcaoController {
    private final PlanoAcaoService planoAcaoService;

    public PlanoAcaoController(PlanoAcaoService planoAcaoService){
        this.planoAcaoService = planoAcaoService;
    }

    @PostMapping
    ResponseEntity<PlanoAcaoResponseDto> createPlanoAcao(@Valid @RequestBody PlanoAcaoRequestDto dto){
        PlanoAcaoResponseDto response = planoAcaoService.createPlanoAcao(dto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(response.id()).toUri();

        return ResponseEntity.created(location).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<PlanoAcaoResponseDto>> getAllPlanoAcao(
            @RequestParam(required = false)
            @Size(min = 3, message = "A busca por nome deve conter no mínimo 3 caracteres")
            String nomeAluno,

            @RequestParam(required = false)
            @Pattern(regexp = "^\\d+$", message = "A matrícula para busca deve conter apenas números")
            String matriculaAluno,

            @RequestParam(required = false)
            Boolean statusAtivo,

            @PageableDefault(page = 0, size = 20) Pageable pageable) {

        return ResponseEntity.ok(planoAcaoService.getAllPlanoAcao(nomeAluno, matriculaAluno, statusAtivo, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanoAcaoResponseDto> getPlanoAcaoById(@PathVariable("id") UUID id) {

        PlanoAcaoResponseDto response = planoAcaoService.getPlanoAcaoById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanoAcaoResponseDto> updatePlanoAcao(@PathVariable("id") UUID id, @Valid @RequestBody PlanoAcaoRequestDto request) {
        PlanoAcaoResponseDto response = planoAcaoService.updatePlanoAcao(id, request);

        return ResponseEntity.ok(response);
    }
}
