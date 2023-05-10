package com.esoe2013group1.smartscooter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class SmartScooterApplication {

	private final CredentialRepository credentialRepository;

	public SmartScooterApplication(CredentialRepository credentialRepository) {
		this.credentialRepository = credentialRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(SmartScooterApplication.class, args);
	}

	@GetMapping("/api")
	public String home() {
		String description = getClass().getPackageName();
		return description;
	}

	// Test function of credentialRepository
	@GetMapping("/api/admin/users")
	public Object getUsers() {
		return credentialRepository.findAll();
	}

	// Signup function test: Postman 200 OK
	@PostMapping("/api/signup")
	public boolean signup(@RequestBody SignupData data){
		System.out.println(data.toString());
		return true;
	}

	// Login function test: Postman 200 OK
	@PostMapping("/api/login")
	public String login(@RequestBody LoginData data){
		System.out.println(data.toString());
		return """
				{
					"success": true,
					"token": "不是不爆，十秒未到",
					"user": "桐谷和人"
				}""";
	}

	@PostMapping("/api/logout")
	public boolean logout(@RequestBody String token){
		System.out.println(token);
		return true;
	}
}
