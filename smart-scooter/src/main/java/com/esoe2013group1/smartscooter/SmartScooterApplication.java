package com.esoe2013group1.smartscooter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SmartScooterApplication {

	private CredentialRepository credentialRepository;

	public SmartScooterApplication(CredentialRepository credentialRepository) {
		this.credentialRepository = credentialRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(SmartScooterApplication.class, args);
	}

	@GetMapping("/api")
	public String home() {
		String description = "Hello World";
		return description;
	}

	@GetMapping("/api/admin/users")
	public Object getUsers(){
		return credentialRepository.findAll();
	}
}
