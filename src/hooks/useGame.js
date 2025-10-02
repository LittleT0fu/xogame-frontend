import { useState, useEffect } from "react";
import gameApi from "../api/gameApi";
import { useCallback } from "react";

export const useGame = () => {
    const [gameState, setGameState] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    const handleError = useCallback((error) => {
        const errorMessage = error.message || "An error occurred";
        setError(errorMessage);
        console.error("Game Error : ", error);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const startGame = useCallback(
        async (boardSize, vsAi, firstPlayer) => {
            setLoading(true);
            try {
                const res = await gameApi.startGame({
                    boardSize,
                    vsAi,
                    firstPlayer,
                });
                setGameState(res);
                return res;
            } catch (error) {
                handleError(error);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [clearError, handleError]
    );

    const makeMove = useCallback(
        async (gameID, col, row, player) => {
            if (!gameID || !col || !row || !player) {
                setError("Invalid move");
                return null;
            }
            if (!gameState) {
                handleError("No game started");
                return null;
            }
            if (gameState.status !== "IN_PROGRESS") {
                handleError(new Error("Game is not in progress"));
                return null;
            }
            if (gameState.board[col][row] !== null) {
                handleError(new Error("Cell already occupied"));
                return null;
            }

            setLoading(true);
            try {
                const res = await gameApi.makeMove({
                    gameID,
                    col,
                    row,
                    player,
                });
                return res;
            } catch (error) {
                handleError(error);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [gameState, clearError, handleError]
    );

    const cancelGame = useCallback(
        async (gameID) => {
            setLoading(true);
            try {
                const res = await gameApi.cancelGame(gameID);
                return res;
            } catch (error) {
                handleError(error);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [gameState, clearError, handleError]
    );
};
