# 💪 Fitness Tracker Website

A modern, responsive fitness tracking web application built with React, Tailwind CSS, Express, and MongoDB Atlas.

## Features

- 🔐 User authentication (default: admin/admin)
- 📊 Visual body progress tracking with muscle group visualization
- ❤️ Health metrics monitoring (blood sugar, blood pressure, heart rate, etc.)
- 🚶 Daily activity tracking (steps, running distance, calories)
- 🥗 Personalized nutrition recommendations
- 🏋️ Exercise plan with progress tracking
- 📱 Fully responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/fitness-tracker?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
PORT=5000
```

### 3. Run the Application

**Start the backend server:**
```bash
npm run server
```

**In a new terminal, start the frontend:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Default Login Credentials

- **Username**: admin
- **Password**: admin

## Project Structure

```
fitness-tracker/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BodyVisualization.jsx
│   │   ├── HealthMetrics.jsx
│   │   ├── ActivityTracker.jsx
│   │   ├── NutritionPlan.jsx
│   │   └── ExercisePlan.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/                 # Backend Express application
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── user.js
│   └── index.js
├── package.json
└── README.md
```

## Features Overview

### Body Visualization
- Visual representation of muscle groups
- Color-coded progress indicators (green: excellent, yellow: good, orange: needs work)
- Real-time progress tracking

### Health Metrics
- Blood sugar monitoring
- Blood pressure tracking
- Heart rate display
- Body composition (weight, BMI, body fat percentage)

### Activity Tracking
- Daily step counter with goals
- Running distance tracker
- Calories burned

### Nutrition Plan
- Daily protein intake tracking
- Recommended protein-rich foods
- Progress visualization

### Exercise Plan
- Daily exercise checklist
- Interactive completion tracking
- Progress monitoring

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### User Data
- `GET /api/user/data` - Get user fitness data (requires auth)
- `PUT /api/user/data` - Update user fitness data (requires auth)

## Development

The application uses Vite for fast development and hot module replacement. Any changes to the frontend code will automatically reload in the browser.

## Production Build

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

## License

MIT
