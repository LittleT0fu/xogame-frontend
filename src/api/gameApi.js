// src/api/gameApi.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

class GameApiService {
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(
                    error.message ||
                        `HTTP ${response.status}: ${response.statusText}`
                );
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // Health check endpoint
    async healthCheck() {
        return this.request("/game");
    }

    // Start a new game
    async startGame(body) {
        return this.request("/game/start", {
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    // Make a move in the game
    async makeMove(body) {
        return this.request("/game/makemove", {
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    // Cancel the current game
    async cancelGame(gameID) {
        return this.request("/game/cancle/" + gameID, {
            method: "POST",
        });
    }

    // Get game history
    async getHistory() {
        return this.request("/game/history");
    }
}

export const gameApi = new GameApiService();
export default gameApi;
