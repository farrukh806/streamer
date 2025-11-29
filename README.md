# 🎥 Streamer

> A modern language learning platform that combines real-time communication with social features to create an immersive learning experience.

## 🌐 Live Demo

**Deployed Application**: [https://streamer-0dmt.onrender.com](https://streamer-0dmt.onrender.com)

Feel free to explore, create an account, and connect with other language learners!

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
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **UI Framework**: DaisyUI + Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios
- **Real-time Chat**: Stream Chat React SDK
- **Video Calling**: Stream Video React SDK

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
│   │   │   ├── user.route.ts
│   │   │   └── chat.routes.ts
│   │   ├── middlewares/     # Custom middleware
│   │   │   ├── error.ts
│   │   │   └── auth.middleware.ts
│   │   ├── validations/     # Zod schemas
│   │   │   ├── env.ts
│   │   │   ├── user.ts
│   │   │   └── friendRequest.ts
│   │   ├── lib/             # Utilities and constants
│   │   │   ├── db.ts
│   │   │   ├── constants.ts
│   │   │   └── stream.ts
│   │   └── server.ts        # Application entry point
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── api/             # API service layer
    │   │   ├── axios-instance.ts
    │   │   ├── fetch-helper.ts
    │   │   └── user-service.ts
    │   ├── components/      # Reusable components
    │   │   ├── Layout.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── NotificationsDropdown.tsx
    │   │   ├── UserMenu.tsx
    │   │   ├── ThemeSelector.tsx
    │   │   ├── Input.tsx
    │   │   ├── Select.tsx
    │   │   ├── Button.tsx
    │   │   ├── Label.tsx
    │   │   ├── ErrorMessage.tsx
    │   │   ├── AuthLayout.tsx
    │   │   ├── AuthImagePattern.tsx
    │   │   ├── AvatarSelector.tsx
    │   │   └── LoadingSpinner.tsx
    │   ├── hooks/           # Custom React hooks
    │   │   └── useUserAuth.ts
    │   ├── pages/           # Page components
    │   │   ├── Signup.tsx
    │   │   ├── Login.tsx
    │   │   ├── Onboarding.tsx
    │   │   └── Home.tsx
    │   ├── types/           # TypeScript types
    │   │   ├── api.ts
    │   │   └── user.ts
    │   ├── validations/     # Zod validation schemas
    │   │   └── auth.ts
    │   ├── lib/             # Utilities
    │   │   ├── constant.ts
    │   │   └── utils.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── tsconfig.json
```

## ✨ Features

### Current Features

#### Backend
- ✅ User authentication (signup, login, logout)
- ✅ Secure password hashing with bcryptjs
- ✅ JWT-based session management with HTTP-only cookies
- ✅ User onboarding flow
- ✅ Input validation with Zod
- ✅ MongoDB integration with Mongoose
- ✅ Error handling middleware
- ✅ TypeScript for type safety
- ✅ Environment variable validation
- ✅ Stream Chat SDK integration
- ✅ **Friend System**
  - User recommendations (find users to connect with)
  - Send friend requests
  - Accept/reject friend requests
  - View received friend requests
  - View sent friend requests
  - View friends list with populated user details

#### Frontend
- ✅ **Authentication Pages**
  - Signup page with avatar selection
  - Login page
  - Protected routes
  - Session management with React Query
- ✅ **Onboarding Flow**
  - Profile completion page
  - Language selection (native & learning)
  - Bio input
  - Automatic redirect if already onboarded
  - Profile picture and name display
- ✅ **Reusable Components**
  - Form components (Input, Select, Button, Label)
  - Error message handling
  - Loading states
  - Auth layout with split-screen design
- ✅ **Custom Hooks**
  - useUserAuth for authentication state
- ✅ **Type Safety**
  - Full TypeScript integration
  - Zod validation schemas
  - Type-safe API calls
- ✅ **Modern UI/UX**
  - DaisyUI + Tailwind CSS styling
  - **Theme System**: 32+ themes with persistent selection
  - **Responsive Layout**: Collapsible sidebar and mobile-friendly design
  - **Interactive Components**:
    - Real-time notifications dropdown
    - User menu with profile picture
    - Search functionality
  - Toast notifications
- ✅ **Friends Page**
  - Dedicated page to view all friends with profiles
  - Friend list displayed with user details
- ✅ **Real-time Messaging with Stream Chat**
  - One-on-one conversations with friends
  - Message history and persistence
  - Typing indicators
  - Read receipts
  - Thread support for organized conversations
- ✅ **Video Calling with Stream Video**
  - Direct video calls with friends
  - Video call integration in chat messages
  - Call notifications and invitations

### Planned Features
- 🔄 Group video calls
- 🔄 Video streaming library
- 🔄 Language learning progress tracking
- 🔄 User profiles with learning statistics

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

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd streamer/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The app will start on `http://localhost:5173` (default Vite port)

4. **Build for production**
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login existing user | No |
| POST | `/api/auth/logout` | Logout current user | Yes |
| POST | `/api/auth/onboarding` | Complete user onboarding | Yes |
| GET | `/api/auth/me` | Get current user profile | Yes |

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/recommendations` | Get recommended users to connect with | Yes |
| GET | `/api/user/friends` | Get current user's friends list | Yes |
| POST | `/api/user/send-friend-request/:id` | Send a friend request to a user | Yes |
| PUT | `/api/user/update-friend-request-status/:id` | Accept or reject a friend request | Yes |
| GET | `/api/user/friend-requests` | Get received friend requests | Yes |
| GET | `/api/user/sent-friend-requests` | Get sent friend requests | Yes |

### Chat Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/chat/stream-token` | Get Stream Chat token for authenticated user | Yes |

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

## 🎯 Key Features Explained

### Friend System
The friend system allows users to discover and connect with other language learners:
- **User Recommendations**: See suggested users who match your learning interests
- **Friend Requests**: Send requests to users and manage incoming requests
- **Friends List**: View all your friends with their profiles and learning information

### Real-Time Messaging (Stream Chat Integration)
- One-to-one messaging with friends
- Live chat using Stream Chat's robust infrastructure
- Message history and persistence
- Typing indicators and read receipts

### Video Calling (Stream Video Integration)
- Initiate video calls directly from chat
- Share video call links through messages
- High-quality video and audio
- Easy call management

## 📸 Screenshots

The application features a modern, intuitive interface with:
- Clean authentication pages (signup/login)
- Profile onboarding flow
- Dashboard with friend requests and recommendations
- Dedicated friends list page
- Real-time chat interface
- Video call capabilities

Visit the [live demo](https://streamer-0dmt.onrender.com) to see it in action!

## 🤝 Contributing

*(Guidelines will be added as the project matures)*

## 📝 License

ISC

---

## 🚀 Getting Started Quickly

1. Visit [https://streamer-0dmt.onrender.com](https://streamer-0dmt.onrender.com)
2. Create an account with email and password
3. Complete your profile with languages and preferences
4. Find friends using recommendations or search
5. Send friend requests and connect
6. Start chatting and calling with your friends!

---

**Last Updated**: November 2025  
**Maintained by**: Farrukh806
