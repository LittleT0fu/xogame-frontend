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
        async (boardSize, vsAI, firstPlayer) => {
            setLoading(true);
            clearError();
            try {
                console.log(boardSize, vsAI, firstPlayer);
                const res = await gameApi.startGame({
                    boardSize: boardSize,
                    vsAI: vsAI,
                    firstPlayer: firstPlayer,
                });
                console.log(res);
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
        async (col, row) => {
            console.log(col, row);
            if (!gameState.gameID) {
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
            // if (gameState.board[col][row] !== "") {
            //     handleError(new Error("Cell already occupied"));
            //     return null;
            // }

            setLoading(true);
            clearError();
            console.log("before fetch");
            try {
                const res = await gameApi.makeMove({
                    gameID: gameState.gameID,
                    row: row,
                    col: col,
                    player: gameState.currentPlayer,
                });
                setGameState(res);
                console.log(res);
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

    const cancelGame = useCallback(async () => {
        setLoading(true);
        clearError();
        try {
            const res = await gameApi.cancelGame(gameState?.gameID);
            setGameState(null);
            return res;
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [gameState, clearError, handleError]);

    const getHistory = useCallback(async () => {
        setLoading(true);
        clearError();
        try {
            const res = await gameApi.getHistory();
            setHistory(Array.isArray(res) ? res : []);
            return res;
        } catch (error) {
            handleError(error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [clearError, handleError]);

    return {
        // State
        gameState,
        loading,
        error,
        history,

        // Actions
        startGame,
        makeMove,
        cancelGame,
        getHistory,
        clearError,
    };
};
export default useGame;
