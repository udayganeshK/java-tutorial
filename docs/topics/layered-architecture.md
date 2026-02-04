

# Layered Architecture in Spring Boot <span style="font-size:1.2em;">🗂️</span>

## What is Layered Architecture?
Layered architecture is a design pattern that organizes your application into logical layers, each with a clear responsibility. It's the most common pattern for Java REST APIs using Spring Boot.

| Layer         | Responsibility                                                                 |
|-------------- |-------------------------------------------------------------------------------|
| Controller    | Handles HTTP requests and responses, maps endpoints, delegates to service     |
| Service       | Contains business logic, validation, orchestration of data                    |
| Repository    | Manages data access, such as database operations                              |

## Key Benefits
- 🧩 Clear separation of concerns
- 🧪 Easier to test and maintain
- 🚀 Promotes code reuse and scalability

## Why Layers?
In the Java ecosystem, we follow the Principle of Single Responsibility. By isolating the database logic from the REST logic, we can swap a MySQL database for MongoDB without ever touching our REST Controller.

## The "Angular Developer" Mental Map
| Java Layer   | Angular Equivalent      | Responsibility                                      |
|-------------|------------------------|-----------------------------------------------------|
| Controller  | Component / Route      | Receiving the "event" (HTTP call) and returning a View/Data |
| Service     | Service (@Injectable)  | Calculating data, handling state, and sharing logic  |
| Repository  | HttpClient + Store     | Interacting with the external data source (the DB)   |
| DTO/Entity  | Interface / Model      | Defining the shape of the data                       |


## Implementation Example
We’ll use a Book Management system. Notice the use of `@RequiredArgsConstructor`—it's the modern Java way to do Dependency Injection (instead of the older `@Autowired` on fields).

### 1. The Controller (The API Surface)
```java
@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor 
public class BookController {
    private final BookService bookService; // Final fields + RequiredArgsConstructor = Clean DI

    @GetMapping
    public ResponseEntity<List<BookResponse>> getAllBooks() {
        return ResponseEntity.ok(bookService.fetchAllBooks());
    }
}
```

### 2. The Service (Business Logic)
```java
@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository repository;

    @Transactional(readOnly = true)
    public List<BookResponse> fetchAllBooks() {
        return repository.findAll().stream()
                .map(book -> new BookResponse(book.getId(), book.getTitle()))
                .toList(); // Java 17+ syntax
    }
}
```

### 3. The Repository (Data Access)
```java
@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    // You get CRUD for free! No implementation code needed.
}
```

## Lab Instructions
1. Create a new Spring Boot project with the above structure.
2. Implement a simple REST API for managing books using Controller, Service, and Repository layers.
3. Add a new endpoint to fetch all books.
4. (Optional) Add endpoints for creating, updating, and deleting books.

## Angular Perspective
- Similar to Angular's separation of concerns: Components (UI), Services (logic), and HttpClient (data access).
- Promotes modular, testable code in both frontend and backend.

## Real-World Use Case
Suppose you’re building an online bookstore. The controller handles HTTP requests for books, the service layer contains business rules (e.g., discounts, stock checks), and the repository interacts with the database.

## Comparison with Other Architectures
| Architecture      | Pros                                      | Cons                                 |
|-------------------|--------------------------------------------|--------------------------------------|
| Layered           | Simple, maintainable, testable             | Can become rigid for large systems   |
| Hexagonal         | Flexible, good for integrations            | More complex, steeper learning curve |
| Microkernel       | Great for plugin-based systems             | Overkill for most REST APIs          |

## Best Practices
- Keep controllers thin—move logic to services.
- Use interfaces for services and repositories for easier testing.
- Avoid direct database access in controllers or services.

## Further Reading
- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Martin Fowler: Patterns of Enterprise Application Architecture](https://martinfowler.com/eaaCatalog/layeredArchitecture.html)
