# Quick Fix Guide for Cliniva Hospital Management System

## Issue
The application is showing "Internal server error" because the backend database is not properly connected.

## Root Cause
The backend is trying to connect to a database that's not configured in the production environment, causing API calls to fail.

## Solution

### Option 1: Use Demo Mode (Recommended for quick testing)

1. **Backend is already updated** to work in demo mode without a database
2. **Frontend is already configured** to connect to the correct backend URL
3. **Login credentials for demo mode:**
   - Username: `admin`
   - Password: `admin123`

### Option 2: Set up Database (For full functionality)

1. **Create a PostgreSQL database** on Render or Railway
2. **Set environment variables** in your backend deployment:
   ```
   NODE_ENV=production
   DATABASE_URL=your-postgresql-connection-string
   ```
3. **Deploy the updated backend** with database connection

## Current Status

✅ **Frontend**: Updated to use correct backend URL  
✅ **Backend**: Updated to work in demo mode  
✅ **API Routes**: Basic functionality available  
⚠️ **Database**: Not connected (demo mode active)

## Testing the Fix

1. **Visit**: https://cliniva.netlify.app/
2. **Login with**: admin/admin123
3. **Expected result**: Should work in demo mode

## Demo Mode Features

- ✅ Admin login
- ✅ Basic dashboard
- ✅ Demo data for doctors and patients
- ⚠️ Limited functionality (no real database)

## Full Production Setup

To enable full functionality:

1. **Database Setup**:
   - Create PostgreSQL database
   - Set DATABASE_URL environment variable
   - Run database migrations

2. **Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://user:pass@host:port/database
   SECRET_KEY=your-jwt-secret
   ```

3. **Deploy Backend**:
   - Push updated code to repository
   - Deploy to Render/Railway
   - Verify database connection

## Troubleshooting

If you still see errors:

1. **Check browser console** for API errors
2. **Verify backend URL** in ApiUtils.jsx
3. **Test backend directly**: https://hospital-backend-eme3.onrender.com/health
4. **Clear browser cache** and try again

## Support

For full production deployment, you'll need to:
- Set up a proper database
- Configure environment variables
- Deploy the backend with database connection

The demo mode provides a working version for testing and demonstration purposes. 