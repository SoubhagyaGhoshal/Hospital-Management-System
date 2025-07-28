# 🚀 Deployment Guide

This guide will help you deploy your Hospital Management System to production using:
- **Frontend**: Netlify
- **Backend**: Vercel/Railway/Heroku
- **Database**: MongoDB Atlas

## 📋 Prerequisites

1. **GitHub Account** - Your code is already on GitHub
2. **Netlify Account** - For frontend deployment
3. **MongoDB Atlas Account** - For database
4. **Vercel/Railway/Heroku Account** - For backend deployment
5. **Cloudinary Account** - For image uploads (optional)

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### 1.2 Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

### 1.3 Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### 1.4 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `hospital_management`

**Example connection string:**
```
mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/hospital_management?retryWrites=true&w=majority
```

## 🌐 Step 2: Frontend Deployment (Netlify)

### 2.1 Deploy via GitHub
1. Go to [Netlify](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Click "New site from Git"
4. Choose "GitHub"
5. Select your repository: `SoubhagyaGhoshal/Hospital-Management-System`
6. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click "Deploy site"

### 2.2 Configure Environment Variables
1. Go to "Site settings" → "Environment variables"
2. Add the following variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

### 2.3 Update API Base URL
Update your frontend API configuration to use the production backend URL.

## ⚙️ Step 3: Backend Deployment

### Option A: Vercel Deployment

#### 3.1 Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your repository
5. Configure settings:
   - **Framework Preset**: Node.js
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
6. Click "Deploy"

#### 3.2 Configure Environment Variables
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/hospital_management?retryWrites=true&w=majority
   SECRET_KEY=your_super_secret_jwt_key_here
   FRONTEND_URL=https://your-frontend-domain.netlify.app
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

### Option B: Railway Deployment

#### 3.1 Deploy to Railway
1. Go to [Railway](https://railway.app)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your repository
6. Railway will automatically detect it's a Node.js project

#### 3.2 Configure Environment Variables
1. Go to your project
2. Click on the service
3. Go to "Variables" tab
4. Add the same environment variables as above

### Option C: Heroku Deployment

#### 3.1 Deploy to Heroku
1. Go to [Heroku](https://heroku.com)
2. Sign up/Login
3. Create a new app
4. Connect to your GitHub repository
5. Deploy the `backend` directory

#### 3.2 Configure Environment Variables
1. Go to "Settings" → "Config Vars"
2. Add the same environment variables as above

## 🔧 Step 4: Update Frontend Configuration

### 4.1 Update API Base URL
Update your frontend API configuration to point to your deployed backend:

```javascript
// In frontend/src/utils/ApiUtils/ApiUtils.jsx
const BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.vercel.app';
```

### 4.2 Update CORS Settings
Make sure your backend allows requests from your Netlify domain:

```javascript
// In backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-frontend-domain.netlify.app',
  credentials: true
}));
```

## 🗃️ Step 5: Database Migration

### 5.1 Create Initial Data
You'll need to create initial data in MongoDB. You can do this by:

1. **Using MongoDB Compass** (GUI tool)
2. **Using MongoDB Shell**
3. **Creating a seed script**

### 5.2 Sample Seed Script
Create a seed script to populate initial data:

```javascript
// backend/scripts/seed.js
const connectDB = require('../config/mongodb');
const User = require('../models/mongo/User');
const Doctor = require('../models/mongo/Doctor');
const Patient = require('../models/mongo/Patient');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    await connectDB();
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    // Create sample doctors
    const doctorPassword = await bcrypt.hash('doctor123', 10);
    await Doctor.create([
      {
        doctor_id: 'DOC001',
        firstName: 'Jane',
        lastName: 'Smith',
        gender: 'Female',
        mobile: '0987654321',
        password: doctorPassword,
        designation: 'Cardiologist',
        department: 'Neurology',
        address: '456 Main St',
        email: 'jane@example.com',
        birth: new Date('1985-05-05'),
        education: 'MD'
      }
      // Add more doctors...
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
```

## 🔍 Step 6: Testing Deployment

### 6.1 Test Backend API
1. Visit your backend URL: `https://your-backend-url.vercel.app`
2. You should see: `{"message": "Hospital Management System API is running!"}`

### 6.2 Test Frontend
1. Visit your Netlify URL
2. Try logging in with the credentials from the README
3. Test all features

### 6.3 Test Database Connection
1. Check your backend logs for MongoDB connection success
2. Verify data is being stored/retrieved correctly

## 🛠️ Step 7: Custom Domain (Optional)

### 7.1 Netlify Custom Domain
1. Go to your Netlify site settings
2. Click "Domain management"
3. Add your custom domain
4. Configure DNS settings

### 7.2 Backend Custom Domain
1. Configure custom domain in your hosting platform
2. Update CORS settings with new domain
3. Update frontend API URL

## 🔒 Step 8: Security Considerations

### 8.1 Environment Variables
- Never commit `.env` files to Git
- Use strong, unique passwords
- Rotate secrets regularly

### 8.2 CORS Configuration
- Only allow your frontend domain
- Don't use `*` in production

### 8.3 JWT Security
- Use strong secret keys
- Set appropriate expiration times
- Implement refresh tokens if needed

## 📊 Step 9: Monitoring

### 9.1 Backend Monitoring
- Set up logging (Winston, Morgan)
- Monitor API response times
- Set up error tracking (Sentry)

### 9.2 Database Monitoring
- Monitor MongoDB Atlas metrics
- Set up alerts for high usage
- Regular backup verification

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check CORS configuration
   - Verify frontend URL in backend settings

2. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check network access settings
   - Ensure database user has correct permissions

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match code
   - Restart deployment after adding variables

## 📞 Support

If you encounter issues:
1. Check the deployment platform logs
2. Verify all environment variables are set
3. Test locally with production settings
4. Check the troubleshooting section above

## 🎉 Success!

Once deployed, your Hospital Management System will be accessible at:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-backend-url.vercel.app`
- **Database**: MongoDB Atlas (managed)

Share your deployed application with others! 🚀 