package com.esoe2013group1.smartscooter;

import com.esoe2013group1.smartscooter.entity.*;
import com.esoe2013group1.smartscooter.exception.*;
import com.esoe2013group1.smartscooter.json.*;
import com.esoe2013group1.smartscooter.repo.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class SmartScooterApplication {
	// Repos
	private final CredentialRepository credentialRepository;
	private final ScooterRepository scooterRepository;
	private final LoginStatusRepository loginStatusRepository;
	private final UserRepository userRepository;

	// Jackson
	private final ObjectMapper mapper = new ObjectMapper();

	public SmartScooterApplication(CredentialRepository credentialRepository,
								   ScooterRepository scooterRepository,
								   LoginStatusRepository loginStatusRepository,
								   UserRepository userRepository) {
		this.credentialRepository = credentialRepository;
		this.scooterRepository = scooterRepository;
		this.loginStatusRepository = loginStatusRepository;
		this.userRepository = userRepository;
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
	public String signup(@RequestBody SignupData data){
		try{
			if(userRepository.existsByUsername(data.getUsername())){
				throw new UsernameInUseException(data.getUsername());
			}
			if(userRepository.existsByEmail(data.getEmail())){
				throw new EmailInUseException(data.getEmail());
			}

			UserData userData = new UserData(data);

			User user = new User(userData);

			Credential credential = new Credential(data);

			LoginStatus loginStatus = new LoginStatus();

			userRepository.saveAndFlush(user);
			credentialRepository.saveAndFlush(credential);
			loginStatusRepository.saveAndFlush(loginStatus);

			GeneralJSON generalJSON = new GeneralJSON(true, "");
			return generalJSON.makeJson(mapper);
		}catch(Exception e){
			System.out.println(e.getMessage());
			GeneralJSON generalJSON = new GeneralJSON(false, e.getMessage());
			return generalJSON.makeJson(mapper);
		}
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
				LoginStatus status = loginStatusRepository.findById(credit.getId()).orElseThrow();
				if(status.getTok() != null){
					throw new ActiveSessionException(data.getUsername());
				}
				status.setTok(token);
				status.setLogin(true);
				loginStatusRepository.saveAndFlush(status);
				LoginJSON loginJSON = new LoginJSON(true, token, "");
				return loginJSON.makeJson(mapper);
			} else{
				throw new AuthFailedException();
			}
		}catch (Exception e) {
			System.out.println(e.getMessage());
			LoginJSON loginJSON = new LoginJSON(false, "", e.getMessage());
			return loginJSON.makeJson(mapper);
		}
	}

	// Passed
	@GetMapping("/api/logout")
	public String logout(@RequestHeader("token") String token){
		try{
			LoginStatus status = loginStatusRepository.findByTok(token);
			if(status == null){
				throw new TokenDoesNotExistException();
			}
			status.setLogin(false);
			status.setTok(null);
			loginStatusRepository.saveAndFlush(status);
			System.out.println("Token " + token + " logged out.");
			GeneralJSON generalJSON = new GeneralJSON(true, "");
			return generalJSON.makeJson(mapper);
		} catch (Exception e){
			System.out.println(e.getMessage());
			GeneralJSON generalJSON = new GeneralJSON(false, e.getMessage());
			return generalJSON.makeJson(mapper);
		}
	}

	// Passed
	@PostMapping("/api/update-userinfo")
	public String updateUserInfo(@RequestHeader("token") String token, @RequestBody UserData userData){
		try{
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if (loginStatus == null) {
				throw new TokenDoesNotExistException();
			}
			int id = loginStatus.getId();
			if(userData.getId() != id){
				throw new InvalidSessionException();
			}

			User user = userRepository.findById(id).orElseThrow();

			user.copyFromData(userData);

			userRepository.saveAndFlush(user);

			GeneralJSON generalJSON = new GeneralJSON(true, "");
			return generalJSON.makeJson(mapper);
		}catch (Exception e){
			System.out.println(e.getMessage());
			GeneralJSON generalJSON = new GeneralJSON(false, e.getMessage());
			return generalJSON.makeJson(mapper);
		}
	}

	// Passed
	@GetMapping("/api/get-userinfo")
	public String getUserInfo(@RequestHeader("token") String token){
		try{
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null){
				throw new TokenDoesNotExistException();
			}
			Integer id = loginStatus.getId();
			User user = userRepository.findById(id).orElseThrow(InvalidSessionException::new);

			UserData userData = new UserData(user);

			UserDataJSON userDataJSON = new UserDataJSON(userData);

			return userDataJSON.makeJson(mapper);

		}catch (Exception e){
			System.out.println(e.getMessage());
			UserDataJSON userDataJSON = new UserDataJSON(e.getMessage());
			return userDataJSON.makeJson(mapper);
		}
	}
}
