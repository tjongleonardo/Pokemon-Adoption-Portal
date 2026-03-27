# Pokémon Adoption Portal

## Project Description
Pokémon Adoption Portal is a MERN stack web application where users can browse available Pokémon, submit adoption applications, and manage their own application records. Administrators have access to management features for Pokémon, adoption centers, applications, and appointments.

This project was created for a CIS 4004 term project using the MERN stack:
- MongoDB
- Express.js
- React
- Node.js

---

## Prerequisites — What to Install

Before running this project, you need **two** things installed on your computer:

### 1. Node.js (v18 or higher)
- **Download:** https://nodejs.org/ (choose the LTS version)
- This also installs `npm` (Node Package Manager) automatically
- **Verify installation:** Open a terminal and run:
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB
You have two options:

**Option A — MongoDB Atlas (Cloud, Recommended for teams)**
1. Go to https://www.mongodb.com/atlas and create a free account
2. Create a free shared cluster
3. Under "Database Access," create a database user with a username and password
4. Under "Network Access," click "Allow Access from Anywhere" (or add your IP)
5. Click "Connect" → "Connect your application" → copy the connection string
6. It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/pokemon-adoption-portal`

**Option B — MongoDB Community Server (Local)**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start the MongoDB service
3. Your connection string will be: `mongodb://localhost:27017/pokemon-adoption-portal`

---

## Getting Started — Step by Step

### Step 1: Clone or Unzip the Project
Make sure you have the project folder with both `server/` and `client/` directories.

### Step 2: Configure the Server Environment
1. Open the file `server/.env`
2. Update the `MONGO_URI` with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/pokemon-adoption-portal
   PORT=5000
   JWT_SECRET=pokemon_secret_key_change_me
   ```
3. Replace `<username>` and `<password>` with your MongoDB credentials

### Step 3: Install Server Dependencies
Open a terminal and run:
```bash
cd server
npm install
```

### Step 4: Install Client Dependencies
Open a **second** terminal and run:
```bash
cd client
npm install
```

### Step 5: Start the Server
In the first terminal (inside `server/`):
```bash
npm run dev
```
You should see:
```
MongoDB connected
Server running on port 5000
```

### Step 6: Start the Client
In the second terminal (inside `client/`):
```bash
npm run dev
```
You should see a URL like:
```
Local: http://localhost:3000/
```

### Step 7: Open the Application
Open your browser and go to: **http://localhost:3000**

You will see the Login page. Create an account using the Register tab, then sign in.

---

## Project Structure

```
project-root/
│
├── server/                    # Node.js / Express back end
│   ├── models/                # Mongoose schemas
│   │   ├── trainerm.js        # Trainer (User) model
│   │   ├── pokemonm.js        # Pokémon model
│   │   ├── pokecenterm.js     # PokéCenter model
│   │   └── applicationm.js   # Application model
│   ├── routes/                # Express route handlers
│   │   ├── trainerr.js        # Trainer routes (register, login, CRUD)
│   │   ├── pokemonr.js        # Pokémon routes
│   │   ├── pokecenterr.js     # PokéCenter routes
│   │   └── applicationr.js   # Application routes
│   ├── mw/                    # Middleware
│   │   └── auth.js            # Authentication middleware
│   ├── index.js               # Server entry point
│   ├── package.json
│   └── .env                   # Environment variables (do NOT commit)
│
├── client/                    # React front end (Vite)
│   ├── src/
│   │   ├── pages/             # Page components
│   │   │   ├── Login.jsx      # Login / Register page
│   │   │   ├── Browse.jsx     # Browse Pokémon page
│   │   │   ├── Centers.jsx    # PokéCenters page
│   │   │   └── MyApplications.jsx  # User applications page
│   │   ├── components/        # Shared components
│   │   │   └── NavBar.jsx     # Navigation bar
│   │   ├── context/           # React context
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── App.jsx            # Root component with routing
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── index.html             # HTML entry point
│   ├── vite.config.js         # Vite configuration
│   └── package.json
│
└── README.md
```

---

## Features

### Standard User
- Register a new account
- Log in to the application
- Browse available Pokémon
- View Pokémon details
- Submit adoption applications
- Update their own applications
- Delete their own applications

### Administrator
- Manage Pokémon records (Create, Read, Update, Delete)
- Manage adoption center records
- Manage application records
- View data across the system

---

## User Roles
1. **Administrator** — full CRUD access to all entities
2. **Standard User** — can browse Pokémon, manage their own applications

The login page is the first screen shown. New users can create an account with a unique username.

---

## Data Model

The application uses five entities:
- **Trainers** (Users)
- **Pokémon**
- **PokéCenters** (Adoption Centers)
- **Applications**
- **Appointments**

### Many-to-Many Relationship
**Trainers ↔ Pokémon** through **Applications**
- One trainer can apply to adopt many Pokémon
- One Pokémon can receive applications from many trainers

---

## MongoDB Collections
The following collections are created automatically by Mongoose:
- `trainers`
- `pokemons`
- `pokecenters`
- `applications`

---

## API Endpoints

### Trainers (`/api/trainers`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/trainers/register` | Register new trainer |
| POST | `/api/trainers/login` | Login and get JWT |
| GET | `/api/trainers/` | Get all trainers |
| GET | `/api/trainers/:id` | Get trainer by ID |
| PUT | `/api/trainers/:id` | Update trainer |
| DELETE | `/api/trainers/:id` | Delete trainer |

---

## Technologies Used
- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- HTML
- CSS
- Vite (build tool for React)

---

## Authors
- Leonardo Tjong
-
-
-
-
