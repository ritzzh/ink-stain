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
    
    // Personal Stats
    @Column(nullable = true)
    private String about;

    @Column(nullable = true)
    private String age;

    @Column(nullable = true)
    private String gender;

    @Column(nullable = true)
    private String following;

    @Column(nullable = true)
    private String followers;

    @Column(nullable = true)
    private String creations;

    // Reading Stats
    @Column(nullable = true)
    private String currentlyReading;

    @Column(nullable = true)
    private String favouriteBook;    

    @Column(nullable = true)
    private String favouriteAuthor;

    @Column(nullable = true)
    private String favouriteQuote;

    @Column(nullable = true)
    private String favouriteGenre;

    @Column(nullable = true)
    private String totalBooksRead;

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

    // Getters and Setters
}
