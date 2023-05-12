package com.esoe2013group1.smartscooter;

import com.esoe2013group1.smartscooter.exception.*;
import com.esoe2013group1.smartscooter.repo.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class SmartScooterApplication {

	private final CredentialRepository credentialRepository;
	private final ScooterRepository scooterRepository;
	private final LoginStatusRepository loginStatusRepository;

	public SmartScooterApplication(CredentialRepository credentialRepository,
								   ScooterRepository scooterRepository,
								   LoginStatusRepository loginStatusRepository) {
		this.credentialRepository = credentialRepository;
		this.scooterRepository = scooterRepository;
		this.loginStatusRepository = loginStatusRepository;

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

	// Passed
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
				LoginStatus status = loginStatusRepository.getReferenceById(credit.getId());
				if(status.getTok() != null){
					throw new ActiveSessionException(data.getUsername());
				}
				status.setTok(token);
				status.setLogin(true);
				loginStatusRepository.saveAndFlush(status);
				return String.format("""
				{
					"success": true,
					"token": "%s",
					"message": ""
				}""", token);
			} else{
				throw new AuthFailedException();
			}
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return String.format("""
					{
						"success": false,
						"message": "%s"
					}""", e.getMessage());
		}
	}

	// Passed
	@PostMapping("/api/logout")
	public boolean logout(@RequestBody Token token){
		LoginStatus status = loginStatusRepository.findByTok(token.getToken()); // Can't get status: NullPointerException
		status.setLogin(false);
		status.setTok(null);
		loginStatusRepository.saveAndFlush(status);
		System.out.println("Token " + token + " logged out.");
		return true;
	}
}
