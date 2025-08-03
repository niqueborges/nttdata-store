package com.nttdata.microserviceprodutos.repository;

import com.nttdata.microserviceprodutos.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
