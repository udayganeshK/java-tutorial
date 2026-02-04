

# Layered Architecture <span style="font-size:1.2em;">🗂️</span>

<br>

<div style="margin-bottom: 1em;">
<b>Jump to:</b>
<a href="#concise-overview-">Concise View</a> |
<a href="#detailed-guide-">Detailed View</a>
</div>

=== "Concise Overview 📝"

!!! info "What is Layered Architecture?"
    Layered architecture is a design pattern that organizes your application into logical layers, each with a clear responsibility. It's the most common pattern for Java REST APIs using Spring Boot.

<table>
  <tr>
    <td> <b>🔗 Controller Layer</b> </td>
    <td>Handles HTTP requests and responses, maps endpoints, and delegates work to the service layer.</td>
  </tr>
  <tr>
    <td> <b>⚙️ Service Layer</b> </td>
    <td>Contains business logic, validation, and orchestration of data.</td>
  </tr>
  <tr>
    <td> <b>💾 Repository Layer</b> </td>
    <td>Manages data access, such as database operations.</td>
  </tr>
</table>

**Key Benefits:**


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

# Layered Architecture in Spring Boot

=== "Concise View"

**Controller: The Entry Point.** Handles HTTP routing and Request/Response mapping.  
**Service: The Brain.** Orchestrates business logic, transactions, and security.  
**Repository: The Data Gateway.** Abstracts SQL/NoSQL operations using Spring Data JPA.  
**Goal:** Decouple logic from infrastructure to ensure your code doesn't become a "Big Ball of Mud."

---

=== "Detailed View"

#### Why Layers?
In the Java ecosystem, we follow the Principle of Single Responsibility. By isolating the database logic from the REST logic, we can swap a MySQL database for MongoDB without ever touching our REST Controller.

#### The "Angular Developer" Mental Map
| Java Layer   | Angular Equivalent      | Responsibility                                      |
|-------------|------------------------|-----------------------------------------------------|
| Controller  | Component / Route      | Receiving the "event" (HTTP call) and returning a View/Data |
| Service     | Service (@Injectable)  | Calculating data, handling state, and sharing logic  |
| Repository  | HttpClient + Store     | Interacting with the external data source (the DB)   |
| DTO/Entity  | Interface / Model      | Defining the shape of the data                       |

#### Implementation Example
We’ll use a Book Management system. Notice the use of `@RequiredArgsConstructor`—it's the modern Java way to do Dependency Injection (instead of the older `@Autowired` on fields).

**1. The Controller (The API Surface)**
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

**2. The Service (Business Logic)**
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

**3. The Repository (Data Access)**
```java
@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
        // You get CRUD for free! No implementation code needed.
}
```

---

### Lab Instructions: "The Migration"
1. **Generate:** Use start.spring.io to bootstrap a project with Spring Web and Spring Data JPA.
2. **Model:** Create a Book entity with id, title, and author.
3. **Bridge:** Create the Repository interface.
4. **Process:** Implement a Service method that filters books by author name.
5. **Expose:** Create a GET endpoint in the Controller that accepts a `@RequestParam`.

> **Pro Tip for Angular Devs:** In Java, we use DTOs (Data Transfer Objects) to send data to the frontend. Never expose your Database Entity directly to your Angular HttpClient! It’s like sending your internal private class members over the wire.

#### Reference Comparison
- **Spring Boot:** Uses Annotations (`@Service`, `@RestController`) for Metadata.
- **Angular:** Uses Decorators (`@Component`, `@Injectable`) for Metadata.

**When to Use:**

- Most RESTful APIs and CRUD applications
- Projects where maintainability and testability are priorities

**Compare:**

- Easier to understand than Hexagonal or Microkernel architectures

**Real-World Example:**

> Online bookstores, banking apps, and ticketing systems often use this pattern for their backend APIs.

---

=== "Detailed Guide 📚"

!!! tip "Why Use Layered Architecture?"
    - **Separation of Concerns:** Each layer has a single responsibility, making code easier to manage.
    - **Testability:** You can test each layer independently using mocks or stubs.
    - **Maintainability:** Changes in one layer (e.g., switching databases) have minimal impact on others.
    - **Scalability:** Layers can be scaled or replaced independently.

## Typical Structure

```text
com.example.demo
├── controller
│   └── BookController.java
├── service
│   └── BookService.java
└── repository
    └── BookRepository.java
```

## Example: Book API

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
