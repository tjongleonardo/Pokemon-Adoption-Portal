# Pokémon Adoption Portal

A full-stack MERN application where trainers can explore an interactive Pokémon world map, meet region professors, browse starter Pokémon from all 9 regions, submit adoption applications with custom names, and track their adoption status. Administrators can review applications and provide feedback to trainers.

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

## Getting Started

### Windows Quick Start
If you are on Windows, you can simply double-click the `quickOpen.bat` file in the root directory. This will automatically install all dependencies and start both the client and server for you. Before running the script, make sure you have set up your MongoDB Atlas connection string in the `.env` file.

If you prefer to set up manually or are on a different OS, follow the steps below.

### Step 1: Clone or Download the Project
```bash
git clone https://github.com/tjongleonardo/Pokemon-Adoption-Portal.git
cd Pokemon-Adoption-Portal
```

### Step 2: Configure Server Environment
1. Navigate to the `server/` directory
2. Create a `.env` file with the following variables:
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
Populate your database with 27 starter Pokémon:
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
- react (v19) - UI library
- react-router-dom (v7) - Routing
- axios - HTTP client
- **antd** (v6) - Ant Design component library
- **@ant-design/icons** (v6) - Ant Design icons
- vite (v6) - Build tool

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
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Step 8: Open the Application
Open your browser and go to: **http://localhost:3000**

---

## Note on Ports (For Mac Users)

**macOS Monterey and later** use port 5000 for AirPlay Receiver, which is why this project has been updated to use port **5001** by default to avoid conflicts.

If you ever need to use port 5000, you can disable the AirPlay Receiver:
1. Open **System Settings** (or System Preferences)
2. Go to **General** → **AirDrop & Handoff**
3. Toggle **AirPlay Receiver** to **Off**

---

## Project Structure

```
Pokemon-Adoption-Portal/
│
├── server/                              # Node.js / Express backend
│   ├── models/                          # Mongoose schemas
│   │   ├── trainerm.js                  # Trainer (User) model
│   │   ├── pokemonm.js                  # Pokemon model
│   │   ├── pokecenterm.js               # PokeCenter model
│   │   └── applicationm.js              # Application model
│   ├── routes/                          # Express route handlers
│   │   ├── trainerr.js                  # Trainer routes (register, login, auth middleware)
│   │   ├── pokemonr.js                  # Pokemon routes
│   │   ├── pokecenterr.js               # PokeCenter routes
│   │   └── applicationr.js              # Application routes
│   ├── seedStarters.js                  # Database seeding script (27 starters)
│   ├── checkDatabase.js                 # Database verification utility
│   ├── makeAdmin.js                     # Admin user promotion utility
│   ├── testAdoption.js                  # Adoption flow test script
│   ├── index.js                         # Server entry point
│   └── package.json
│
├── client/                              # React frontend (Vite)
│   ├── src/
│   │   ├── pages/                       # Page components
│   │   │   ├── Login.jsx                # Login/Register page
│   │   │   ├── Login.css                # Login page styles
│   │   │   ├── Browse.jsx               # Browse Pokemon by region/type
│   │   │   ├── Centers.jsx              # PokeCenters page
│   │   │   ├── MyApplications.jsx       # User applications tracker
│   │   │   └── AdminReview.jsx          # Admin review panel
│   │   ├── components/
│   │   │   ├── NavBar.jsx               # Navigation bar
│   │   │   ├── NavBar.css               # Navigation styles
│   │   │   ├── WorldMap/                # Interactive world map
│   │   │   │   ├── WorldMap.jsx         # Map container with region markers
│   │   │   │   ├── WorldMap.css         # Map layout and animations
│   │   │   │   └── RegionMarker.jsx     # Clickable region marker pins
│   │   │   ├── RegionShowcase/          # Region detail showcase
│   │   │   │   ├── RegionShowcase.jsx   # Pokemon grid for selected region
│   │   │   │   └── RegionShowcase.css   # Showcase styles and animations
│   │   │   └── ProfessorDialogue/       # Professor dialogue system
│   │   │       ├── ProfessorDialogue.jsx # Typewriter dialogue with portraits
│   │   │       └── ProfessorDialogue.css # Dialogue overlay and cinematic styles
│   │   ├── data/
│   │   │   ├── regionData.js            # Region config (professors, dialogues, map markers)
│   │   │   └── assets/                  # Static images
│   │   │       ├── map.png              # Custom world map background
│   │   │       ├── [Region].png         # 9 region background images
│   │   │       └── [Region] Professor [Name].png  # 9 professor portraits
│   │   ├── utils/
│   │   │   └── helpers.js               # Shared utilities (status colors, type colors)
│   │   ├── App.jsx                      # Root component with routing
│   │   ├── main.jsx                     # React entry point
│   │   └── index.css                    # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── quickOpen.bat                        # Windows one-click start script
├── .gitignore                           # Git ignore rules
├── LICENSE                              # Project license
└── README.md                            # This file
```

---

## Features

