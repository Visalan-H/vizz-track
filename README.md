# VizzTrack - Job Application Tracker

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for tracking job applications.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Visalan-H/vizz-apply.git
cd vizz-apply
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=mongodb://localhost:27017/vizztrack
JWT_SECRET=your_super_secret_jwt_key_here_change_this
PORT=3000
FRONTEND_URL=http://localhost:5173
```

**Note:** For MongoDB Atlas, use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vizztrack
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

## Preview Screenshots

### Home Page
![Home Page](preview_images/home.png)

### Login Page
![Login Page](preview_images/login.png)

### Jobs Dashboard
![Jobs Dashboard](preview_images/jobs.png)

### Add Job Application
![Add Job](preview_images/addJob.png)

### Edit Job Application
![Edit Job](preview_images/editJob.png)

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user info | Yes |

**Request Body (Signup/Login):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Job Application Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/jobs` | Get all job applications | Yes |
| GET | `/api/jobs/:id` | Get single job application | Yes |
| POST | `/api/jobs` | Create new job application | Yes |
| PUT | `/api/jobs/:id` | Update job application | Yes |
| DELETE | `/api/jobs/:id` | Delete job application | Yes |

**Request Body (Create/Update Job):**
```json
{
  "companyName": "Google",
  "jobTitle": "Software Engineer",
  "applicationDate": "2025-10-20",
  "status": "Applied"
}
```

**Valid Status Values:** `Applied`, `Interview`, `Offer`, `Rejected`

## Validation Rules

### Job Application
- **Company Name:** Required, minimum 3 characters
- **Job Title:** Required
- **Application Date:** Required, cannot be a future date
- **Status:** Must be one of: Applied, Interview, Offer, Rejected

### Authentication
- **Email:** Required, valid email format
- **Password:** Required, minimum 6 characters

---

**Author:** Visalan H  
**Repository:** [vizz-apply](https://github.com/Visalan-H/vizz-apply)
