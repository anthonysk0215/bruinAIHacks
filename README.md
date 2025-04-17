# TheraVoice - Mental Health Assistant

TheraVoice is a web-based mental health assistant that provides empathetic support through voice interactions. Users can speak their thoughts and receive AI-generated responses in a supportive, conversational manner using ElevenLabs' advanced Conversational AI technology.

## Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Material-UI (MUI)** - React UI framework for modern, responsive design
- **Vite** - Next Generation Frontend Tooling
- **TailwindCSS** - Utility-first CSS framework

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

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- ElevenLabs API key
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

# Install dependencies
npm install

# Create .env file
echo "PORT=3001
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here" > .env

# Start the development server
npm run dev
```

The backend server will run on `http://localhost:3001`

### 3. Frontend Setup
```bash
cd theravoice-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
theravoice/
├── theravoice-frontend/     # React frontend application
│   ├── src/
│   │   ├── App.tsx         # Main application component
│   │   └── ...             # Other frontend files
│   └── package.json
│
└── theravoice-backend/      # Node.js backend server
    ├── src/
    │   └── server.ts       # Express server implementation
    ├── .env                # Environment variables
    └── package.json
```

## Features

- Real-time speech recognition
- AI-powered empathetic responses
- Modern, responsive UI
- Voice-to-text and text-to-voice capabilities
- Secure API communication


## How It Works

TheraVoice leverages ElevenLabs' Conversational AI platform to provide:

1. **Speech Recognition**: Real-time transcription of user speech
2. **Natural Language Processing**: Understanding and processing user input
3. **Empathetic Response Generation**: Creating contextually appropriate responses
4. **Voice Synthesis**: Converting responses to natural-sounding speech
5. **Turn Management**: Handling natural conversation flow with proper timing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
