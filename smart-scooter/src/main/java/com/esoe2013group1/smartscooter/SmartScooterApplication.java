package com.esoe2013group1.smartscooter;

import com.esoe2013group1.smartscooter.entity.*;
import com.esoe2013group1.smartscooter.exception.*;
import com.esoe2013group1.smartscooter.json.*;
import com.esoe2013group1.smartscooter.repo.*;
import com.esoe2013group1.smartscooter.data.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PreDestroy;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
public class SmartScooterApplication {
	// Repos
	private final CredentialRepository credentialRepository;
	private final ScooterRepository scooterRepository;
	private final LoginStatusRepository loginStatusRepository;
	private final UserRepository userRepository;
	private final StationRepository stationRepository;
	private final OrderStatusRepository orderStatusRepository;

	// Jackson
	private static final ObjectMapper mapper = new ObjectMapper();


	public SmartScooterApplication(CredentialRepository credentialRepository,
								   ScooterRepository scooterRepository,
								   LoginStatusRepository loginStatusRepository,
								   UserRepository userRepository,
								   StationRepository stationRepository,
								   OrderStatusRepository orderStatusRepository) {
		this.credentialRepository = credentialRepository;
		this.scooterRepository = scooterRepository;
		this.loginStatusRepository = loginStatusRepository;
		this.userRepository = userRepository;
		this.stationRepository = stationRepository;
		this.orderStatusRepository = orderStatusRepository;
	}

