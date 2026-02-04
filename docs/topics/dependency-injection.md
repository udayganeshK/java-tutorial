# Dependency Injection in Spring Boot & Angular

=== "Concise View"

**What is Dependency Injection (DI)?**

Dependency Injection is a design pattern that allows you to inject required objects (dependencies) into a class, rather than creating them inside the class. This promotes loose coupling, testability, and maintainability.

**Spring Boot:** Uses annotations like `@Autowired`, `@Service`, `@Component`, and constructor injection for DI.

**Angular:** Uses decorators like `@Injectable`, `@Component`, and the Angular DI system to provide dependencies.

**Goal:** Decouple class logic from the creation of dependencies, making code easier to test and extend.

---

=== "Detailed View"

#### Why Use Dependency Injection?
- Promotes loose coupling between classes
- Makes unit testing easier (mock dependencies)
- Centralizes configuration and object creation
- Encourages best practices for maintainable code

#### Spring Boot Example

**Service Injection (Constructor-based, recommended):**
```java
@Service
public class BookService {
    private final BookRepository repository;

    // Constructor injection (preferred)
    public BookService(BookRepository repository) {
        this.repository = repository;
    }
}
```

**Legacy Field Injection (not recommended):**
```java
@Service
public class BookService {
    @Autowired
    private BookRepository repository;
}
```

**Component Scanning:**
- `@Component`, `@Service`, `@Repository`, and `@Controller` are detected and managed by Spring’s IoC container.

#### Angular Example

**Service Injection:**
```typescript
@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient) {}
}
```

**Component Injection:**
```typescript
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent {
  constructor(private bookService: BookService) {}
}
```

#### Comparison Table
| Aspect                | Spring Boot (Java)         | Angular (TypeScript)         |
|-----------------------|----------------------------|------------------------------|
| Registration          | @Component, @Service, etc. | @Injectable, @Component      |
| Injection Style       | Constructor, field, setter | Constructor                  |
| Scope                 | Singleton (default)        | Singleton (default)          |
| Testability           | Easy with mocks            | Easy with TestBed/mocks      |

#### Best Practices
- Prefer constructor injection (both frameworks)
- Avoid field injection in Spring Boot
- Use `providedIn: 'root'` for Angular services unless you need a different scope
- Use interfaces for easier mocking and testing

#### Further Reading
- [Spring Boot DI Docs](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans)
- [Angular Dependency Injection](https://angular.io/guide/dependency-injection)
