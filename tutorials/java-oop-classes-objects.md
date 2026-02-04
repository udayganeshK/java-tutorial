# Java OOP: Classes & Objects

## Concept Explanation
Classes are blueprints for objects. Objects are instances of classes. In Java, classes encapsulate data (fields) and behavior (methods).

## Key Points
- Define a class with fields and methods.
- Create objects using the `new` keyword.
- Access fields/methods via the object.

## Java Example
```java
public class Book {
    String title;
    String author;

    void printInfo() {
        System.out.println(title + " by " + author);
    }
}

Book myBook = new Book();
myBook.title = "Java Basics";
myBook.author = "Alice";
myBook.printInfo();
```

## Angular/TypeScript Mapping & Cross-Reference

| Java Concept | TypeScript/Angular Concept | Java Example | TypeScript Example |
|--------------|---------------------------|--------------|-------------------|
| Class        | Class                     | `public class Book { ... }` | `class Book { ... }` |
| Field        | Property                  | `String title;` | `title: string;` |
| Method       | Method                    | `void printInfo() { ... }` | `printInfo(): void { ... }` |
| Object       | Instance                  | `Book myBook = new Book();` | `let myBook = new Book();` |

### Side-by-Side Code

**Java:**
```java
Book b = new Book();
b.title = "Java";
```
**TypeScript:**
```typescript
let b = new Book();
b.title = "Angular";
```

## RESTful Application Example
- In Java (Spring Boot), you might create a `Book` class as an entity and expose it via a REST controller.
- In Angular, you might create a `Book` model and use a service to fetch book data from a REST API.

## Try It Yourself
- Define a `User` class in both Java and TypeScript with `name` and `email` fields.

## Reflection/Challenge
How would you use a class in Angular to represent data from a REST API? How does this compare to a Java entity?

## Common Mistakes
- Forgetting to instantiate objects before use.
- Mixing up class and instance members.

## Next Tutorial
[Java OOP: Inheritance](java-oop-inheritance.md)