	public static void main(String[] args) {
		mapper.registerModule(new JavaTimeModule());
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
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
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
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
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
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
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
			OrderStatus orderStatus = orderStatusRepository.findByUserIDAndActive(id, true);
			if(orderStatus != null){
				Location lastLocation = orderStatus.getLastLocation();
				if(!lastLocation.equals(userData.getLocation())){
					orderStatus.addLocation(userData.getLocation());
					orderStatus.calcDistance();
					Scooter scooter = scooterRepository.findById(orderStatus.getScooterID()).orElseThrow();
					if(orderStatus.batteryDrop() && scooter.getBattery_level() != 0){
						scooter.dropBatteryLevel();
					}
					scooter.setLat(userData.getLocation().getLat());
					scooter.setLng(userData.getLocation().getLng());

					scooterRepository.saveAndFlush(scooter);
					orderStatusRepository.saveAndFlush(orderStatus);

				}

			}

			user.copyFromData(userData);

			if(!userRepository.findByUsername(userData.getUsername()).getId().equals(userData.getId())){
				throw new UsernameInUseException(userData.getUsername());
			}

			if(!userRepository.findByUsername(userData.getUsername()).getEmail().equals(userData.getEmail())){
				throw new EmailInUseException(userData.getUsername());
			}

			userRepository.saveAndFlush(user);

			GeneralJSON generalJSON = new GeneralJSON(true, "");
			return generalJSON.makeJson(mapper);
		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
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
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			UserDataJSON userDataJSON = new UserDataJSON(e.getMessage());
			return userDataJSON.makeJson(mapper);
		}
	}

	@GetMapping(value = {"/api/user/search/scooter", "/api/admin/search/scooter"})
	public String userSearchScooter(@RequestHeader("token") String token, @RequestParam int range, HttpServletRequest request){
		try {
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null) {
				throw new TokenDoesNotExistException();
			}

			int id = loginStatus.getId();
			Credential credential = credentialRepository.findById(id).orElseThrow();
			if(request.getRequestURI().equals("/api/admin/search/scooter") && !credential.getAdmin()){
				throw new PermissionDeniedException();
			}

			User user = userRepository.findById(id).orElseThrow();
			Location location = new Location(user.getLat(), user.getLng());

			Location eastMostCoordinate = Location.getCoordinate(location, Location.Direction.EAST, range);
			Location westMostCoordinate = Location.getCoordinate(location, Location.Direction.WEST, range);
			Location northMostCoordinate = Location.getCoordinate(location, Location.Direction.NORTH, range);
			Location southMostCoordinate = Location.getCoordinate(location, Location.Direction.SOUTH, range);

			double maxLng = northMostCoordinate.getLng();
			double minLng = southMostCoordinate.getLng();
			double maxLat = eastMostCoordinate.getLat();
			double minLat = westMostCoordinate.getLat();

			List<Scooter> scooterList;
			if(request.getRequestURI().equals("/api/admin/search/scooter")) {
				scooterList = scooterRepository.findAllByLatBetweenAndLngBetween(minLat, maxLat, minLng, maxLng);
			} else{
				scooterList = scooterRepository.findAllByLatBetweenAndLngBetweenAndStatus
												(minLat, maxLat, minLng, maxLng, "ready");
			}

			List<ScooterData> scooterDataList = new ArrayList<>();
			for(Scooter scooter : scooterList){
				boolean add = scooterDataList.add(new ScooterData(scooter)); // always return true
			}

			ListJSON<ScooterData> listJSON = new ListJSON<>(scooterDataList);

			return listJSON.makeJson(mapper);

		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			ListJSON<Object> listJSON = new ListJSON<>(e.getMessage());
			return listJSON.makeJson(mapper);
		}
	}

	@GetMapping("/api/user/search/station")
	public String userSearchStation(@RequestHeader("token") String token, @RequestParam int range){
		try {
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null) {
				throw new TokenDoesNotExistException();
			}

			int id = loginStatus.getId();
			User user = userRepository.findById(id).orElseThrow();
			Location location = new Location(user.getLat(), user.getLng());

			Location eastMostCoordinate = Location.getCoordinate(location, Location.Direction.EAST, range);
			Location westMostCoordinate = Location.getCoordinate(location, Location.Direction.WEST, range);
			Location northMostCoordinate = Location.getCoordinate(location, Location.Direction.NORTH, range);
			Location southMostCoordinate = Location.getCoordinate(location, Location.Direction.SOUTH, range);

			double maxLng = northMostCoordinate.getLng();
			double minLng = southMostCoordinate.getLng();
			double maxLat = eastMostCoordinate.getLat();
			double minLat = westMostCoordinate.getLat();

			List<Station> stationList;
			stationList = stationRepository.findAllByLatBetweenAndLngBetween(minLat, maxLat, minLng, maxLng);

			List<StationData> stationDataList = new ArrayList<>();
			for(Station station : stationList){
				boolean add = stationDataList.add(new StationData(station)); // always return true
			}


			ListJSON<StationData> listJSON = new ListJSON<>(stationDataList);

			return listJSON.makeJson(mapper);

		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			ListJSON<Object> listJSON = new ListJSON<>(e.getMessage());
			return listJSON.makeJson(mapper);
		}
	}
	@PostMapping("/api/user/rent")
	public String rent(@RequestHeader("token") String token, @RequestBody ScooterID scooterIDObj){
		try{
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null){
				throw new TokenDoesNotExistException();
			}

			int userId = loginStatus.getId();
			User user = userRepository.findById(userId).orElseThrow();

			if(orderStatusRepository.existsByUserIDAndActive(userId, true)){
				throw new ActiveOrderException();
			}

			int scooterID = scooterIDObj.getId();
			Scooter scooter = scooterRepository.findById(scooterID).orElseThrow();
			if(!Location.checkInRange(user.getLat(), user.getLng(), scooter.getLat(), scooter.getLng())){
				throw new OutOfReachException(scooter);
			}

			if(!(scooter.getStatus().equals("ready"))){
				throw new ScooterUnavailableException(scooter.getStatus());
			}
			scooter.setStatus("rented");

			LocalDateTime rentTime = LocalDateTime.now();
			Location location = new Location(user.getLat(), user.getLng());

			OrderStatus orderStatus = new OrderStatus(userId, scooterID, location, rentTime);
			orderStatusRepository.saveAndFlush(orderStatus);

			scooterRepository.saveAndFlush(scooter);

			GeneralJSON generalJSON = new GeneralJSON(true, "");
			return generalJSON.makeJson(mapper);
		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			GeneralJSON generalJSON = new GeneralJSON(false, e.getMessage());
			return generalJSON.makeJson(mapper);
		}
	}

	// Passed
	@GetMapping("/api/user/active-order")
	public String activeOrder(@RequestHeader("token") String token){
		try{
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null){
				throw new TokenDoesNotExistException();
			}
			int userId = loginStatus.getId();
			OrderStatus orderStatus = orderStatusRepository.findByUserIDAndActive(userId, true);
			if(orderStatus == null){
				throw new NoActiveOrderException();
			}

			OrderData orderData = new OrderData(orderStatus);

			OrderJSON orderJSON = new OrderJSON(orderData);
			return orderJSON.makeJson(mapper);
		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			OrderJSON orderJSON = new OrderJSON(e.getMessage());
			return orderJSON.makeJson(mapper);
		}
	}

	// TODO: Test
	@GetMapping("/api/user/past-order")
	public String pastOrder(@RequestHeader("token") String token, @RequestParam int limit, @RequestParam int offset){
		try {
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null){
				throw new TokenDoesNotExistException();
			}
			int userId = loginStatus.getId();
			List<OrderStatus> allOrderStatusList = orderStatusRepository.findAllByUserIDAndActive(userId, false);
			List<OrderStatus> requestedList = allOrderStatusList.subList(offset, limit > allOrderStatusList.size() ?
					allOrderStatusList.size() : limit);

			List<OrderData> orderDataList = new ArrayList<>();
			for(OrderStatus orderStatus : requestedList){
				boolean add = orderDataList.add(new OrderData(orderStatus));
			}
			ListJSON<OrderData> listJSON = new ListJSON<>(orderDataList);
			return listJSON.makeJson(mapper);
		} catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			ListJSON<Object> listJSON = new ListJSON<>(e.getMessage());
			return listJSON.makeJson(mapper);
		}
	}

	@GetMapping("/api/get-plate")
	public String getPlate(@RequestParam int scooter_id){
		try{
			Scooter scooter = scooterRepository.findById(scooter_id).orElseThrow();
			String plate = scooter.getPlate();
			PlateJSON plateJSON = new PlateJSON(plate);
			return plateJSON.makeJson(mapper);
		} catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			PlateJSON plateJSON = new PlateJSON(false, e.getMessage());
			return plateJSON.makeJson(mapper);
		}
	}

	@GetMapping("/api/user/get-battery")
	public String getBattery(@RequestHeader("token") String token){
		try{
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null){
				throw new TokenDoesNotExistException();
			}
			int userId = loginStatus.getId();

			OrderStatus orderStatus = orderStatusRepository.findByUserIDAndActive(userId, true);
			if(orderStatus == null){
				throw new NoActiveOrderException();
			}
			Scooter scooter = scooterRepository.findById(orderStatus.getScooterID()).orElseThrow();

			Integer battery = scooter.getBattery_level();

			BatteryJSON batteryJSON = new BatteryJSON(battery);
			return batteryJSON.makeJson(mapper);
		} catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			BatteryJSON batteryJSON = new BatteryJSON(e.getMessage());
			return batteryJSON.makeJson(mapper);
		}
	}

	@PostMapping("/api/user/recharge")
	public String userRecharge(@RequestHeader("token") String token, @RequestBody StationID stationID){
		try {
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null){
				throw new TokenDoesNotExistException();
			}
			int userId = loginStatus.getId();

			OrderStatus orderStatus = orderStatusRepository.findByUserIDAndActive(userId, true);
			if(orderStatus == null){
				throw new NoActiveOrderException();
			}

			Station station = stationRepository.findById(stationID.getId()).orElseThrow();

			User user = userRepository.findById(userId).orElseThrow();
			if(!Location.checkInRange(user.getLat(), user.getLng(), station.getLat(), station.getLng())){
				throw new OutOfReachException(station);
			}
			user.addCoupon();
			orderStatus.addChargeTimes();

			int scooterId = orderStatus.getScooterID();
			Scooter scooter = scooterRepository.findById(scooterId).orElseThrow();
			scooter.setBattery_level(100);
			scooterRepository.saveAndFlush(scooter);
			userRepository.saveAndFlush(user);

			GeneralJSON generalJSON = new GeneralJSON(true, "");
			return generalJSON.makeJson(mapper);
		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			GeneralJSON generalJSON = new GeneralJSON(false, e.getMessage());
			return generalJSON.makeJson(mapper);
		}
	}

	@PostMapping("/api/user/return")
	public String returnScooter(@RequestHeader("token") String token, @RequestBody ReturnData returnData){
		try {
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if(loginStatus == null){
				throw new TokenDoesNotExistException();
			}
			int userId = loginStatus.getId();
			OrderStatus orderStatus = orderStatusRepository.findByUserIDAndActive(userId, true);
			if(orderStatus == null){
				throw new NoActiveOrderException();
			}

			LocalDateTime returnTime = LocalDateTime.now();
			orderStatus.setReturnTime(returnTime);

			orderStatus.calcTotalTime();

			int price = orderStatus.settle(returnData.isUseCoupon());

			if(returnData.isUseCoupon()){
				User user = userRepository.findById(userId).orElseThrow();
				if(user.getCoupons() < 1){
					throw new CouponNotAvailableException();
				}
				user.useCoupon();
				orderStatus.setUseCoupon(true);
				userRepository.saveAndFlush(user);
			}

			Scooter scooter = scooterRepository.findById(orderStatus.getScooterID()).orElseThrow();
			if(scooter.getBattery_level() == 0){
				scooter.setStatus("malfunction");
			}else{
				scooter.setStatus("ready");
			}
			scooterRepository.saveAndFlush(scooter);

			orderStatus.setActive(false);
			orderStatusRepository.saveAndFlush(orderStatus);

			ReturnJSON returnJSON = new ReturnJSON(price);
			return returnJSON.makeJson(mapper);
		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			ReturnJSON returnJSON = new ReturnJSON(e.getMessage());
			return returnJSON.makeJson(mapper);
		}
	}

	@PostMapping("/api/admin/repair")
	public String adminRepair(@RequestHeader("token") String token, @RequestBody ScooterID scooterID){
		try{
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if (loginStatus == null) {
				throw new TokenDoesNotExistException();
			}
			int id = loginStatus.getId();
			Credential credential = credentialRepository.findById(id).orElseThrow();
			if(!credential.getAdmin()){
				throw new PermissionDeniedException();
			}

			Scooter scooter = scooterRepository.findById(scooterID.getId()).orElseThrow();
			scooter.setStatus("ready");
			scooter.setBattery_level(100);

			GeneralJSON generalJSON = new GeneralJSON(true, "");
			return generalJSON.makeJson(mapper);

		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			GeneralJSON generalJSON = new GeneralJSON(false, e.getMessage());
			return generalJSON.makeJson(mapper);
		}
	}

	@PostMapping("/api/admin/set-admin")
	public String setAdmin(@RequestHeader("token") String token, @RequestBody Username username){
		try{
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if (loginStatus == null) {
				throw new TokenDoesNotExistException();
			}
			int id = loginStatus.getId();
			Credential adminCredential = credentialRepository.findById(id).orElseThrow();
			if(!adminCredential.getAdmin()){
				throw new PermissionDeniedException();
			}

			User user = userRepository.findByUsername(username.getName());
			int userID = user.getId();

			Credential userCredential = credentialRepository.findById(userID).orElseThrow();
			userCredential.setAdmin(true);
			credentialRepository.saveAndFlush(userCredential);

			GeneralJSON generalJSON = new GeneralJSON(true, "");
			return generalJSON.makeJson(mapper);
		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			GeneralJSON generalJSON = new GeneralJSON(false, e.getMessage());
			return generalJSON.makeJson(mapper);
		}
	}

	@GetMapping("/api/admin/is-admin")
	public ResponseEntity<?> isAdmin(@RequestHeader("token") String token){
		try{
			LoginStatus loginStatus = loginStatusRepository.findByTok(token);
			if (loginStatus == null) {
				throw new TokenDoesNotExistException();
			}
			int id = loginStatus.getId();
			Credential credential = credentialRepository.findById(id).orElseThrow();
			if(!credential.getAdmin()){
				throw new PermissionDeniedException();
			}
			return new ResponseEntity<>(HttpStatus.OK);
		}catch (Exception e){
			System.out.println(e.getClass().getName() + ": " + e.getMessage());
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
	}

	@PreDestroy
	private void destroy(){
		List<LoginStatus> loginStatusList = loginStatusRepository.findAll();
		for(LoginStatus loginStatus : loginStatusList){
			loginStatus.setLogin(false);
			loginStatus.setTok(null);
			loginStatusRepository.saveAndFlush(loginStatus);
		}
		System.out.println("All loginStatus cleaned up.");

		List<Scooter> scooterList = scooterRepository.findAll();
		for(Scooter scooter : scooterList){
			if(scooter.getStatus().equals("rented")){
				scooter.setStatus("malfunction");
				scooterRepository.saveAndFlush(scooter);
			}
		}
		System.out.println("All scooter cleaned up");

		List<OrderStatus> orderStatusList = orderStatusRepository.findAllByActive(true);
		for (OrderStatus orderStatus : orderStatusList){
			orderStatus.setActive(false);
			LocalDateTime returnTime = LocalDateTime.now();
			orderStatus.setReturnTime(returnTime);
			orderStatus.calcTotalTime();
			orderStatus.setPrice(0);
		}
		System.out.println("All order cleaned up");
	}
}
