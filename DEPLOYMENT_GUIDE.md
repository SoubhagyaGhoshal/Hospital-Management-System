# 🚀 Deployment Guide - Hospital Management System

## 📋 **Deployment Options**

### **Option 1: Vercel (Frontend) + Railway (Backend) - ⭐ RECOMMENDED**
### **Option 2: Netlify (Frontend) + Railway (Backend)**
### **Option 3: Render (Full Stack)**

---

## 🎯 **Option 1: Vercel + Railway Deployment**

### **Step 1: Deploy Backend to Railway**

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Hospital-Management-System` repository

3. **Configure Backend**
   - Set the **Root Directory** to `backend`
   - Set the **Build Command** to: `npm install`
   - Set the **Start Command** to: `npm start`

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=4000
   DB_HOST=your-railway-mysql-host
   DB_USER=your-railway-mysql-user
   DB_PASSWORD=your-railway-mysql-password
   DB_NAME=railway
   JWT_SECRET=your-super-secret-jwt-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

5. **Add MySQL Database**
   - In Railway dashboard, click "New"
   - Select "Database" → "MySQL"
   - Copy the connection details to your environment variables

6. **Deploy**
   - Railway will automatically deploy your backend
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### **Step 2: Deploy Frontend to Vercel**

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your `Hospital-Management-System` repository
   - Set **Root Directory** to `frontend`

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

5. **Update API Configuration**
   - Replace `your-backend-url.railway.app` in `frontend/src/utils/ApiUtils/apiUtils.jsx` with your actual Railway URL

6. **Deploy**
   - Vercel will automatically deploy your frontend
   - Your app will be available at `https://your-app.vercel.app`

---

## 🎯 **Option 2: Netlify + Railway Deployment**

### **Frontend to Netlify**

1. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Deploy from Git**
   - Click "New site from Git"
   - Choose your repository
   - Set **Base directory** to `frontend`
   - Set **Build command** to `npm run build`
   - Set **Publish directory** to `dist`

3. **Configure Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL=https://your-backend-url.railway.app/api`

---

## 🎯 **Option 3: Render Deployment**

### **Full Stack on Render**

1. **Sign up for Render**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create Web Service (Backend)**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Set **Root Directory** to `backend`
   - Set **Build Command** to `npm install`
   - Set **Start Command** to `npm start`

3. **Create Static Site (Frontend)**
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Set **Root Directory** to `frontend`
   - Set **Build Command** to `npm run build`
   - Set **Publish Directory** to `dist`

---

## 🔧 **Database Setup**

### **For Railway/Render:**

1. **Create MySQL Database**
   - Add MySQL service in your platform
   - Copy connection details

2. **Run Migrations**
   ```bash
   # In Railway/Render shell
   cd backend
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

### **For Local Development:**

```bash
# Create database
mysql -u root -p
CREATE DATABASE hospital;
USE hospital;
exit;

# Run migrations
cd backend
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

## 🌐 **Environment Variables**

### **Backend (.env)**
```env
NODE_ENV=production
PORT=4000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=hospital
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### **Frontend (.env)**
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

---

## 🔄 **Update API Configuration**

After deploying your backend, update the API URL in:
`frontend/src/utils/ApiUtils/apiUtils.jsx`

```javascript
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://your-backend-url.railway.app/api"  // Your deployed backend URL
    : "http://localhost:4000/api",
});
```

---

## ✅ **Post-Deployment Checklist**

- [ ] Backend deployed and accessible
- [ ] Database connected and migrations run
- [ ] Frontend deployed and accessible
- [ ] API calls working from frontend
- [ ] Authentication working
- [ ] All features tested
- [ ] Environment variables configured
- [ ] CORS configured properly

---

## 🚀 **Quick Deploy Commands**

### **Railway (Backend)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### **Vercel (Frontend)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 📞 **Support**

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check CORS configuration
5. Verify database connection

---

**🎉 Your Hospital Management System will be live online!** 