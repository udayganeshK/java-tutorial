<!--tab:concise-->
## Concise View

- Controller: Handles HTTP requests/responses
- Service: Business logic
- Repository: Data access (DB operations)
- Promotes maintainability, testability, and separation of concerns

---

<!--tab:detailed-->
## Detailed View

### Overview
Layered architecture organizes code into logical layers, each with a specific responsibility. In Spring Boot, the most common layers are:
- **Controller**: Handles HTTP requests and responses
- **Service**: Contains business logic
- **Repository**: Manages data access (e.g., database operations)

This separation improves maintainability, testability, and scalability. It also makes it easier to test and refactor code, and to assign clear responsibilities to each part of your application.

### Structure Example
```
com.example.demo
├── controller
│   └── BookController.java
├── service
│   └── BookService.java
└── repository
    └── BookRepository.java
```

### Code Example
**BookController.java**
```java
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<BookDTO> getAllBooks() {
        return bookService.getAllBooks();
    }
}
```

**BookService.java**
```java
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<BookDTO> getAllBooks() {
        // business logic, mapping, etc.
        return ...;
    }
}
```

**BookRepository.java**
```java
public interface BookRepository extends JpaRepository<Book, Long> {}
```

### Lab Instructions
1. Create a new Spring Boot project with the above structure.
2. Implement a simple REST API for managing books using Controller, Service, and Repository layers.
3. Add a new endpoint to fetch all books.
4. (Optional) Add endpoints for creating, updating, and deleting books.

### Angular Perspective
- Similar to Angular’s separation of concerns: Components (UI), Services (logic), and HttpClient (data access).
- Promotes modular, testable code in both frontend and backend.

### Further Reading
- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Layered Architecture Pattern](https://martinfowler.com/eaaCatalog/layeredArchitecture.html)
