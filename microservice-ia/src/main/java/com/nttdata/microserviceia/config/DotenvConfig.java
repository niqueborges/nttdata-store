package com.nttdata.microserviceia.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {

    @Bean
    public Dotenv dotenv() {
        // Carrega o .env da raiz do projeto automaticamente
        return Dotenv.configure()
                .ignoreIfMissing() // se não tiver .env, não quebra
                .load();
    }
}

