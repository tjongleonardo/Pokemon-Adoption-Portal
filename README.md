# Pokémon Adoption Portal

A full-stack MERN application where trainers can browse starter Pokémon from all 9 regions, submit adoption applications with custom names, and track their adoption status. Administrators can review applications and provide feedback to trainers.

---

## 📋 Prerequisites

Before running this project, you need:

### 1. Node.js (v18 or higher)
- **Download:** https://nodejs.org/ (choose the LTS version)
- This also installs `npm` (Node Package Manager) automatically
- **Verify installation:**
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB

**For Team Members - MongoDB Atlas**
1. Create a free account at https://www.mongodb.com/atlas
2. Create a new cluster (M0 free tier)
3. Click **Connect** → **Drivers**
4. Copy the connection string. **Make sure to use the connection string with the SRV record toggled OFF** (for Node.js driver version 2.2.12 or earlier).
5. Replace `<username>` and `<password>` with your database credentials.
6. Example: `mongodb://username:password@ac-xxxx-shard-00-00.mongodb.net:27017,ac-xxxx-shard-00-01.mongodb.net:27017,ac-xxxx-shard-00-02.mongodb.net:27017/?ssl=true&replicaSet=atlas-xxxx-shard-0&authSource=admin`

**For Other Users - MongoDB Local**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start the MongoDB service
3. Connection string: `mongodb://localhost:27017/pokemon-adoption-portal`

---

## 🚀 Getting Started

### ⚡ Windows Quick Start
If you are on Windows, you can simply double-click the `quickOpen.bat` file in the root directory. This will automatically install all dependencies and start both the client and server for you!

If you prefer to set up manually or are on a different OS, follow the steps below.

### Step 1: Clone or Download the Project
```bash
git clone https://github.com/YOUR_USERNAME/Pokemon-Adoption-Portal.git
cd Pokemon-Adoption-Portal
```

### Step 2: Configure Server Environment
1. Navigate to the `server/` directory
2. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://username:password@ac-xxxx-shard-00-00.mongodb.net:27017,ac-xxxx-shard-00-01.mongodb.net:27017,ac-xxxx-shard-00-02.mongodb.net:27017/?ssl=true&replicaSet=atlas-xxxx-shard-0&authSource=admin
   PORT=5001
   JWT_SECRET=your_secret_key_change_this_to_something_secure
   ```

### Step 3: Install Server Dependencies
```bash
cd server
npm install
```

**Dependencies include:**
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin resource sharing
- dotenv - Environment variables

### Step 4: Seed the Database
Populate your database with 27 starter Pokemon:
```bash
node seedStarters.js
```

You should see:
```
Connected to MongoDB
Cleared existing Pokemon
Inserted 27 starter Pokemon
Kanto: 3 starters
Johto: 3 starters
...
```


### Step 5: Install Client Dependencies
Open a **new terminal** and run:
```bash
cd client
npm install
```

**Dependencies include:**
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- **antd** - Ant Design component library
- **@ant-design/icons** - Ant Design icons
- vite - Build tool

### Step 6: Start the Server
In the server terminal:
```bash
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 5001
```

### Step 7: Start the Client
In the client terminal:
```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Step 8: Open the Application
Open your browser and go to: **http://localhost:3000**

---

## 🍎 Note on Ports (For Mac Users)

**macOS Monterey and later** use port 5000 for AirPlay Receiver, which is why this project has been updated to use port **5001** by default to avoid conflicts.

If you ever need to use port 5000, you can disable the AirPlay Receiver:
1. Open **System Settings** (or System Preferences)
2. Go to **General** → **AirDrop & Handoff**
3. Toggle **AirPlay Receiver** to **Off**

---

## 📁 Project Structure

