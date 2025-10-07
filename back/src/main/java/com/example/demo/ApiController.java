package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;

@RestController
public class ApiController {

    @Value("${betaseries.api.key}")
    private String apiKey;

    @RequestMapping("/test")
    public String test() {
        return "Testing API controller!";
    }

    @GetMapping(value = "/shows")
    public Object getShows() {
        String url = "https://api.betaseries.com/shows/list";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-BetaSeries-Key", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Object> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                Object.class);
        return response.getBody();
    }
}
