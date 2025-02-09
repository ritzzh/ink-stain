package com.inkstain.entity;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles; // e.g., ["ROLE_USER", "ROLE_ADMIN"]

    public String getUsername() {
        return this.username;
    }

    public String getEmail() {
        return this.email;
    }

    public CharSequence getPassword() {
        return this.password;
    }

    public void setPassword(String encode) {
        this.password = encode;
    }

    public void setRoles(Set<String> singleton) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setRoles'");
    }

    // Getters and Setters
}