### Interactive World Map Experience
-  Custom-illustrated world map with all 9 Pokémon regions
-  Clickable PokeCenter markers positioned on each region
-  Region professors greet you with unique typewriter-style dialogue
-  Full professor portraits with cinematic overlay presentation
-  Smooth animations, hover effects, and region transitions

### Standard User (Trainer)
- ✅ Register and login with JWT authentication
- ✅ Browse 27 starter Pokémon from 9 regions (Kanto → Paldea)
- ✅ Explore regions via interactive world map
- ✅ Meet region professors with animated dialogue sequences
- ✅ Filter Pokémon by region and type (Fire, Water, Grass, etc.)
- ✅ Submit adoption applications with custom Pokémon names
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

## How to Use

### For Trainers:

1. **Register** - Create account on login page
2. **Explore** - Navigate the interactive world map
3. **Meet Professors** - Click a region marker to meet its professor
4. **Browse** - View available starter Pokémon in each region
5. **Adopt** - Click "Adopt Me!" on a Pokémon
6. **Name** - Enter the name you want to give the Pokémon (required)
7. **Submit** - Add optional message and submit application
8. **Track** - Check "My Applications" for status updates
9. **Celebrate** - When approved, see your Pokémon with its new name!

### For Admins:

1. **Login** - Login with admin account
2. **Admin Review** - Click the gold "Admin Review" link in navbar
3. **Review** - See pending applications with trainer info
4. **Approve/Reject** - Click button and enter feedback message
5. **Submit** - Trainers see your message in their applications

---

## Database Schema

### Pokemon Model
```javascript
{
  species: String (required),        // e.g., "Charmander"
  type: String (required),           // e.g., "Fire", "Grass/Poison"
  region: String (required),         // e.g., "Kanto"
  level: Number (default: 5),
  status: String,                    // "available", "pending", "adopted"
  pokecenter: ObjectId,              // Reference to PokeCenter
  imageUrl: String,                  // Official Pokemon artwork
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

## API Endpoints

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

### PokeCenters (`/api/pokecenters`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all PokeCenters | Public |

---

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8) - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **nodemon** - Development auto-restart

### Frontend
- **React** (v19) - UI library
- **Vite** (v6) - Build tool & dev server
- **React Router** (v7) - Client-side routing
- **Axios** - HTTP client
- **Ant Design** (v6) - UI component library
- **@ant-design/icons** (v6) - Icon library

---

## Regions & Professors

| Region | Professor | Specialty | Starters |
|--------|-----------|-----------|----------|
| Kanto | Professor Oak | The Pokémon Professor | Bulbasaur, Charmander, Squirtle |
| Johto | Professor Elm | Evolution Researcher | Chikorita, Cyndaquil, Totodile |
| Hoenn | Professor Birch | Field Researcher | Treecko, Torchic, Mudkip |
| Sinnoh | Professor Rowan | Evolution Authority | Turtwig, Chimchar, Piplup |
| Unova | Professor Juniper | Origin Researcher | Snivy, Tepig, Oshawott |
| Kalos | Professor Sycamore | Mega Evolution Expert | Chespin, Fennekin, Froakie |
| Alola | Professor Kukui | Move Researcher | Rowlet, Litten, Popplio |
| Galar | Professor Magnolia | Dynamax Researcher | Grookey, Scorbunny, Sobble |
| Paldea | Professor Sada | Terastal Researcher | Sprigatito, Fuecoco, Quaxly |

---

## Security

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens for stateless authentication
- Auth middleware with admin role checking (`authenticate` and `requireAdmin` in trainer routes)
- Protected routes on both frontend and backend
- Environment variables for sensitive data
- `.gitignore` protects `.env` and `node_modules`

**Important:** Never commit your `.env` file to Git!

---

## Development Scripts

### Server (`server/`)
```bash
npm run dev                    # Start server with nodemon (auto-restart)
npm start                      # Start server (production)
node seedStarters.js           # Seed database with 27 starters
node checkDatabase.js          # Verify database contents
node makeAdmin.js <username>   # Promote a user to admin
node testAdoption.js           # Test the adoption flow
```

### Client (`client/`)
```bash
npm run dev        # Start development server (Vite)
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## Troubleshooting

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

### Port conflicts
- The server defaults to port **5001** (configurable via `PORT` in `.env`)
- The client defaults to port **3000** (configurable via `vite.config.js`)
- See the Mac Users note above if port 5000 is needed

---

## Deployment

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

## Authors

- Leonardo Tjong - [GitHub](https://github.com/tjongleonardo)
- Dalyn Ho
- Anna Ngo
- Moonkyeong Choi

**CIS 4004 Term Project - 2026**

---

## License

This project is licensed for educational purposes.

---

## Acknowledgments

- Pokemon artwork from official Pokémon assets
- Ant Design for UI components
- MongoDB Atlas for database hosting
- All contributors and team members

---

## Support

For issues or questions:
1. Review the troubleshooting section above
2. Contact team members
3. Create an issue on GitHub

---

**Happy Pokémon Adopting! 🎉**
