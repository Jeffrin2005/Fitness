# 🚀 Deployment Guide - Vercel + Render

## Overview
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Node.js/Express)
- **Database**: MongoDB Atlas (already configured)

---

## 📦 Part 1: Deploy Backend to Render

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `fitness-tracker-api`
   - **Root Directory**: Leave empty (or `./`)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Instance Type**: Free

### Step 3: Add Environment Variables on Render
Click **"Environment"** and add:
```
MONGODB_URI=mongodb+srv://jeffrin2005:jeffrin%40123@clusterfitness.9aofrxm.mongodb.net/fitness-tracker?retryWrites=true&w=majority&appName=Clusterfitness
JWT_SECRET=fitness-tracker-secret-key-2024
PORT=5000
FRONTEND_URL=https://your-app.vercel.app
```

### Step 4: Deploy
- Click **"Create Web Service"**
- Wait for deployment (5-10 minutes)
- Copy your backend URL: `https://fitness-tracker-api.onrender.com`

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Update API URL in Frontend
Before deploying, update `vercel.json` with your Render backend URL:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR-RENDER-URL.onrender.com/api/:path*"
    }
  ]
}
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables on Vercel
Click **"Environment Variables"** and add:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 4: Deploy
- Click **"Deploy"**
- Wait for deployment (2-3 minutes)
- Your app will be live at: `https://your-app.vercel.app`

---

## 🔄 Update Backend with Frontend URL

Go back to Render and update the `FRONTEND_URL` environment variable:
```
FRONTEND_URL=https://your-app.vercel.app
```

Then click **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Testing Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try logging in with: `admin` / `admin`
3. Check if data loads correctly

---

## 🐛 Troubleshooting

### CORS Errors
Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly

### API Not Working
1. Check Render logs for errors
2. Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
3. Test backend directly: `https://your-backend.onrender.com/api/health`

### Build Failures
- Check Node version compatibility
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render: Backend may sleep after 15 min of inactivity (first request takes 30s to wake up)
   - Vercel: 100GB bandwidth/month
   - MongoDB Atlas: 512MB storage

2. **Custom Domain** (Optional):
   - Vercel: Add custom domain in project settings
   - Render: Add custom domain in service settings

3. **Environment Variables**:
   - Never commit `.env` file to GitHub
   - Always use environment variables for secrets

---

## 🎉 Your App is Live!

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Database**: MongoDB Atlas (cloud)

Congratulations! Your fitness tracker is now accessible worldwide! 🌍
