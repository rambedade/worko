# Candidate Referral Management System

## 🚀 Overview
This is a **Candidate Referral Management System** that allows users to **refer candidates, update their status, and manage referrals**. The project uses **MERN stack** with a **Node.js + Express backend** and a **React frontend**.

## 📌 Features
### **Frontend (React + Vite + Material UI)**
- **Dashboard**: Displays a list of referred candidates.
- **Referral Form**: Allows users to submit new candidates.
- **Search Functionality**: Filter candidates by job title or status.
- **Status Update**: Change candidate status (Pending → Reviewed → Hired).
- **Delete Candidate**: Remove a candidate from the system.

### **Backend (Node.js + Express + MongoDB)**
- **POST /candidates**: Save a new candidate's data.
- **GET /candidates**: Fetch all referred candidates.
- **PUT /candidates/:id/status**: Update the status of a candidate.
- **DELETE /candidates/:id**: Remove a candidate.

## 📂 Folder Structure
```
/worko
│── /backend
│   ├── package.json
│   ├── server.js
│   ├── /routes
│   ├── /models
│   ├── .env
│── /frontend
│   ├── package.json
│   ├── src/
│   ├── public/
│── .gitignore
│── README.md
```

## 🛠️ Setup and Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/rambedade/worko.git
cd worko
```

### **2️⃣ Backend Setup**
```bash
cd backend
npm install
```

- **Create a `.env` file** inside the `backend/` directory with the following:
```ini
PORT=5000
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/?retryWrites=true&w=majority
```
- **Start the backend server**
```bash
npm run dev
```

### **3️⃣ Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### **4️⃣ Open the App**
Visit `http://localhost:5173/` in your browser.

---

## 🚀 Deployment

### **Backend Deployment (Render)**
1. **Push the project to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
2. **Deploy on Render**
   - Go to [Render](https://render.com/)
   - Create a **New Web Service**
   - Select your **GitHub Repository**
   - Set the **Root Directory** to `/backend`
   - Set the **Build Command** to:
     ```bash
     cd backend && npm install
     ```
   - Set the **Start Command** to:
     ```bash
     cd backend && npm start
     ```
   - Add **Environment Variables**:
     ```ini
     MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/?retryWrites=true&w=majority
     PORT=5000
     ```
   - Click **Deploy** 🚀

### **Frontend Deployment (Vercel/Netlify)**
```bash
cd frontend
npm install -g vercel
vercel
```
Follow the steps and deploy!

---

## 🛠️ API Endpoints
### **Candidate Routes**
| Method | Route | Description |
|--------|-------------------|-------------------------------|
| `POST` | `/api/candidates` | Add a new candidate |
| `GET` | `/api/candidates` | Get all candidates |
| `PUT` | `/api/candidates/:id/status` | Update candidate status |
| `DELETE` | `/api/candidates/:id` | Delete a candidate |

---

## 👨‍💻 Tech Stack
- **Frontend:** React + Vite + Material UI
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Atlas)
- **Hosting:** Render (Backend) & Vercel/Netlify (Frontend)

---

## 🎯 Future Improvements
- ✅ User Authentication (JWT)
- ✅ Resume File Upload (AWS S3 / Firebase)
- ✅ Metrics Dashboard (Candidate stats)

---

## 🤝 Contributing
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature-branch
   ```
3. **Make changes & commit**
   ```bash
   git commit -m "Added new feature"
   ```
4. **Push changes**
   ```bash
   git push origin feature-branch
   ```
5. **Submit a Pull Request (PR)** 🚀

---

## 📞 Support
If you run into any issues, feel free to open an issue or contact me at **rambedade2308@example.com**.

---

### 🔥 **Star the Repo if You Like It!** ⭐

