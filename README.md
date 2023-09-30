
# Task Management System

A simple Node.js application for managing tasks with CRUD operations and metrics calculation.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- PostgreSQL database server running
- Git (optional)

## Getting Started

To set up and run this project, follow these steps:

1. Clone the repository (if you haven't already):

   ```
   git clone git@github.com:pavan-dulam/task-service.git
   ```

2. Navigate to the project directory:

   ```shell
   cd task-service
   ```

3. Install project dependencies:

   ```shell
   npm install
   ```

4. Create a `.env` file in the root directory of the project and configure the following environment variables:

   ```dotenv
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   TASK_TABLE_NAME=your_task_table_name
   BACKEND_API_PORT=3000
   SERVICE_LOG_LEVEL=info
   ```

   Replace `your_database_name`, `your_database_user`, `your_database_password`, `your_task_table_name` with your database details.

5. Start the application:

   ```
   npm start
   ```

6. The application will start on `http://localhost:3000`.

## API Endpoints

- Create a task: `POST /task/service`
- Update a task: `PUT /task/service/:id`
- Get all tasks: `GET /task/service?page=1&pageSize=10`
- Get task metrics: `GET /metrics/service?startYear=2023&startMonth=5&endYear=2023&endMonth=12`
