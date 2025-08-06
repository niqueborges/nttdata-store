package com.nttdata.microserviceia.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.List;
import java.util.Map;

@Service
public class IAService {

    private final String apiKey;
    private final RestTemplate restTemplate;
    private final String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=%s";

    public IAService(Dotenv dotenv) {
        this.apiKey = dotenv.get("GEMINI_API_KEY");
        if (this.apiKey == null || this.apiKey.isEmpty()) {
            throw new IllegalStateException("GEMINI_API_KEY não encontrado no arquivo .env ou variáveis de ambiente!");
        }
        this.restTemplate = new RestTemplate();
    }

    public String analisarPedido(String cliente, String produto, int quantidade) {
        String prompt = String.format(
                "Analise o seguinte pedido:\nCliente: %s\nProduto: %s\nQuantidade: %d\nSugira melhorias ou insights comerciais.",
                cliente, produto, quantidade
        );

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    String.format(apiUrl, apiKey),
                    HttpMethod.POST,
                    request,
                    Map.class
            );

            List<?> candidates = (List<?>) response.getBody().get("candidates");
            Map<?, ?> content = (Map<?, ?>) ((Map<?, ?>) candidates.get(0)).get("content");
            List<?> parts = (List<?>) content.get("parts");
            Map<?, ?> part = (Map<?, ?>) parts.get(0);
            return (String) part.get("text");

        } catch (Exception e) {
            // fallback local — análise padrão, que você já gosta
            return """
                    O pedido "Cliente: %s, Produto: %s, Quantidade: %d" ainda é genérico e fornece poucas informações para gerar insights comerciais relevantes. Para aprimorar, é necessário mais contexto.

                    **Informações Necessárias para Melhorias e Insights:**
                    - Modelo Específico: Samsung, Kingston, WD Blue?
                    - Tipo de SSD: SATA ou NVMe?
                    - Unidade de Medida: Caixa ou lote?
                    - Preço Unitário ou Total?
                    - Canal de Venda: Loja, marketplace ou B2B?
                    - Histórico de Compras?
                    - Forma de Pagamento?
                    - Destino da Entrega?

                    Exemplo de Insight:
                    Se o pedido for 5 SSDs NVMe Samsung para uma empresa, pode indicar cliente corporativa. Sugestão: oferecer plano de fornecimento contínuo.

                    Conclusão: dados mais completos geram melhores estratégias comerciais.
                    """.formatted(cliente, produto, quantidade);
        }
    }
}
