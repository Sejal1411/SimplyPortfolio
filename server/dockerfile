# Stage 1: Build the application using Maven with OpenJDK 21
FROM openjdk:21-slim AS build

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files to the container
COPY pom.xml .

# Download dependencies (faster than copying the entire source initially)
RUN mvn dependency:go-offline

# Copy the application source code to the container
COPY src ./src

# Build the application (skip tests for faster build, remove -DskipTests for real builds)
RUN mvn clean package -DskipTests

# Check the contents of the target directory to ensure JAR is built
RUN ls -l /app/target

# Stage 2: Run the application with OpenJDK 21
FROM openjdk:21-slim

# Set the working directory inside the container
WORKDIR /app

# Expose the port the app will run on
EXPOSE 8080

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
