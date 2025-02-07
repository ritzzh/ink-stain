inkstain-backend/  
├── src/  
│   ├── main/  
│   │   ├── java/com/inkstain/  
│   │   │   ├── config/               # Configuration files  
│   │   │   ├── controller/           # API controllers  
│   │   │   ├── dto/                  # Data Transfer Objects (DTOs)  
│   │   │   ├── entity/               # JPA Entities (Database models)  
│   │   │   ├── exception/            # Custom exception handlers  
│   │   │   ├── repository/           # Repository layer (JPA and MongoDB)  
│   │   │   ├── service/              # Business logic services  
│   │   │   ├── util/                 # Utility classes (JWT, file upload, etc.)  
│   │   │   ├── security/             # Security & authentication logic  
│   │   │   ├── websocket/            # WebSocket configurations  
│   │   │   ├── InkstainApplication.java  # Main application file  
│   │   ├── resources/  
│   │   │   ├── application.yml        # Configuration (YAML format preferred)  
│   │   │   ├── static/                # Static files (if needed)  
│   │   │   ├── templates/             # Thymeleaf templates (for email, etc.)  
│   │   │   ├── logs/                  # Log files (if logging to a file)  
│   ├── test/  
│   │   ├── java/com/inkstain/         # Unit & integration tests  
│   ├── Dockerfile                     # Docker configuration  
│   ├── docker-compose.yml              # Docker Compose setup  
│   ├── pom.xml                         # Maven dependencies  
│   ├── README.md                       # Project documentation  
