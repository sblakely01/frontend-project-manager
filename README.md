# Project Manager App

A full-stack project and task management application featuring secure authentication, user-specific project visibility, and complete CRUD operations for projects and their associated tasks.

## This project includes:

- A React + TypeScript frontend

- A Node.js + Express backend

- MongoDB + Mongoose for data persistence

- JWT authentication

- GitHub OAuth login (optional)

- Full authorization (user-only access & admin-only endpoints)

## Table of Contents

- [Overview](#overview)
 - [Demo](#demo)
 - [Screenshots](#screenshots)
- [Features](#features)
 - [Tech Stack](#techstack)
 - [Architecture](#architecture)
- [API Documentation](#apidocumentation)
 - [Auth Routes](#authroutes)
 - [Project Routes](#projectroutes)
 - [Task Routes](#taskroutes)
- [Environment Variables](#environmentvariables)
- [Local Setup](#localsetup)
- [Author](#author)

## Overview

**The Project Manager App enables users to:**

* Create and manage projects

* Add, edit, and delete tasks within each project

* Authenticate securely using JWT tokens

* Protect user data through role-based authorization

* Access their accounts via GitHub OAuth

## Demo
* Frontend

🔗 https://sb-project-manager.netlify.app/

* Backend

🔗 https://project-manager-7pq4.onrender.com/

## Screenshots

![](./src/assets/Screenshot%202025-12-11%20121813.png)

## Features
# Authentication

* User registration (username, email, password)

* User login via JWT

* GitHub OAuth login with automatic JWT issuance

# Authorization

* Authenticated users can only access their own projects & tasks

* Admin-only endpoint for viewing all users

* Protected API routes with middleware

## CRUD Operations
### Users

* Get all users (admin only)

* Get a user

* Register a user

* Login a user

### Projects

* Create a project

* Get all user projects

* Get a single project

* Update (coming soon)

* Delete (coming soon)

### Tasks

* Create a task for a project

* Get all tasks for a project

* Update a task

* Delete a task

## Additional Features

* Clean UI with TailwindCSS

* In-place task editing (coming soon)

* Status field for tasks (todo, in-progress, done)

## Tech Stack
### Frontend

* React (TypeScript)

* Axios

* TailwindCSS

* React Router

### Backend

* Node.js

* Express.js

* MongoDB (Mongoose)

* JWT Authentication

* Passport.js (GitHub OAuth)

## API Documentation

### Auth Routes (/api/users)
GET /api/users/

Admin-only — returns all registered users
Headers:
Authorization: Bearer <token>

GET /api/users/:id

Get a single user (public)

POST /api/users/register

Register a new user

``` js 
{
  "username": "steph",
  "email": "steph@example.com",
  "password": "yourpassword"
} 
```

POST /api/users/login

Logs in a user
Returns a JWT token

``` js
{
  "email": "steph@example.com",
  "password": "yourpassword"
}
```

### Project Routes (/api/projects)

**All routes require:**

**Authorization: Bearer <token>**

GET /api/projects

Returns all projects owned by the logged-in user

GET /api/projects/:projectId

Returns a specific project
Authorization enforced: users may view only their own projects.

POST /api/projects

Create a new project

``` js
{
  "name": "My First Project",
  "description": "This project is for testing."
}
```

PUT /api/projects/:projectId


DELETE /api/projects/:projectId


### Task Routes (/api/projects/:projectId/tasks)

**All routes require:**

**Authorization: Bearer <token>**


Task routes automatically verify that the project:

* Exists

* Belongs to the logged-in user

GET /api/projects/:projectId/tasks

Get all tasks for a project

POST /api/projects/:projectId/tasks

Create a new task

``` js
{
  "title": "Build UI",
  "description": "Create frontend components",
  "status": "todo"
}
```

PUT /api/projects/:projectId/tasks/:taskId

Update an existing task

``` js
{
  "title": "Updated Title",
  "status": "in-progress"
}
```

DELETE /api/projects/:projectId/tasks/:taskId

Deletes a task belonging to the project

## Environment Variables
Backend (.env)
PORT=4000
MONGO_URI=<your mongodb uri>
JWT_SECRET=<your jwt secret>
GITHUB_CLIENT_ID=<github id>
GITHUB_CLIENT_SECRET=<github secret>
GITHUB_CALLBACK_URL=http://localhost:4000/api/users/auth/github/callback

Frontend (.env)
VITE_BACKEND_URL=http://localhost:4000

## Architecture
Frontend (React)
    ↓ Axios
Backend (Node + Express)
    ↓
MongoDB (Mongoose)


Auth flow:

Login → server returns JWT → axios attaches token → protected routes unlocked

## Local Setup
**Backend**

1. npm install
2. npm run dev

**Frontend**

1. npm install
2. npm run dev

## Author

## Stephanye Blakely
* Portfolio — https://www.stephanyeblakely.com

* LinkedIn — https://linkedin.com/in/stephanye-blakely