package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.AlunoRequestDto;
import com.ifpb.edu.br.clai.dto.AlunoResponseDto;
import com.ifpb.edu.br.clai.service.AlunoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping("/alunos")
public class AlunoController {
    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @PostMapping
    public ResponseEntity<AlunoResponseDto> createAluno(@Valid @RequestBody AlunoRequestDto dto){
        AlunoResponseDto response = alunoService.createAluno(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }
}
