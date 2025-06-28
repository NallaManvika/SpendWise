# 💰 SpendWise - Smart Budget Tracker

SpendWise is a personal money management web app that helps you organize expenses, set category-based budgets, track spending, and visualize usage via interactive charts. Designed for simplicity, insights, and better money control.

---

## ✨ Features

- 🔐 **User Authentication** (JWT-based)
- 🧾 **Create, Edit, Delete Categories**
- 📌 **Pin Categories** to top
- 💳 **Simulated UPI Payments**
- 🧠 **Smart Warnings** (50%, 80%, 100% usage alerts)
- 📝 **Custom Notes per Transaction**
- 🔄 **Undo Payment & Delete (5s Undo)**
- 🎯 **Reset Budget (New Month)**
- 📊 **Spending Distribution (Pie & Doughnut Charts)**

---

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| HTML, CSS, JavaScript | Node.js, Express |
| Chart.js for graphs | MongoDB with Mongoose |
| UPI deep links | JWT for auth |

---

## 🚀 Getting Started

### 📦 Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Fill your Mongo URI & JWT secret
node server.js          # Runs on http://localhost:5000
```

### 🌐 Frontend Setup

Just open `frontend/index.html` in browser OR serve via live server.

---

## 🔐 Environment Variables

In `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 📁 Folder Structure

```
spendwise/
├── backend/          # Express API
├── frontend/         # HTML, CSS, JS
├── .gitignore
├── README.md
└── ...
```

---

## 🧩 Future Enhancements 

- 🔔 Email/Push Budget Alerts
- 📈 Monthly/Yearly Reports
- 🗃️ Export to PDF/Excel
- 👨‍👩‍👧 Shared Budgets

---

## 🧑‍💻 Author

Made  by Nalla Manvika


