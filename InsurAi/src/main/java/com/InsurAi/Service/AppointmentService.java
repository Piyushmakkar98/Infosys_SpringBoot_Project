package com.InsurAi.Service;


import com.InsurAi.Entity.*;
import com.InsurAi.Entity.Appointment.AppointmentStatus;
import com.InsurAi.Repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AvailabilityRepository availabilityRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, AvailabilityRepository availabilityRepository) {
        this.appointmentRepository = appointmentRepository;
        this.availabilityRepository = availabilityRepository;
    }

    // ✅ User books an appointment with an agent
    @Transactional
    public Appointment bookAppointment(User user, User agent, LocalDate date, LocalTime time) {
        // 1️⃣ Check availability
        List<Availability> availableSlots = availabilityRepository.findByAgentAndDateAndIsBookedFalse(agent, date);

        Availability matchingSlot = availableSlots.stream()
                .filter(slot -> !time.isBefore(slot.getStartTime()) && !time.isAfter(slot.getEndTime()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No available slot for the selected time."));

        // 2️⃣ Create appointment
        Appointment appointment = Appointment.builder()
                .agent(agent)
                .user(user)
                .date(date)
                .time(time)
                .status(AppointmentStatus.SCHEDULED)
                .build();
        appointmentRepository.save(appointment);

        // 3️⃣ Mark slot as booked
        matchingSlot.setBooked(true);
        availabilityRepository.save(matchingSlot);

        return appointment;
    }

    // ✅ Get all appointments of a user
    public List<Appointment> getUserAppointments(User user) {
        return appointmentRepository.findByUser(user);
    }
}
