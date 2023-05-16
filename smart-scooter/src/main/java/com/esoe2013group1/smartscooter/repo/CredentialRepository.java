package com.esoe2013group1.smartscooter.repo;

import com.esoe2013group1.smartscooter.entity.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CredentialRepository
        extends JpaRepository<Credential, Integer> {
    Credential findByUsername(String username);
}
