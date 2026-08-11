<div align="center">
  <h1>🏥 Cliniva - Modern Hospital Management System</h1>
  <p>A comprehensive, next-generation Hospital Management System powered by a Graph Database architecture.</p>
</div>

---

## 🌟 Overview

Cliniva is a full-stack Hospital Management System built to streamline hospital operations. It provides role-based access control for Admins, Doctors, and Patients, enabling seamless appointment scheduling, medical record management, and administrative oversight. 

Recently migrated to a **Graph Database** (CognoDB/Neo4j) for superior relationship mapping (e.g., Doctors working in Departments, Patients booking Appointments) and lightning-fast traversal queries.

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-role Login System**: Admin, Doctor, and Patient access portals.
- **JWT Authentication**: Secure, stateless session management.
- **Role-based Access Control**: Granular permissions and specialized dashboards for each role.

### 👨‍⚕️ Admin Features
- **Centralized Dashboard**: High-level overview of hospital operations.
- **Doctor & Patient Management**: Full CRUD operations for all users.
- **Department Organization**: Assign and manage hospital departments.
- **Schedule & Appointments**: Oversee shifts and monitor all bookings.
- **Pharmacy Inventory**: Track medicines and stock.

### 👩‍⚕️ Doctor Features
- **Professional Dashboard**: Personalized insights and upcoming schedules.
- **Appointment Management**: Accept, view, and manage daily patient visits.
- **Patient Records**: Secure access to patient medical histories.

### 👤 Patient Features
- **Patient Dashboard**: Personalized interface for personal health data.
- **Appointment Booking**: Seamlessly schedule visits with available doctors.
- **Medical Records**: Access and review personal medical history and prescriptions.

---

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI Component Library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling for a sleek dark mode UI
- **React Router** - Client-side routing

### Backend
- **Node.js & Express.js** - Robust server and API framework
- **CognoDB (Graph Database)** - Schema-less, highly relational graph database replacing traditional SQL.
- **Neo4j Driver** - Cypher query execution via Bolt protocol.
- **JWT** - Secure JSON Web Tokens
- **Cloudinary** - Cloud image storage for user avatars

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/SoubhagyaGhoshal/Hospital-Management-System.git
cd Hospital-Management-System
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Environment Configuration:**
Create a `.env` file in the `backend` directory:
```env
PORT=4000
SECRET_KEY=your_jwt_secret_key
COGNODB_URI=bolt+s://your-database-url.databases.cognodb.com
COGNODB_USER=your_db_username
COGNODB_PASSWORD=your_db_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
*(Note: If env variables are omitted, the backend will attempt to fallback to default demo credentials).*

**Start the Server:**
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start the Vite development server
npm run dev
```

---

## 👥 Default Login Credentials

Because the system uses a Graph Database, data is fresh. On first boot, an admin account will automatically generate:

### Admin
- **Email/Username**: `admin`
- **Password**: `admin123`

### Doctors & Patients
- Please use the **Signup** page on the frontend to register new Doctors and Patients into the Graph Database.

---

## 🏗️ Project Architecture

```
Hospital-Management-System/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # JWT auth and validators
│   ├── models/           # CognoDB connection manager
│   ├── routes/           # Express API endpoints
│   ├── services/         # Core Cypher queries & Graph Logic
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── Api/          # Axios interceptors & endpoints
│   │   ├── component/    # Reusable UI components
│   │   ├── pages/        # Route views (Home, Dashboards)
│   │   └── App.jsx       # Main router
│   └── index.html
└── README.md
```

---

## 🎨 UI & Aesthetics

- **Responsive Design**: Flawless experience across desktop, tablet, and mobile.
- **Premium Dark Theme**: Modern `#1a202e` dark UI with vibrant accent colors and glassmorphism elements.
- **Interactive Micro-animations**: Smooth hover states and seamless page transitions.

---

## 🤝 Contributing

Contributions are welcome!
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Soubhagya Ghoshal**
- GitHub: [@SoubhagyaGhoshal](https://github.com/SoubhagyaGhoshal)

**⭐ Star this repository if you find it helpful!**