```
Pokemon-Adoption-Portal/
│
├── server/                         # Node.js / Express backend
│   ├── models/                     # Mongoose schemas
│   │   ├── trainerm.js             # Trainer (User) model
│   │   ├── pokemonm.js             # Pokemon model (updated)
│   │   ├── pokecenterm.js          # PokeCenter model
│   │   └── applicationm.js         # Application model (updated)
│   ├── routes/                     # Express route handlers
│   │   ├── trainerr.js             # Trainer routes (register, login)
│   │   ├── pokemonr.js             # Pokemon routes (updated)
│   │   ├── pokecenterr.js          # PokeCenter routes
│   │   └── applicationr.js         # Application routes (updated)
│   ├── mw/                         # Middleware
│   │   └── auth.js                 # JWT authentication
│   ├── seedStarters.js             # Database seeding script (NEW)
│   ├── checkDatabase.js            # Database verification (NEW)
│   ├── makeAdmin.js                # Admin user utility (NEW)
│   ├── index.js                    # Server entry point
│   ├── package.json
│   ├── .env.example                # Environment template (NEW)
│   └── .gitignore                  # Git ignore rules (NEW)
│
├── client/                         # React frontend (Vite)
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── Login.jsx           # Login/Register page
│   │   │   ├── Browse.jsx          # Browse Pokemon (updated)
│   │   │   ├── Centers.jsx         # PokeCenters page (updated)
│   │   │   ├── MyApplications.jsx  # User applications (updated)
│   │   │   └── AdminReview.jsx     # Admin panel (NEW)
│   │   ├── components/
│   │   │   ├── NavBar.jsx          # Navigation bar (NEW)
│   │   │   └── NavBar.css          # Navigation styles (NEW)
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── App.jsx                 # Root component (updated)
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore                  # Git ignore rules (NEW)
│
├── Documentation/                  # Comprehensive guides (NEW)
│   ├── SESSION_PROGRESS.md         # Complete session log
│   ├── UPDATES.md                  # Technical changes
│   ├── APPLICATION_FLOW.md         # User journey guide
│   ├── ADMIN_GUIDE.md              # Admin documentation
│   ├── ADMIN_QUICK_START.md        # Quick admin reference
│   ├── GITHUB_PUSH_GUIDE.md        # Security & push guide
│   ├── SERVER_PUSH_CHECKLIST.md    # Server files checklist
│   ├── CLIENT_PUSH_GUIDE.md        # Client files checklist
│   └── MASTER_PUSH_CHECKLIST.md    # Complete push guide
│
└── README.md                       # This file
```

---

## ✨ Features

### Standard User (Trainer)
- ✅ Register and login with JWT authentication
- ✅ Browse 27 starter Pokemon from 9 regions
- ✅ Filter Pokemon by region (Kanto → Paldea)
- ✅ Filter Pokemon by type (Fire, Water, Grass)
- ✅ Submit adoption applications with custom Pokemon names
- ✅ Track application status (Pending/Approved/Rejected)
- ✅ View admin feedback on applications
- ✅ View PokeCenter locations

### Administrator
- ✅ All standard user features
- ✅ Access admin review panel
- ✅ View all applications (Pending/Approved/Rejected tabs)
- ✅ Approve applications with personalized messages
- ✅ Reject applications with constructive feedback
- ✅ Track review history (who reviewed, when)

---

## 🎮 How to Use

### For Trainers:

1. **Register** - Create account on login page
2. **Browse** - View available starter Pokemon
3. **Adopt** - Click "Adopt Me!" on a Pokemon
4. **Name** - Enter the name you want to give the Pokemon (required)
5. **Submit** - Add optional message and submit application
6. **Track** - Check "My Applications" for status updates
7. **Celebrate** - When approved, see your Pokemon with its new name!

### For Admins:

1. **Login** - Login with admin account
2. **Admin Review** - Click the gold "Admin Review" link in navbar
3. **Review** - See pending applications with trainer info
4. **Approve/Reject** - Click button and enter feedback message
5. **Submit** - Trainers see your message in their applications

---

## 🗄️ Database Schema

### Pokemon Model
```javascript
{
  species: String (required),        // e.g., "Charmander"
  type: String (required),           // e.g., "Fire", "Grass/Poison"
  region: String (required),         // e.g., "Kanto"
  level: Number (default: 5),
  status: String,                    // "available", "pending", "adopted"
  pokecenter: ObjectId,              // Reference to PokeCenter
  imageUrl: String,                  // Official PokeAPI artwork
  givenName: String,                 // Name assigned by trainer
  adoptedBy: ObjectId                // Reference to Trainer
}
```

