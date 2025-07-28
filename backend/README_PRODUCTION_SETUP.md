# Production Database Setup Guide

## Current Issue
The production backend at `hospital-backend-eme3.onrender.com` is failing because it doesn't have a proper database connection.

## Solution: Set up a real database

### Option 1: Use Railway (Recommended - Free)
1. Go to [Railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Get the connection string
4. Add it to Render environment variables

### Option 2: Use Supabase (Free tier available)
1. Go to [Supabase.com](https://supabase.com)
2. Create a new project
3. Get the PostgreSQL connection string
4. Add it to Render environment variables

### Option 3: Use Neon (Free PostgreSQL)
1. Go to [Neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Get the connection string
4. Add it to Render environment variables

## Environment Variables to Set in Render

Add these to your Render service environment variables:

```
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=hospital_management_secret_key_2024_secure_and_unique
NODE_ENV=production
```

## Database Schema
The application uses Sequelize ORM with the following models:
- Users (for authentication)
- Doctors
- Patients
- Appointments
- Departments
- Pharmacy
- Shifts

## Migration Steps
1. Set up the database
2. Add the DATABASE_URL to Render
3. Redeploy the backend
4. The application will automatically create tables and seed data

## Testing
After setup, test the login at: https://cliniva.netlify.app
Use: admin/admin123 