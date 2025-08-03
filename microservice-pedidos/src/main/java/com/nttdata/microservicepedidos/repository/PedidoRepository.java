package com.nttdata.microservicepedidos.repository;

import com.nttdata.microservicepedidos.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
