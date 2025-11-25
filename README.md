# 🎥 Streamer

> **⚠️ Project Status: In Progress**
> 
> This project is currently under active development. More comprehensive documentation, features, and setup instructions will be added as the project progresses.

## 📖 Overview

Streamer is a modern language learning platform that combines video streaming with social features to create an immersive learning experience. Users can connect with friends, practice languages through video content, and track their learning progress.

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with secure HTTP-only cookies
- **Password Hashing**: bcryptjs
- **Validation**: Zod for runtime type validation
- **Video/Chat**: Stream Chat SDK integration
- **Development**: Nodemon with ts-node for hot reloading

### Frontend
- *(Coming soon - details will be added as development progresses)*

## 📁 Project Structure

```
streamer/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── models/          # Database models
│   │   │   ├── User.ts
│   │   │   └── FriendRequest.ts
│   │   ├── routes/          # API routes
│   │   │   ├── auth.route.ts
│   │   │   └── user.route.ts
│   │   ├── middlewares/     # Custom middleware
│   │   │   └── error.ts
│   │   ├── validations/     # Zod schemas
│   │   │   ├── env.ts
│   │   │   ├── user.ts
│   │   │   └── friendRequest.ts
│   │   ├── lib/             # Utilities and constants
│   │   │   ├── db.ts
│   │   │   └── constants.ts
│   │   └── server.ts        # Application entry point
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    └── (Coming soon)
```

## ✨ Features

### Current Features
- ✅ User authentication (signup, login, logout)
- ✅ Secure password hashing
- ✅ JWT-based session management
- ✅ Input validation with Zod
- ✅ MongoDB integration
- ✅ Error handling middleware
- ✅ TypeScript for type safety
- ✅ Environment variable validation
- ✅ **Friend System**
  - User recommendations (find users to connect with)
  - Send friend requests
  - Accept/reject friend requests
  - View received friend requests
  - View sent friend requests
  - View friends list with populated user details

### Planned Features
- 🔄 Video streaming integration
- 🔄 Real-time chat functionality
- 🔄 Language learning progress tracking
- 🔄 Enhanced user profiles
- 🔄 Onboarding flow improvements

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v20 or higher)
- MongoDB database (local or MongoDB Atlas)
- Stream Chat account (for video/chat features)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/farrukh806/streamer.git
   cd streamer/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your credentials:
   ```env
   PORT=5001
   MONGODB_URI=mongodb+srv://<username>:<password>@<domain>/<database_name>
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   STREAM_APP_KEY=YOUR_STREAM_APP_KEY
   STREAM_APP_SECRET=YOUR_STREAM_APP_SECRET
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The server will start on `http://localhost:5001` (or the PORT you specified)

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login existing user | No |
| GET | `/api/auth/logout` | Logout current user | Yes |

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/recommendations` | Get recommended users to connect with | Yes |
| GET | `/api/user/friends` | Get current user's friends list | Yes |
| POST | `/api/user/send-friend-request/:id` | Send a friend request to a user | Yes |
| PUT | `/api/user/update-friend-request-status/:id` | Accept or reject a friend request | Yes |
| GET | `/api/user/friend-requests` | Get received friend requests | Yes |
| GET | `/api/user/sent-friend-requests` | Get sent friend requests | Yes |

### Request/Response Examples

#### Signup
**Request:**
```json
POST /api/auth/signup
{
  "email": "john@example.com",
  "password": "password123",
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "success": true,
  "data": {
    "_id": "...",
    "email": "john@example.com",
    // ... other user fields
  }
}
```

#### Login
**Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "success": true,
  "data": {
    "_id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    // ... other user fields (password excluded)
  }
}
```

#### Get Recommended Users
**Request:**
```
GET /api/user/recommendations
```

**Response:**
```json
{
  "message": "Recommendations fetched successfully",
  "success": true,
  "data": [
    {
      "_id": "...",
      "fullName": "Jane Smith",
      "profilePicture": "https://...",
      "learningLanguage": "French",
      "nativeLanguage": "English"
    }
    // ... more users
  ]
}
```

