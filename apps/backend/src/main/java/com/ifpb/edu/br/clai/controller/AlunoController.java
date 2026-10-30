package com.ifpb.edu.br.clai.controller;

import com.ifpb.edu.br.clai.dto.aluno.AlunoRequestDto;
import com.ifpb.edu.br.clai.dto.aluno.AlunoResponseDto;
import com.ifpb.edu.br.clai.service.AlunoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import java.net.URI;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //Alterar isso quando fizer deploy
@RequestMapping("/alunos")
public class AlunoController {
    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @GetMapping
    public ResponseEntity<Page<AlunoResponseDto>> getAllAlunos(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String matricula,
            @RequestParam(required = false) String curso,
            @RequestParam(required = false) String periodo,
            @RequestParam(required = false) Boolean maioridade,
            @RequestParam(required = false) Boolean statusAtivo,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        Page<AlunoResponseDto> alunos = alunoService.getAllAlunos(
                nome, matricula, curso, periodo, maioridade, statusAtivo, pageable);

        return ResponseEntity.ok(alunos);
    }

    @GetMapping("/matricula/{matricula}")
    public ResponseEntity<AlunoResponseDto> getAlunoById(@PathVariable("matricula") String matricula) {
        AlunoResponseDto response = alunoService.getAlunoByMatricula(matricula);
        return ResponseEntity.ok(response);
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

    @PutMapping("/{id}")
    public ResponseEntity<AlunoResponseDto> updateAluno(@PathVariable("id") UUID id, @Valid @RequestBody AlunoRequestDto dto) {
        AlunoResponseDto response = alunoService.updateAluno(id, dto);
        return ResponseEntity.ok(response);
    }
}
