package com.nttdata.microservicepedidos.model;

import lombok.Data;

@Data
public class Produto {
    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
}
