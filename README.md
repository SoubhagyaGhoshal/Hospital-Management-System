# 🏥 Hospital Management System

A comprehensive Hospital Management System built with **React.js** (Frontend) and **Node.js/Express.js** (Backend) with **MySQL** database. This system provides role-based access for Admin, Doctors, and Patients with full CRUD operations.

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-role Login System**: Admin, Doctor, and Patient login
- **JWT Token Authentication**: Secure session management
- **Role-based Access Control**: Different dashboards for each role

### 👨‍⚕️ Admin Features
- **Dashboard**: Overview of hospital statistics
- **Doctor Management**: Add, edit, delete, and view doctors
- **Patient Management**: Manage patient records
- **Department Management**: Organize hospital departments
- **Appointment Management**: Schedule and manage appointments
- **Shift Management**: Manage doctor schedules
- **Pharmacy Management**: Medicine inventory and management

### 👩‍⚕️ Doctor Features
- **Professional Dashboard**: Personalized doctor dashboard
- **Appointment Management**: View and manage appointments
- **Patient Records**: Access patient medical records
- **Schedule Management**: Manage availability and working hours
- **Patient Statistics**: Track patient data and appointments

### 👤 Patient Features
- **Patient Dashboard**: Personalized patient interface
- **Appointment Booking**: Schedule appointments with doctors
- **View Appointments**: Check scheduled appointments
- **Medical Records**: Access personal medical history
- **Profile Management**: Update personal information

## 🛠️ Technology Stack

### Frontend
- **React.js** - User interface framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **Sequelize ORM** - Database object-relational mapping
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image upload and storage

### Database
- **MySQL** - Primary database
- **Sequelize Migrations** - Database schema management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/SoubhagyaGhoshal/Hospital-Management-System.git
cd Hospital-Management-System
```

### 2. Database Setup
```bash
# Start MySQL service
brew services start mysql  # macOS
# or
sudo systemctl start mysql  # Linux

# Create database
mysql -u root -p
CREATE DATABASE hospital;
USE hospital;
exit;
```

### 3. Backend Setup
```bash
cd backend
npm install

# Configure database connection
# Edit backend/config/config.json with your MySQL credentials

# Run database migrations
npx sequelize-cli db:migrate

# Start backend server
node server.js
# or
nodemon server.js  # for development
```

### 4. Frontend Setup
```bash
cd frontend
npm install

# Start frontend development server
npm run dev
```

## 🔧 Configuration

### Database Configuration
Edit `backend/config/config.json`:
```json
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "hospital",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Environment Variables
Create `.env` file in backend directory:
```env
SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 👥 Default Login Credentials

### Admin
- **Username**: `admin`
- **Password**: `admin123`

### Doctors
- **Dr. Jane Smith**: `jane@example.com` / `doctor123`
- **Dr. Alice Brown**: `alice@example.com` / `doctor123`
- **Dr. Bob Green**: `bob@example.com` / `doctor123`

### Patients
- **Mary Johnson**: `mary@example.com` / `mary123`
- **Tom Williams**: `tom@example.com` / `tom123`

## 📱 Application URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api

## 🏗️ Project Structure

```
Hospital-Management-System/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── Api/
│   │   ├── component/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── Redux/
│   │   └── utils/
│   ├── index.html
│   └── package.json
├── README.md
└── .gitignore
```

## 🔌 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/doctor/login` - Doctor login
- `POST /api/patient/login` - Patient login

### Admin Routes
- `GET /api/doctor` - Get all doctors
- `POST /api/doctor` - Add new doctor
- `PUT /api/doctor/:id` - Update doctor
- `DELETE /api/doctor/:id` - Delete doctor

### Patient Routes
- `GET /api/patient` - Get all patients
- `POST /api/patient` - Add new patient
- `PUT /api/patient/:id` - Update patient
- `DELETE /api/patient/:id` - Delete patient

### Appointment Routes
- `GET /api/appointment` - Get all appointments
- `POST /api/appointment` - Create appointment
- `PUT /api/appointment/:id` - Update appointment
- `DELETE /api/appointment/:id` - Delete appointment

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Modern dark UI with professional styling
- **Interactive Components**: Dynamic forms, tables, and navigation
- **Real-time Updates**: Live data updates and notifications
- **Professional Icons**: Medical-themed icons and graphics

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **CORS Protection**: Cross-origin resource sharing security
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: Sequelize ORM protection

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to hosting service (Netlify, Vercel, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Soubhagya Ghoshal**
- GitHub: [@SoubhagyaGhoshal](https://github.com/SoubhagyaGhoshal)
- Repository: [Hospital-Management-System](https://github.com/SoubhagyaGhoshal/Hospital-Management-System)

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MySQL and Sequelize for database management
- All contributors and supporters of this project

## 📞 Support

If you have any questions or need support, please open an issue on GitHub or contact the author.

---

**⭐ Star this repository if you find it helpful!**
