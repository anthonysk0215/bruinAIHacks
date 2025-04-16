# TheraVoice - Mental Health Assistant

TheraVoice is a web-based mental health assistant that provides empathetic support through voice interactions. Users can speak their thoughts and receive AI-generated responses in a supportive, conversational manner.

## Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Material-UI (MUI)** - React UI framework for modern, responsive design
- **Vite** - Next Generation Frontend Tooling
- **Web Speech API** - For speech recognition and synthesis

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web framework for Node.js
- **TypeScript** - Typed superset of JavaScript
- **OpenAI API** - For generating empathetic responses
- **CORS** - For handling cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

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
OPENAI_API_KEY=your_openai_api_key_here" > .env

# Replace 'your_openai_api_key_here' with your actual OpenAI API key

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

## Development

### Backend Development
```bash
cd theravoice-backend
npm run dev    # Start development server with hot reload
```

### Frontend Development
```bash
cd theravoice-frontend
npm run dev    # Start development server with hot reload
```

## Production Build

### Backend
```bash
cd theravoice-backend
npm run build  # Compile TypeScript to JavaScript
npm start      # Start production server
```

### Frontend
```bash
cd theravoice-frontend
npm run build  # Create production build
```

## Environment Variables

### Backend (.env)
```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
