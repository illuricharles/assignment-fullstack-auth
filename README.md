# Assignment – Fullstack Authentication App

A fullstack authentication built with **React + Vite**, **Node.js + Express**, **Prisma**.

Frontend is deployed on **Netlify** and backend is deployed on **Render**.

---

## 🚀 Live Links

**Frontend:**   https://earnest-semolina-a8d684.netlify.app/  
**Backend:**  https://assignment-fullstack-auth.onrender.com

---

### ✨ Features
- User registration
- User login
- Form validation (Zod + React Hook Form)
- Secure password handling
- API integration
- Deployment on Netlify and Render

---

## 🛠 Tech Stack

### Frontend
- TypeScript
- React + Vite  
- React Hook Form  
- Zod validation  
- Axios  

### Backend
- TypeScript
- Node.js + Express  
- Prisma ORM   
- Zod validation

---

## ▶️ Running the Project Locally



### 1. Clone the repository
```bash
git clone https://github.com/illuricharles/assignment-fullstack-auth.git
cd assignment-fullstack-auth
```

### 2. Set up environment variables
Backend 

Copy .env.example to .env:
```bash
cd backend
cp .env.example .env
```
Update the values inside .env (DATABASE_URL, JWT_SECRET, etc.)

Frontend

Copy .env.example to .env:

```bash
cd ../frontend
cp .env.example .env
```
set:
```bash
VITE_API_URL=http://localhost:3000
```
### 3. Install dependencies

Backend
```
cd ../backend
npm install
```

Frontend
```
cd ../frontend
npm install
```

### 4. Run the project

```
  cd backend
  npx prisma generate
  npx prisma migrate deploy
  npm run dev
```

Backend runs at:
```
  http://localhost:3000
```

Start Frontend
```
  cd frontend
  npm run dev
```


Frontend runs at:
```
  http://localhost:5173
```

