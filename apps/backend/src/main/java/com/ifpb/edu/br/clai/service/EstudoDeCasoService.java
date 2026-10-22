package com.ifpb.edu.br.clai.service;

import com.ifpb.edu.br.clai.repository.EstudoDeCasoRepository;
import org.springframework.stereotype.Service;

@Service
public class EstudoDeCasoService {

    private final EstudoDeCasoRepository estudoDeCasoRepository;

    public EstudoDeCasoService(EstudoDeCasoRepository estudoDeCasoRepository) {
        this.estudoDeCasoRepository = estudoDeCasoRepository;
    }


}
