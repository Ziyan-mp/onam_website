# Onam Lucky Draw 2026

Welcome to the **Onam Lucky Draw 2026** platform! This project is a complete, full-stack web application built to manage and host a festive digital lucky draw event. It features a beautiful, responsive, and animated frontend alongside a robust Node.js and MongoDB backend.

## 🌟 Features

### Frontend (`onam_website`)
- **Modern UI/UX:** Built with React 19, Tailwind CSS v4, and Framer Motion for smooth, premium micro-animations.
- **Responsive Design:** Fully responsive layout optimized for mobile, tablet, and desktop viewing.
- **Dynamic Components:** Includes interactive elements like a live countdown, interactive prize cards, and a smooth timeline of events.
- **Admin Dashboard:** A dedicated admin interface to manage tickets, draws, participants, and view system reports.
- **Ticket Purchasing Flow:** Integrated registration and checkout process, structured for Razorpay payments.
- **Optimized Performance:** Uses Vite for rapid development and optimized production builds.

### Backend (`onam_backend`)
- **RESTful API:** Built with Node.js and Express to handle seamless data communication.
- **MongoDB Database:** Managed using Mongoose, featuring secure and structured schemas for:
  - **Admins:** Role-based access and secure authentication.
  - **Prizes:** Management of exclusive bumper prizes.
  - **Tickets/Participants:** Tracking purchased tickets, user details, and payment statuses.
  - **Draws:** Managing live lucky draw rounds and winner tracking.
- **Seeding Script:** Includes a robust seeding utility (`npm run seed`) to quickly populate the database with default prizes and mock tickets.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (Running locally or via MongoDB Atlas)

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd onam_backend
```

Install dependencies:
```bash
npm install
```

Configure Environment Variables:
Create a `.env` file in the `onam_backend` root and configure your MongoDB connection:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/onam_luckydraw
JWT_SECRET=supersecretkey_onam_draw_2026
RAZORPAY_KEY_ID=mock_razorpay_key
RAZORPAY_KEY_SECRET=mock_razorpay_secret
```

Seed the Database (Optional but recommended):
```bash
npm run seed
```

Start the Backend Server:
```bash
npm start
```

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd onam_website
```

Install dependencies:
```bash
npm install
```

Start the Development Server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application in your browser.

## 🛠️ Technology Stack

**Frontend:** React (v19), Vite, Tailwind CSS, Framer Motion, React Router DOM, React Hook Form, Axios.  
**Backend:** Node.js, Express, MongoDB, Mongoose, dotenv, cors.

## 📁 Project Structure

```text
.
├── onam_website/          # React Frontend application
│   ├── src/
│   │   ├── admin/         # Admin dashboard components and views
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application routes
│   │   ├── services/      # API communication layer
│   │   └── ...
│   └── ...
└── onam_backend/          # Node.js/Express Backend application
    ├── config/            # Database and app configuration
    ├── models/            # Mongoose schemas (Admin, Draw, Prize, Ticket)
    ├── scripts/           # Database seeding scripts
    └── ...
```

## 📝 License

This project is proprietary and built specifically for the Onam Lucky Draw 2026 event.
