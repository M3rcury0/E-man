# E-man - Employee Management System

**E-man** is a modern Employee Management System designed to efficiently store and manage employee data.

## Project Overview

### Technology Stack

- **Backend:**
  - Java with Spring Tools 4
  - Maven for build automation
  - MySQL database with JDBC connection
  
- **Frontend:**
  - HTML, CSS, JavaScript for UI/UX
  - TypeScript for type-safe components

### Features

- **CRUD Operations:** 
  - Create, Read, Update, and Delete employee records
  - Service layer for efficient data management
  - Secure database operations

- **User Interface:**
  - Responsive design across devices
  - Intuitive and modern interface
  - Real-time data updates

- **Database Integration:**
  - MySQL database for data persistence
  - Secure and efficient data handling

## Prerequisites

Before running this project, ensure the following software is installed:

- Java (version 21)
- Eclipse IDE
- Spring Tools 4 for Eclipse
- Maven
- MySQL Server and Workbench
- Node.js and npm (for frontend)

## Project Structure

- **Backend:**
  - Main Controller: `eman/src/main/java/com/eman/Controller/EmployeeController.java`
  - Database schema: `eman/Database.sql`
  
- **Frontend:**
  - Built with HTML, CSS, and JavaScript
  - TypeScript components for enhanced functionality

## Running the Project

### Step 1: Clone the Repository
git clone https://github.com/M3rcury0/E-man.git
cd E-man

### Step 2: Database Setup
 - Open MySQL Workbench.
 - Execute the SQL file located at `eman/Database.sql`.
 - Update the `username` and `password` fields in `backend/src/main/resources/application.properties` with your MySQL credentials.

### Step 3: Backend Setup
 - cd E-man/backend
 - mvn clean install
 - mvn spring-boot:run

### Step 4: Frontend Setup
 - cd ../frontend
 - npm install
 - npm start

### Step 5: Access the Application
 -  Use one of the pre-loaded credentials to log in, like:
    - Username: suman@24
    - Password: eteawsrfdasdfc65

