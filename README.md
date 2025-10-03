# XO Game Frontend (Tic-Tac-Toe)

Interactive Tic-Tac-Toe game built with React and Vite. This frontend application connects to a backend API to manage game state, moves, and history.

## Prerequisites

Before running this project, make sure you have the following installed on your device:

-   **Node.js** (version 16 or higher recommended)
    -   Download from [nodejs.org](https://nodejs.org/)
    -   Verify installation: `node --version`
-   **npm** (comes with Node.js)
    -   Verify installation: `npm --version`

## 🚀 Getting Started

Follow these steps to run the project on a new device:

### 0. Run Backend Project First

⚠️ **Important**: This frontend requires a backend API server to be running. Make sure your backend server is up and running before using the application.

Default backend URL: `http://localhost:8080`

The frontend expects the following API endpoints:

-   `GET /game` - Health check
-   `POST /game/start` - Start a new game
-   `POST /game/makemove` - Make a move
-   `POST /game/cancle/:gameID` - Cancel a game
-   `GET /game/history` - Get game history

### 1. Clone the Repository

```bash
git clone <repository-url>
cd xogame-frontend
```

### 2. Install Dependencies

```bash
npm clean install
```

This will install all required packages including:

-   React 19
-   Vite 7
-   Tailwind CSS 4
-   Lucide React (for icons)
-   Hot Toast
-   And other dev dependencies

### 3. Configure Environment Variables (Optional)

If your backend API is running on a different URL than the default `http://localhost:8080`, create a `.env` file in the root directory:

```bash
VITE_API_URL=http://your-backend-url:port
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is busy). Open this URL in your browser to play the game.

## 🛠️ Technologies Used

-   **React 19** - UI library
-   **Vite 7** - Build tool and dev server
-   **Tailwind CSS 4** - Utility-first CSS framework
-   **Lucide React** - Icon library
-   **ESLint** - Code linting

## 🎮 How to Play

1. Start the frontend and ensure the backend is running
2. Click "Start Game" to begin a new game
3. Choose your difficulty level or game mode (based on backend implementation)
4. Click on cells to make your move
5. View game history to see past games

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the console output for the actual URL.

### CORS Blocked API Fetch

If you encounter CORS (Cross-Origin Resource Sharing) errors when fetching from the API:

1. Check that the backend server is running and accessible
2. Verify the API URL matches the backend server address (default: http://localhost:8080)
3. Ensure the backend has CORS properly configured to allow requests from the frontend origin
4. If using custom domains/ports, update the CORS configuration on the backend accordingly
