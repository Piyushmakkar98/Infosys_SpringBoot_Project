package com.InsurAi.Controller;

import com.InsurAi.Entity.User;
import com.InsurAi.Entity.Appointment;
import com.InsurAi.Repository.UserRepository;

import jakarta.transaction.Transactional;

import com.InsurAi.Repository.AppointmentRepository;
import com.InsurAi.Repository.AvailabilityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminController {

    private final UserRepository userRepository;
    private final AvailabilityRepository availabilityRepository;
    private final AppointmentRepository appointmentRepository;

    public AdminController(UserRepository userRepository,
                           AvailabilityRepository availabilityRepository,
                           AppointmentRepository appointmentRepository) {
        this.userRepository = userRepository;
        this.availabilityRepository = availabilityRepository;
        this.appointmentRepository = appointmentRepository;
    }

    // ✅ Fetch all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Delete a user by ID
    @Transactional
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        // 1️⃣ Delete all availability entries for this user first
        availabilityRepository.deleteByAgentId(id);

        // 2️⃣ Optionally: delete appointments if you want
        appointmentRepository.deleteByUserId(id);

        // 3️⃣ Delete the user
        userRepository.deleteById(id);
    }

    // ✅ Fetch all bookings (appointments)
    @GetMapping("/users/bookings")
    public List<Appointment> getAllBookings() {
        return appointmentRepository.findAll();
    }
}
