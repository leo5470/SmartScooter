package com.esoe2013group1.smartscooter;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialRepository
        extends JpaRepository<Credential, Integer> {
}
