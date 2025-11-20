# TeacherHub Project - README

## 📘 Overview

TeacherHub is an AI-powered teaching assistant platform that helps teachers automate academic tasks and helps students access personalized learning materials. The system generates lesson notes, exam-standard questions, and provides interactive practice for students.

---

## 🚀 Features

### **For Teachers**

* AI-generated lesson notes aligned with curriculum
* Automated question generation (objective, theory, practical)
* Marking guide & answer key generation
* Class & student management system
* Printable/downloadable materials (PDF, Word)

### **For Students**

* Practice questions by topic or difficulty
* Instant grading & feedback
* Performance analytics
* Access to summaries and study materials

### **General Features**

* Role-based authentication (Teacher/Student)
* Modern responsive UI (React + Tailwind)
* AI Integration (OpenAI API or custom model)
* Backend powered by Node.js or Django
* MySQL/PostgreSQL database

---

## 🛠️ Technologies Used

### Frontend

* React.js
* TailwindCSS
* ShadCN UI

### Backend

* Node.js (Express) or Django
* JWT Authentication

### Database

* MySQL or PostgreSQL

### AI

* OpenAI API / Custom NLP Models

---

## 📂 Project Structure

```
teacherhub/
│── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── ai/
│   └── server.js
│
│── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.js
│
└── README.md
```

---

## 🤖 AI Features Breakdown

### ✔ Lesson Note Generator

Teachers select:

* Subject
* Class level
* Topic(s)
* Format/template

AI automatically generates:

* Objectives
* Lesson introduction
* Content explanation
* Teaching materials
* Evaluation questions

### ✔ Question Generator

Generates:

* Multiple choice questions
* Theory/structured questions
* Practical questions
* Marking guides

### ✔ Student Practice System

Students can:

* Practice questions
* Receive instant feedback
* Track scores and progress

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/raphy100/PLP-PROJECT-TEACHERHUB.git
cd teacherhub
```

### 2️⃣ Backend Setup

```
cd backend
npm install
npm start
```

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 📝 Environment Variables

* `PORT`
* `DB_HOST`
* `DB_USER`
* `DB_PASSWORD`
* `DB_NAME`
* `JWT_SECRET`
* `OPENAI_API_KEY`

---

## 📘 API Endpoints (Examples)

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### AI Services

* POST `/api/ai/lesson-note`
* POST `/api/ai/generate-questions`

### Students

* GET `/api/student/practice`
* POST `/api/student/submit`

### Teachers

* POST `/api/teacher/create-class`
* GET `/api/teacher/classes`

---

## 👨‍🏫 User Roles

### Teacher

* Manage classes
* Create materials
* Generate questions
* Review analytics

### Student

* Practice questions
* Study materials
* Track performance

---

## 📄 License

MIT License

---

## 🤝 Contributions

Contributions are welcome! Submit PRs or open issues.

---

## 📬 Contact

**Developer:** Egbune Raphael
**Email:** raphyegbune@gmail.com
