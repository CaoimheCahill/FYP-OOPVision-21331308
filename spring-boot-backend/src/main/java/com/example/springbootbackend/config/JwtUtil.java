package com.example.springbootbackend.config;

import com.example.springbootbackend.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private Key getSigningKey() {
        String SECRET = "ik8cFZzqEq4ZqFj6uDs4j39VtRl0Cw8+lfvGZScqpSM=";
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(User user) {
        long EXPIRATION_TIME = 86400000;
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("userId", user.getUserId())
                .claim("role", user.getUserRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims validateToken(String token) throws JwtException {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