### Application Model
```javascript
{
  trainer: ObjectId (required),      // Reference to Trainer
  pokemon: ObjectId (required),      // Reference to Pokemon
  status: String,                    // "pending", "approved", "rejected"
  message: String,                   // Trainer's adoption message
  proposedName: String (required),   // Name trainer wants to give
  reviewMessage: String,             // Admin's feedback
  reviewedBy: ObjectId,              // Admin who reviewed
  reviewedAt: Date                   // Review timestamp
}
```

---

## 🌐 API Endpoints

### Trainers (`/api/trainers`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new trainer | Public |
| POST | `/login` | Login and get JWT | Public |
| GET | `/` | Get all trainers | Admin |
| GET | `/:id` | Get trainer by ID | Auth |
| PUT | `/:id` | Update trainer | Owner/Admin |
| DELETE | `/:id` | Delete trainer | Admin |

### Pokemon (`/api/pokemon`)
| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/` | Get all Pokemon | `?region=Kanto&type=Fire&status=available` |
| GET | `/:id` | Get single Pokemon | - |
| PUT | `/:id` | Update Pokemon | - |

### Applications (`/api/applications`)
| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| POST | `/` | Create application | - |
| GET | `/` | Get applications | `?trainer=id&status=pending` |
| GET | `/:id` | Get single application | - |
| PUT | `/:id` | Update application (approve/reject) | - |
| DELETE | `/:id` | Delete application | - |

---

## 🎨 Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Ant Design** - UI component library
- **@ant-design/icons** - Icon library

---

## 📚 Documentation

Comprehensive guides available in the repository:

- **SESSION_PROGRESS.md** - Complete development log and file changes
- **APPLICATION_FLOW.md** - User journey and feature descriptions
- **ADMIN_GUIDE.md** - Admin system documentation
- **ADMIN_QUICK_START.md** - Quick reference for admins
- **GITHUB_PUSH_GUIDE.md** - How to push to GitHub safely
- **UPDATES.md** - Technical implementation details

---

## 🔒 Security

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens for stateless authentication
- Protected routes on both frontend and backend
- Environment variables for sensitive data
- .gitignore protects .env and node_modules
- .env.example provided as template

**Important:** Never commit your `.env` file to Git!

---

## 🛠️ Development Scripts

### Server (`server/`)
```bash
npm run dev        # Start server with nodemon (auto-restart)
npm start          # Start server (production)
node seedStarters.js     # Seed database with 27 starters
node checkDatabase.js    # Verify database contents
node makeAdmin.js <username>  # Make user an admin
```

### Client (`client/`)
```bash
npm run dev        # Start development server (Vite)
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 🐛 Troubleshooting

### Port 5000 in use (Mac)
See "For Mac Users" section above.

### MongoDB connection fails
- Check your connection string in `.env`
- Ensure MongoDB is running (if local)
- Check IP whitelist in MongoDB Atlas (if cloud)

### Dependencies not installed
```bash
# Server
cd server
rm -rf node_modules package-lock.json
npm install

# Client
cd client
rm -rf node_modules package-lock.json
npm install
```

### Ant Design components not working
Ensure you have both packages installed:
```bash
cd client
npm install antd @ant-design/icons
```

---

## 📦 Deployment

### Deploy Backend (Render/Heroku)
1. Create web service from GitHub repo
2. Set environment variables (MONGO_URI, JWT_SECRET, PORT)
3. Build command: `cd server && npm install`
4. Start command: `node index.js`

### Deploy Frontend (Vercel/Netlify)
1. Create new site from GitHub repo
2. Build command: `cd client && npm run build`
3. Publish directory: `client/dist`
4. Add environment variable: `VITE_API_URL=your-backend-url`

---

## 👥 Authors

- Leonardo Tjong - [GitHub](https://github.com/tjongleonardo)
- Dalyn Ho
- Anna Ngo
- Moonkyeong Choi

**CIS 4004 Term Project - 2026**

---

## 📄 License

This project is licensed for educational purposes.

---

## 🙏 Acknowledgments

- Pokemon sprites from [PokeAPI](https://pokeapi.co/)
- Ant Design for UI components
- MongoDB Atlas for database hosting
- All contributors and team members

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review troubleshooting section
3. Contact team members
4. Create an issue on GitHub

---

**Happy Pokemon Adopting! 🎉**
