package com.inkstain.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.inkstain.model.ChatMessage;

import java.util.List;

public interface ChatRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findBySenderAndReceiver(String sender, String receiver);
}
