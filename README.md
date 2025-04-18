# TheraVoice - Mental Health Assistant

TheraVoice is a web-based mental health assistant that provides empathetic support through voice interactions. Users can speak their thoughts and receive AI-generated responses in a supportive, conversational manner!

## Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Material-UI (MUI)** - React UI framework for modern, responsive design
- **Vite** - Next Generation Frontend Tooling
- **TailwindCSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service for authentication and database

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with Python
- **Python 3.12+** - Programming language
- **ElevenLabs API** - Voice AI platform integration
- **Supabase** - Authentication and database management
- **JWT** - JSON Web Tokens for secure authentication

### AI Integration
- **ElevenLabs Conversational AI** - Complete toolkit for voice-based AI interactions
  - Speech-to-Text (Transcription)
  - Large Language Model Integration
  - Text-to-Speech with natural voices
  - Advanced turn-taking and interruption handling
  - Real-time, low-latency responses

## Features

- Real-time voice conversations with AI
- Natural and empathetic responses
- Modern, responsive dark theme UI
- Seamless voice interaction handling
- Low-latency audio processing
- Support for natural conversation flow
- Secure user authentication
- User profile management
- Session persistence
- Appointment scheduling system
  - Schedule therapy sessions
  - View upcoming appointments

## Prerequisites

- Node.js (v14 or higher)
- Python 3.12 or higher
- npm (v6 or higher)
- ElevenLabs API key
- Supabase account and credentials
- Modern web browser (Chrome/Edge recommended)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd theravoice
```

### 2. Backend Setup
```bash
cd theravoice-backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOL
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
PORT=8000
EOL

# Start the FastAPI server
python main.py
```

The backend server will run on `http://localhost:8000`

### 3. Frontend Setup
```bash
cd theravoice-frontend

# Install dependencies
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers date-fns @supabase/supabase-js

# Create .env file
cat > .env << EOL
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
EOL

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Authentication System

TheraVoice uses Supabase for secure user authentication:

- **User Registration**: Create a new account with email and password
- **Login/Logout**: Secure session management
- **Password Reset**: Email-based password recovery
- **Session Persistence**: Automatic token refresh
- **Protected Routes**: Secure access to authenticated features

## Features

- Real-time speech recognition
- AI-powered empathetic responses
- Modern, responsive UI
- Voice-to-text and text-to-voice capabilities
- Secure API communication
- User authentication and authorization
- Profile management
- Session handling
- Scheduling system for upcoming calls

## How It Works

TheraVoice leverages ElevenLabs' Conversational AI platform and Supabase for authentication to provide:

1. **User Authentication**: Secure login and registration
2. **Speech Recognition**: Real-time transcription of user speech
3. **Natural Language Processing**: Understanding and processing user input
4. **Empathetic Response Generation**: Creating contextually appropriate responses
5. **Voice Synthesis**: Converting responses to natural-sounding speech
6. **Turn Management**: Handling natural conversation flow with proper timing
7. **Session Management**: Maintaining secure user sessions
8. **Appointment Handling**: Managing therapy session scheduling and notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request