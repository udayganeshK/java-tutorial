# Layered Architecture: Controllers, Services, Repositories


=== "Concise View"

**What is Layered Architecture?**

Layered architecture is a design pattern that organizes code into logical layers, each with a specific responsibility. It is the most common pattern for Java REST APIs using Spring Boot.

**Typical Layers:**
- **Controller Layer**: Handles HTTP requests and responses, maps endpoints, and delegates work to the service layer.
- **Service Layer**: Contains business logic, validation, and orchestration of data.
- **Repository Layer**: Manages data access, such as database operations.

**Key Benefits:**
- Clear separation of concerns
- Easier to test and maintain
- Promotes code reuse and scalability

**Quick Example:**
```java
// Controller
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;
    // ...
}

// Service
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    // ...
}

// Repository
@Repository
public class BookRepository {
    // ...
}
```

**When to Use:**
- Most RESTful APIs and CRUD applications
- Projects where maintainability and testability are priorities

**Compare:**
- Easier to understand than Hexagonal or Microkernel architectures

**Real-World Example:**
Online bookstores, banking apps, and ticketing systems often use this pattern for their backend APIs.

=== "Detailed View"

## Overview
Layered architecture divides your application into distinct layers, each with a clear responsibility. In a typical Spring Boot REST API, you’ll find:

- **Controller Layer**: Handles HTTP requests, maps endpoints, and returns responses.
- **Service Layer**: Contains business logic, validation, and coordinates between controllers and repositories.
- **Repository Layer**: Handles data persistence, such as database CRUD operations.

## Why Use Layered Architecture?
- **Separation of Concerns**: Each layer has a single responsibility, making code easier to manage.
- **Testability**: You can test each layer independently using mocks or stubs.
- **Maintainability**: Changes in one layer (e.g., switching databases) have minimal impact on others.
- **Scalability**: Layers can be scaled or replaced independently.

## Structure Example
```
com.example.demo
├── controller
│   └── BookController.java
├── service
│   └── BookService.java
└── repository
    └── BookRepository.java
```

## Code Example
**BookController.java**
```java
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
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

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
```

**BookRepository.java**
```java
@Repository
public class BookRepository {
    public List<Book> findAll() {
        // Imagine this connects to a database
        return List.of(new Book("Java 101"), new Book("Spring Boot in Action"));
    }
}
```

## Real-World Use Case
Suppose you’re building an online bookstore. The controller handles HTTP requests for books, the service layer contains business rules (e.g., discounts, stock checks), and the repository interacts with the database.

## Comparison with Other Architectures
- **Hexagonal (Ports & Adapters)**: More flexible for complex integrations, but harder to grasp for beginners.
- **Microkernel**: Good for plugin-based systems, but overkill for most REST APIs.
- **Layered**: Easiest to start with, especially for CRUD and RESTful services.

## Best Practices
- Keep controllers thin—move logic to services.
- Use interfaces for services and repositories for easier testing.
- Avoid direct database access in controllers or services.

## Further Reading
- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Martin Fowler: Patterns of Enterprise Application Architecture](https://martinfowler.com/eaaCatalog/layeredArchitecture.html)

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

    ## Lab Instructions
    1. Create a new Spring Boot project with the above structure.
    2. Implement a simple REST API for managing books using Controller, Service, and Repository layers.
    3. Add a new endpoint to fetch all books.
    4. (Optional) Add endpoints for creating, updating, and deleting books.

    ## Angular Perspective
    - Similar to Angular's separation of concerns: Components (UI), Services (logic), and HttpClient (data access).
    - Promotes modular, testable code in both frontend and backend.

    ## Further Reading
    - [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
    - [Layered Architecture Pattern](https://martinfowler.com/eaaCatalog/layeredArchitecture.html)
