package com.InsurAi.Controller;

import com.InsurAi.Entity.*;
import com.InsurAi.Repository.UserRepository;
import com.InsurAi.Service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    private final AppointmentService appointmentService;
    private final UserRepository userRepository;

    public BookingController(AppointmentService appointmentService,UserRepository userRepository) {
        this.appointmentService = appointmentService;
        this.userRepository = userRepository;
    }

    // ✅ User books an appointment
    @PostMapping("/book")
    public Appointment bookAppointment(
    		@RequestParam String userEmail,
            @RequestParam Long agentId,
            @RequestParam String date,
            @RequestParam String time
    ) {
    	User user = userRepository.findByEmail(userEmail)
    		.orElseThrow(() -> new RuntimeException("User not found"));

        User agent = new User();
        agent.setId(agentId);

        return appointmentService.bookAppointment(user, agent, LocalDate.parse(date), LocalTime.parse(time));
    }

    // ✅ Get all appointments for a user
    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        return appointmentService.getUserAppointments(user);
    }
}
