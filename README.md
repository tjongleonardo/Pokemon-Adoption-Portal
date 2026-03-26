# Pokemon Adoption Portal

## Project Description
Pokemon Adoption Portal is a MERN stack web application where users can browse available Pokemon, submit adoption applications, and manage their own application records. Administrators have access to management features for Pokemon, adoption centers, applications, and appointments.

This project was created for a CIS 4004 term project using the MERN stack:
- MongoDB
- Express.js
- React
- Node.js

## Features

### Standard User
- Register a new account
- Log in to the application
- Browse available Pokemon
- View Pokemon details
- Submit adoption applications
- Update their own applications
- Delete their own applications
- View their own appointments

### Administrator
- Manage Pokemon records
- Manage adoption center records
- Manage application records
- Manage appointment records
- View data across the system

## User Roles
This application includes two user types:
1. **Administrator**
2. **Standard User**

The login page is the first screen shown in the application. New users can create an account with a unique username.

## Data Model

The application uses at least five entities:

- **Users**
- **Pokemon**
- **AdoptionCenters**
- **Applications**
- **Appointments**

### Many-to-Many Relationship
There is a many-to-many relationship between **Users** and **Pokemon** through **Applications**.

- One user can apply to adopt many Pokemon
- One Pokemon can receive applications from many users

## Technologies Used
- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- HTML
- CSS

## Project Structure
Example structure:

```bash
project-root/
│
├── client/        # React front end
├── server/        # Node.js / Express back end
└── README.md
