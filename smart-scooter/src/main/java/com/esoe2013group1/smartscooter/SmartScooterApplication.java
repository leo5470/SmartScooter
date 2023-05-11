package com.esoe2013group1.smartscooter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class SmartScooterApplication {

	private final CredentialRepository credentialRepository;
	private final ScooterRepository scooterRepository;

	public SmartScooterApplication(CredentialRepository credentialRepository,
								   ScooterRepository scooterRepository) {
		this.credentialRepository = credentialRepository;
		this.scooterRepository = scooterRepository;

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
		Credential credit = credentialRepository.findByUsername(data.getUsername());
		try{
			if(credit == null){
				throw new UserDoesNotExistException(data.getUsername());
			}
			if(credit.getPassword().equals(data.getPassword())){
				System.out.println(data.getUsername() + " login attempt successful");
				String token = Token.generateToken();
				return String.format("""
				{
					"success": true,
					"token": %s,
					"user": "桐谷和人"
				}""", token);
			}
			else{
				throw new AuthFailedException();
			}
		}catch (Exception e) {
			return e.getMessage();
		}
	}

	@PostMapping("/api/logout")
	public boolean logout(@RequestBody String token){
		System.out.println(token);
		return true;
	}
}
