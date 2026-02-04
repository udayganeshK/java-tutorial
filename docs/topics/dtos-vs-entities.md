# DTOs vs Entities in Spring Boot

## What are DTOs and Entities?

**Entity:** A Java class that maps directly to a database table. It represents your data persistence layer.

**DTO (Data Transfer Object):** A simple Java class used to transfer data between layers (typically from server to client). It contains only the data you want to expose.

| Aspect              | Entity                                  | DTO                                    |
|---------------------|-----------------------------------------|----------------------------------------|
| Purpose             | Database mapping (JPA/Hibernate)        | Data transfer between layers/API       |
| Exposure            | Internal, kept in backend               | Exposed to frontend via REST API       |
| Lazy Loading        | Supports lazy-loaded collections        | Always fully initialized               |
| Circular References | Can cause serialization issues          | Prevents circular reference problems   |
| Size                | May contain unnecessary fields          | Contains only required fields          |

## Why Use DTOs?

### 1. Security
Never expose your database entities directly to the frontend. Your entity might contain sensitive fields you don't want to reveal.

```java
// ❌ BAD: Exposing entity directly
@RestController
public class UserController {
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}

// ✅ GOOD: Using DTO
@RestController
public class UserController {
    @GetMapping("/users/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        return mapToDTO(user);
    }
}
```

### 2. Performance
DTOs allow you to fetch only the fields you need, reducing database load and network bandwidth.

```java
// Entity might have:
@Entity
public class User {
    private Long id;
    private String username;
    private String email;
    private String passwordHash;  // Don't expose!
    private List<Address> addresses;  // Lazy loaded
    private List<Order> orders;  // Lazy loaded
}

// DTO exposes only what's needed:
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    // No password, addresses, or orders
}
```

### 3. Flexibility
DTOs decouple your API contract from your internal entity structure. You can change entities without breaking the API.

```java
// Backend entity changes:
@Entity
public class User {
    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;  // New field
    // ... other fields
}

// DTO remains the same—no API breakage
public class UserDTO {
    private Long id;
    private String username;
    private String email;
}
```

## Angular Perspective

In Angular, you have a similar pattern:
- **Models (Interfaces/Classes):** Similar to DTOs, define the shape of data you work with
- **HTTP Response:** Exactly like a DTO—only contains what the server sends
- **Component State:** Like an entity—can have extra properties not exposed to the view

```typescript
// Angular DTO equivalent
export interface UserDTO {
  id: number;
  username: string;
  email: string;
}

// In service
this.http.get<UserDTO>('/api/users/1').subscribe(user => {
  // Type-safe data
});
```

## Practical Example: User Management

### Entity
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    
    private String username;
    private String email;
    
    @Column(name = "password_hash")
    private String passwordHash;
    
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Order> orders;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### DTO
```java
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    
    // Constructor for mapping
    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
```

### Controller
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(new UserDTO(user));
    }
}
```

## Best Practices

1. **Create DTOs for API responses** — Never expose raw entities
2. **Use separate DTOs for request and response** — Request DTO for POST/PUT, Response DTO for GET
3. **Keep DTOs lightweight** — Include only necessary fields
4. **Map entities to DTOs early** — Do it in the controller or service layer
5. **Avoid lazy loading issues** — DTOs help prevent "N+1" query problems

## Request vs Response DTOs

```java
// Request DTO (for POST/PUT)
public class CreateUserRequest {
    @NotNull
    private String username;
    
    @NotNull
    @Email
    private String email;
    
    @NotNull
    @Size(min = 8)
    private String password;
}

// Response DTO (for GET)
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
}
```

## Lab Instructions

1. Create a `Book` entity with fields: id, title, author, isbn, price, createdAt
2. Create a `BookDTO` that exposes only: id, title, author, price
3. Create a `CreateBookRequest` DTO for POST requests with validation
4. Implement a `BookController` that converts entities to DTOs before responding
5. Test with Postman or cURL to verify DTOs are being used

## Further Reading

- [DTO Pattern in Java](https://www.baeldung.com/java-dto-pattern)
- [Spring Framework Best Practices](https://docs.spring.io/spring-framework/docs/current/reference/html/)
- [Martin Fowler: Data Transfer Object](https://martinfowler.com/eaaCatalog/dataTransferObject.html)
