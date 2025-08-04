package com.nttdata.microserviceia.controller;

import com.nttdata.microserviceia.service.IAService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@RestController
@RequestMapping("/ia")
public class IAController {

    private final IAService iaService;

    public IAController(IAService iaService) {
        this.iaService = iaService;
    }

    @PostMapping("/analisar")
    public Map<String, String> analisarPedido(@RequestBody Map<String, Object> body) {
        String cliente = (String) body.get("cliente");
        String produto = (String) body.get("produto");
        int quantidade = (Integer) body.get("quantidade");

        String analise = iaService.analisarPedido(cliente, produto, quantidade);

        return Map.of("analise", analise);
    }
}

