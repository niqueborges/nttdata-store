package com.nttdata.microservicepedidos.controller;

import com.nttdata.microservicepedidos.client.ProdutoClient;
import com.nttdata.microservicepedidos.model.Pedido;
import com.nttdata.microservicepedidos.model.Produto;
import com.nttdata.microservicepedidos.repository.PedidoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final ProdutoClient produtoClient;

    public PedidoController(PedidoRepository pedidoRepository, ProdutoClient produtoClient) {
        this.pedidoRepository = pedidoRepository;
        this.produtoClient = produtoClient;
    }

    @PostMapping
    public Pedido criarPedido(@RequestBody Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    @GetMapping("/detalhes")
    public List<Map<String, Object>> listarPedidosComProdutosSemFiltro() {
        return listarPedidosComProdutos(null);
    }

    @PostMapping("/detalhes")
    public List<Map<String, Object>> listarPedidosComProdutosComFiltro(@RequestBody Map<String, Object> filtros) {
        return listarPedidosComProdutos(filtros);
    }

    private List<Map<String, Object>> listarPedidosComProdutos(Map<String, Object> filtros) {
        List<Produto> produtos = produtoClient.listarProdutos();
        List<Pedido> pedidos = pedidoRepository.findAll();

        // Se quiser, pode usar filtros aqui para filtrar pedidos antes de montar o resultado
        // Por enquanto ignora filtros se null

        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Pedido pedido : pedidos) {
            Map<String, Object> dados = new HashMap<>();
            dados.put("pedido", pedido);
            dados.put("produto", produtos.stream()
                    .filter(p -> p.getId().equals(pedido.getProdutoId()))
                    .findFirst()
                    .orElse(null));
            resultado.add(dados);
        }
        return resultado;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedido(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
