package com.InsurAi.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data                   // ✅ generates getters, setters, toString, equals & hashCode
@NoArgsConstructor      // ✅ generates no-args constructor
@AllArgsConstructor     // ✅ generates all-args constructor
@Builder                // ✅ generates builder pattern
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    // ✅ Enum for roles
    public enum Role {
        USER,
        AGENT,
        ADMIN
    }
}
