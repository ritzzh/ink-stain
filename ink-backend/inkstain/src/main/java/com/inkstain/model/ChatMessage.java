package com.inkstain.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "chat_messages")
public class ChatMessage {
    @Id
    private String id;
    private String sender;
    private String receiver;
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    // Getters and Setters
}
