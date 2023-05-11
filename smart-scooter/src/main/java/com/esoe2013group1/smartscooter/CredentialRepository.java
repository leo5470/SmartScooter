package com.esoe2013group1.smartscooter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CredentialRepository
        extends JpaRepository<Credential, Integer> {
    Credential findByUsername(String username);
}