#### Send Friend Request
**Request:**
```
POST /api/user/send-friend-request/USER_ID
```

**Response:**
```json
{
  "message": "Friend request sent successfully",
  "success": true,
  "data": {
    "_id": "...",
    "sender": "...",
    "recipient": "...",
    "status": "pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### Update Friend Request Status
**Request:**
```json
PUT /api/user/update-friend-request-status/FRIEND_REQUEST_ID
{
  "status": "accepted"  // or "rejected"
}
```

**Response:**
```json
{
  "message": "Friend request accepted successfully",
  "success": true
}
```

#### Get Friend Requests (Received)
**Request:**
```
GET /api/user/friend-requests
```

**Response:**
```json
{
  "message": "Friend requests fetched successfully",
  "success": true,
  "data": [
    {
      "_id": "...",
      "sender": {
        "_id": "...",
        "fullName": "Jane Smith",
        "profilePicture": "https://...",
        "learningLanguage": "French",
        "nativeLanguage": "English"
      },
      "recipient": "...",
      "status": "pending",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### Get Sent Friend Requests
**Request:**
```
GET /api/user/sent-friend-requests
```

**Response:**
```json
{
  "message": "Friend requests fetched successfully",
  "success": true,
  "data": [
    {
      "_id": "...",
      "sender": "...",
      "recipient": {
        "_id": "...",
        "fullName": "Bob Johnson",
        "profilePicture": "https://...",
        "learningLanguage": "Spanish",
        "nativeLanguage": "German"
      },
      "status": "pending",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### Get Friends List
**Request:**
```
GET /api/user/friends
```

**Response:**
```json
{
  "message": "Friends fetched successfully",
  "success": true,
  "data": [
    {
      "_id": "...",
      "fullName": "Alice Brown",
      "profilePicture": "https://...",
      "learningLanguage": "Japanese",
      "nativeLanguage": "English"
    }
    // ... more friends
  ]
}
```

## 🔒 Security Features

- Passwords are hashed using bcryptjs with salt rounds
- JWT tokens stored in HTTP-only cookies to prevent XSS attacks
- Cookies configured with `sameSite: 'strict'` to prevent CSRF
- Secure cookies in production environment
- Password field excluded from queries by default
- Environment variable validation on startup
- Authorization checks for friend request operations (only recipients can accept/reject)

## 🤝 Friend System Logic

### Sending Friend Requests
- Users cannot send friend requests to themselves
- Users cannot send requests to existing friends
- Duplicate friend requests are prevented (checks both directions)
- Friend requests are created with "pending" status

### Managing Friend Requests
- Only the recipient can accept or reject a friend request
- When accepted:
  - Both users are added to each other's friends list using `$addToSet` (prevents duplicates)
  - Request status is updated to "accepted"
- When rejected:
  - Request status is updated to "rejected"
  - No changes are made to friends lists

### User Recommendations
- Shows users who are:
  - Not the current user
  - Not already friends
  - Have completed onboarding (`isOnboarded: true`)

## 🗄️ Database Schema

### User Model
```typescript
{
  fullName: string;
  email: string;           // unique
  password: string;        // hashed, not returned in queries
  bio: string;             // optional
  profilePicture: string;  // optional
  nativeLanguage: string;
  learningLanguage: string;
  isOnboarded: boolean;    // default: false
  friends: ObjectId[];     // references to other users
  timestamps: true;        // createdAt, updatedAt
}
```

### FriendRequest Model
```typescript
{
  sender: ObjectId;        // reference to User who sent the request
  recipient: ObjectId;     // reference to User who receives the request
  status: string;          // enum: "pending" | "accepted" | "rejected"
                           // default: "pending"
  timestamps: true;        // createdAt, updatedAt
}
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build

### TypeScript Configuration

The project uses strict TypeScript settings for maximum type safety:
- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- ESModule interop enabled

## 🤝 Contributing

*(Guidelines will be added as the project matures)*

## 📝 License

ISC
---

**Note**: This README will be updated regularly as new features are implemented and the project evolves. Check back for updates!
