package com.nttdata.microservicepedidos.client;

import com.nttdata.microservicepedidos.model.Produto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "microservice-produtos")
public interface ProdutoClient {
    @GetMapping("/produtos")
    List<Produto> listarProdutos();
}
