package com.esoe2013group1.smartscooter.repo;

import com.esoe2013group1.smartscooter.entity.LoginStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginStatusRepository
        extends JpaRepository<LoginStatus, Integer> {
    LoginStatus findByTok(String token);

    List<LoginStatus> findAllByLogin(boolean login);
}
