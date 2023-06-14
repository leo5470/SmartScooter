package com.esoe2013group1.smartscooter.repo;

import com.esoe2013group1.smartscooter.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface OrderStatusRepository extends
        JpaRepository<OrderStatus, Integer> {
    OrderStatus findByUserIDAndActive(Integer id, boolean active);

    ArrayList<OrderStatus> findAllByUserIDAndActive(Integer id, boolean active);

    Boolean existsByUserIDAndActive(Integer id, boolean active);
}
