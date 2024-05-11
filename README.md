# Car Dealership Management System
![Index Page](/project_resourses/logo.png)

## Demo link
Youtube: https://youtu.be/VmVytncY6dc?si=Y5aZbnEADz59HKna

## Team Members
- Yar Moradpour
- Rio Taiga
- Manh Tuong Nguyen

## How to Run the Program 
This application is split into two parts: backend and the frontend. We would need to start up the backend so that the frontend can talk to it.

> To ensure that backend is running smoothly, please have the latest version of python installed. Please clone our repository as well.

How to run the Back-end
- Change Directly: `cd ./back-end`
- Making sure we install flask: `pip install -U Flask` 
- Run the file: `flask --app app.py run`

How to run the Front-end
- Change Directory: `cd ./front-end`
- To install dependencies: `npm install` 
- Run the Front end: `npm start`

## Screenshots of the Program

Home Page when Customer is Logged in
![Index Page](/project_resourses/customerHome.png)
Dashboard when Employee is Logged in
![Index Page](/project_resourses/employeeDash.png)

## Project Description
The Car Dealership Management System is designed to revolutionize how car dealerships operate in the competitive automotive industry. It integrates inventory management, customer relations, sales tracking, and reporting functionalities to enhance customer satisfaction and streamline dealership operations.

## ER Diagram
![Index Page](/project_resourses/ER.drawio-3.png)

## Sprint Plans

| Sprint Phase          | Tasks                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------|
| Week 1                | - Set up project environment <br> - Design schema <br> - Create tables (inventory, sales, customers, etc.) <br> - Design ER Diagram |
| Week 3                | - Implement CRUD operations for inventory management                                         |
| Week 4                | - Set up React environment and necessary components <br> - Perform unit/integration testing <br> - Testing with sample dataset <br> - Bug fixing |
| Week 5                | - Integrate front-end and back-end components <br> - Bug fixing after integration           |
| Week 6                | - Write project documentation <br> - Prepare for project demo to the class                   |

## Responsibilities (Contributions)
- **Rio Taiga:**
  - Database design and implementation
  - Constructing back-end environment (Customer & Employee)
  - Error handling (apply Status Code)

- **Yar Moradpour:**
  - Front-end development
  - UI/UX design
  - Database design and implementation (Transactions)

- **Manh Tuong Nguyen:**
  - Back-end development
  - Database design and implementation (Car & Car Parts)
  - Testing and quality assurance

## Outcomes
- Implement a database to:
  - Manage inventory
  - Maintain detailed car information
  - Enhance customer purchasing experience

- Deploy interactive websites for:
  - Managerial tasks
  - Purchasing
  - Customer service

- Build API to connect DBMS to front-end website

## Databases and Table Usage
- **Databases:** MySQL
- **Tables:** Estimated 5 to 10 tables for inventory, sales, customers, etc.

## Languages
- **Front-end:** React (JavaScript)
- **Back-end:** Python (Flask framework), SQL

## Future Implementation
- Deploy Database and API to Cloud services
- Publish website
