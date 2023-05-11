package com.esoe2013group1.smartscooter.repo;

import com.esoe2013group1.smartscooter.LoginStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginStatusRepository
        extends JpaRepository<LoginStatus, Integer> {
    // @Query("SELECT ls FROM LoginStatus ls WHERE ls.tok LIKE %?1%")
    LoginStatus findByTok(@Param("token") String token);
}
