package com.esoe2013group1.smartscooter.repo;

import com.esoe2013group1.smartscooter.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Integer> {

}