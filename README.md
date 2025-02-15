# Quizo

Quizo is a quiz application designed to provide an interactive and engaging experience. This README contains setup instructions and API documentation.

## Hosting & Database

- **Frontend & API Hosting**: The project is hosted on **Vercel**. You can access it here: [Project Link](https://quizo-omega.vercel.app)
- **Database**: The project uses **Supabase** as the database backend.
- use the credentials below for login or create a new accout using sign-up page
- **Username**: admin
- **Password**: pass@123

## Project Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Clone the Repository

```sh
git clone https://github.com/Hmalhotra004/quizo.git
cd quizo
```

### Install Dependencies

```sh
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL="postgresql://postgres.nnsitrejqcyapkhrxgzk:bZLLhSFZylvwApxA@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.nnsitrejqcyapkhrxgzk:bZLLhSFZylvwApxA@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL=https://nnsitrejqcyapkhrxgzk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uc2l0cmVqcWN5YXBraHJ4Z3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NTgyNDgsImV4cCI6MjA1NTAzNDI0OH0.nqZcKkFLsGibZJlTqfgt22eUuES8ctsuIqxayEReOoI
```

### Run the Application

```sh
npm run dev
```

The server should now be running at `http://localhost:3000/`.

# Quiz API Documentation

## Authentication

All requests require an Authorization header with a session token:

```json
{
  "Authorization": "Bearer <session_token>"
}
```

## User Endpoints

### Register a New User

**POST /api/register**

- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "id": "userId",
    "username": "exampleUser"
  }
  ```

### Login

**POST /api/login**

- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "status": 200
  }
  ```
  - Sets cookies: `quizoSession` and `quizoUser`

### Logout

**DELETE /api/logout**

- **Request Body:**
  ```json
  {
    "session": "session_token"
  }
  ```
- **Response:**
  ```json
  {
    "status": 200
  }
  ```

## Quiz Endpoints

### Create a Quiz

**POST /api/quiz**

- **Request Body:**
  ```json
  {
    "userId": "userId",
    "title": "Quiz Title",
    "desp": "Quiz Description"
  }
  ```
- **Response:**
  ```json
  {
    "id": "quizId",
    "title": "Quiz Title",
    "description": "Quiz Description",
    "userId": "userId"
  }
  ```

### Get All Quizzes by User

**GET /api/quiz?userId=**`<userId>`

- **Response:**
  ```json
  [
    {
      "id": "quizId",
      "title": "Quiz Title",
      "description": "Quiz Description",
      "userId": "userId"
    }
  ]
  ```

### Get a Specific Quiz

**GET /api/quiz?userId=**`<userId>`**&id=**`<quizId>`

- **Response:**
  ```json
  {
    "id": "quizId",
    "title": "Quiz Title",
    "description": "Quiz Description",
    "userId": "userId"
  }
  ```

### Update a Quiz

**PUT /api/quiz**

- **Request Body:**
  ```json
  {
    "userId": "userId",
    "id": "quizId",
    "title": "Updated Title",
    "desp": "Updated Description"
  }
  ```
- **Response:**
  ```json
  {
    "id": "quizId",
    "title": "Updated Title",
    "description": "Updated Description",
    "userId": "userId"
  }
  ```

### Delete a Quiz

**DELETE /api/quiz**

- **Request Body:**
  ```json
  {
    "userId": "userId",
    "id": "quizId"
  }
  ```
- **Response:**
  ```json
  {
    "status": 200
  }
  ```

## Error Handling

- **400:** Missing information in request
- **401:** Unauthorized access
- **404:** Resource not found
- **409:** Conflict (e.g., username already exists)
- **500:** Internal server error
