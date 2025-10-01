package com.InsurAi.Dto;

import com.InsurAi.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                     // ✅ generates getters, setters, toString, equals, hashCode
@NoArgsConstructor        // ✅ generates a no-args constructor
@AllArgsConstructor       // ✅ generates an all-args constructor
public class SignupRequest {

    private String name;
    private String email;
    private String password;
    private User.Role role;  // ✅ role field
}
