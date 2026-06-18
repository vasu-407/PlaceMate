# Developer Readiness Analyzer (DRA)

A full-stack MERN application that analyzes a student's software development readiness using LeetCode profile, GitHub profile, resume quality, technical skills, projects, and CGPA.

## Tech Stack

**Frontend:** React, React Router DOM, Axios, Tailwind CSS, Recharts, React Icons

**Backend:** Node.js, Express, JWT, bcryptjs, Multer, pdf-parse

**Database:** MongoDB, Mongoose

## Features

- JWT Authentication (Register, Login, Logout, Protected Routes)
- Student Profile Management
- LeetCode Profile Analysis with scoring
- GitHub Profile Analysis with scoring
- Resume PDF Upload & Analysis
- Skills CRUD with scoring
- Projects CRUD with scoring
- Developer Readiness Score Engine (weighted formula)
- Personalized Recommendation Engine
- Analytics Dashboard with Recharts

## Project Structure

```
MERN/
├── client/          # React frontend (Vite)
└── server/          # Express backend
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Installation

### 1. Clone and setup backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
mkdir -p uploads/resumes
npm run dev
```

### 2. Setup frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

### 3. Access the application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| JWT_EXPIRE | Token expiration (default: 7d) |
| GITHUB_TOKEN | Optional GitHub API token for higher rate limits |
| CLIENT_URL | Frontend URL for CORS |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL (default: http://localhost:5000/api) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/profile | Get profile |
| PUT | /api/profile | Update profile |
| POST | /api/leetcode | Analyze LeetCode profile |
| GET | /api/leetcode | Get LeetCode data |
| POST | /api/github | Analyze GitHub profile |
| GET | /api/github | Get GitHub data |
| POST | /api/resume | Upload resume PDF |
| GET | /api/resume | Get resume analysis |
| POST | /api/skills | Add skill |
| GET | /api/skills | List skills |
| PUT | /api/skills/:id | Update skill |
| DELETE | /api/skills/:id | Delete skill |
| POST | /api/projects | Add project |
| GET | /api/projects | List projects |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/readiness | Get readiness score |
| GET | /api/recommendations | Get recommendations |

## Scoring Formula

**Developer Readiness Score:**
- LeetCode: 30%
- GitHub: 25%
- Projects: 20%
- Skills: 10%
- Resume: 10%
- CGPA: 5%

**Readiness Levels:**
- 0–40: Beginner
- 41–60: Improving
- 61–80: Placement Ready
- 81–100: Industry Ready

## Production Build

```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

## License

MIT
