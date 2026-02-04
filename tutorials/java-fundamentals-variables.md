# Java Fundamentals: Variables

## Concept Explanation
Variables are containers for storing data values. In Java, every variable has a type that determines what kind of data it can hold.

## Key Points
- Java is statically typed: every variable must have a declared type.
- Variable types include `int`, `double`, `String`, `boolean`, etc.
- Variables must be declared before use.

## Java Example
```java
int age = 25;
double salary = 50000.50;
String name = "Alice";
boolean isActive = true;
```

## Angular/TypeScript Mapping & Cross-Reference

| Java Type   | TypeScript Type | Java Example           | TypeScript Example           |
|------------|----------------|------------------------|------------------------------|
| int        | number         | int age = 25;          | let age: number = 25;        |
| double     | number         | double salary = 50000.5;| let salary: number = 50000.5;|
| String     | string         | String name = "Alice"; | let name: string = "Alice";  |
| boolean    | boolean        | boolean isActive = true;| let isActive: boolean = true;|

### Side-by-Side Code
**Java:**
```java
String message = "Hello, Java!";
```
**TypeScript:**
```typescript
let message: string = "Hello, Angular!";
```

## Try It Yourself
- Declare a variable for a user's email in both Java and TypeScript.

## Reflection/Challenge
How would you use variables in an Angular component to store user data? How does this compare to a Java class?

## Common Mistakes
- Forgetting to declare the type in Java.
- Using the wrong type (e.g., assigning a string to an int).

## Next Tutorial
[Java Fundamentals: Control Flow](java-fundamentals-control-flow.md)
