# Quizo

Quizo is a quiz application designed to provide an interactive and engaging experience. This README contains setup instructions and API documentation.

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
npm install --force
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

## API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication

#### Register

**Endpoint:** `POST /register`

**Request Body:**

```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### Login

**Endpoint:** `POST /login`

**Request Body:**

```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### Quizzes

#### Get All Quizzes

**Endpoint:** `GET /quiz`

**Response:**

```json
[
  {
    "id": "1",
    "title": "General Knowledge",
    "description":"description here,
  }
]
```

#### Create a Quiz

**Endpoint:** `POST /quizzes`

**Request Body:**

```json
{
  "title": "New Quiz",
  "questions": [
    { "question": "What is 2 + 2?", "options": ["3", "4", "5"], "answer": "4" }
  ]
}
```

**Response:**

```json
{
  "message": "Quiz created successfully",
  "quiz": {
    "id": "2",
    "title": "New Quiz",
    "questions": [
      {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5"],
        "answer": "4"
      }
    ]
  }
}
```

---

This documentation provides basic instructions and API details. Ensure to update it as the project evolves.
