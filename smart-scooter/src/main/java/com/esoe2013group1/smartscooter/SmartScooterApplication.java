package com.esoe2013group1.smartscooter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SmartScooterApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartScooterApplication.class, args);
	}

	@GetMapping("/")
	public String home() {
		String description = new String(getClass().getPackageName());
		return description;
	}
}
