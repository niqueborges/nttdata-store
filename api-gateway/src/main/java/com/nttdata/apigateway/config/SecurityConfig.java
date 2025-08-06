package com.nttdata.apigateway.config; // Verifique se o nome do pacote está correto

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebFluxSecurity // Anotação chave para aplicações reativas (Gateway)
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        System.out.println(">>> CARREGANDO CONFIGURAÇÃO DE SEGURANÇA E CORS DO API GATEWAY...");

        http
                // 1. Habilita o CORS usando a configuração do bean abaixo
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2. Desabilita o CSRF, comum para gateways de API
                .csrf(ServerHttpSecurity.CsrfSpec::disable)

                // 3. Define as regras de autorização
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/**").permitAll() // Permite todas as rotas por enquanto
                        .anyExchange().authenticated()
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // A origem do seu frontend React
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));

        // Métodos permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Cabeçalhos permitidos
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // Permite o envio de credenciais (se necessário)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica esta configuração a todas as rotas (/**) do gateway
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}



