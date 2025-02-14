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
  "user": {
    "id": "89eca1cb-a511-4eed-8aca-8e65aab7fcb5",
    "username": "admin",
    "password": "pass@123",
    "createdAt:": "2025-02-14T16:50:30.927Z",
    "updatedAt": "2025-02-14T16:50:30.927Z"
  },
  "status": 200
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
  "status": 200
}
```

### Quizzes

#### Get All Quizzes

**Endpoint:** `GET /quiz`

**Response:**

```json
[
  {
    "id": "24efb231-944e-48ff-8226-26b620b8ea1f",
    "title": "General Knowledge",
    "description": "description here",
    "userId": "24efb231-944e-48ff-8226-26b3dsf2a1f",
    "createdAt:": "2025-02-14T16:50:30.927Z",
    "updatedAt": "2025-02-14T16:50:30.927Z"
  }
]
```

#### Create a Quiz

**Endpoint:** `POST /quiz`

**Request Body:**

```json
{
  "title": "New Quiz",
  "description": "description here"
}
```

**Response:**

```json
{
  "quiz": {
    "id": "2",
    "title": "New Quiz",
    "description": "description here",
    "userId": "24efb231-944e-48ff-8226-26b3dsf2a1f",
    "createdAt:": "2025-02-14T16:50:30.927Z",
    "updatedAt": "2025-02-14T16:50:30.927Z"
  }
  "status": 200
}

```

#### Delete a Quiz

**Endpoint:** `DELETE /quiz/id`

**Request Body:**

```json
{
  "userId": "24efb231-944e-48ff-8226-26b3dsf2a1f",
  "id": "24efb231-944e-48ff-8226-26b3dsf2a1f"
}
```

**Response:**

```json
{
  "status": 200
}
```

#### GET a Quiz

**Endpoint:** `GET /quiz/id`

**Request Body:**

```json
{
  "userId": "24efb231-944e-48ff-8226-26b3dsf2a1f",
  "id": "24efb231-944e-48ff-8226-26b3dsf2a1f"
}
```

**Response:**

```json
{
  "quiz": {
    "id": "2",
    "title": "New Quiz",
    "description": "description here",
    "userId": "24efb231-944e-48ff-8226-26b3dsf2a1f",
    "createdAt:": "2025-02-14T16:50:30.927Z",
    "updatedAt": "2025-02-14T16:50:30.927Z"
  }
  "status": 200
}
```

#### PUT a Quiz

**Endpoint:** `PUT /quiz/id`

**Request Body:**

```json
{
  "userId": "24efb231-944e-48ff-8226-26b3dsf2a1f",
  "id": "24efb231-944e-48ff-8226-26b3dsf2a1f"
  "title": "Quiz",
  "description": "description",
}
```

**Response:**

```json
{
  "quiz": {
    "id": "2",
    "title": "New Quiz",
    "description": "description here",
    "userId": "24efb231-944e-48ff-8226-26b3dsf2a1f",
    "createdAt:": "2025-02-14T16:50:30.927Z",
    "updatedAt": "2025-02-14T16:50:30.927Z"
  }
  "status": 200
}
```

---
