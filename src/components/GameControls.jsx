import React from "react";
import { useState } from "react";

function GameControls({
    gameState,
    onStartGame,
    onCancelGame,
    onGetHistory,
    onClearError,
}) {
    const [boardSize, setBoardSize] = useState(3);
    const [vsAi, setVsAi] = useState(false);
    const [firstPlayer, setFirstPlayer] = useState("X");
    console.log(gameState);
    return (
        <div className="flex flex-col items-center gap-5 p-5 dark:bg-[#2d2d2d] bg-gray-200 dark:text-white rounded-lg light:bg-gray-200 light:text-black">
            {!gameState && (
                <div className="flex flex-row gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <label>Board Size : </label>
                        <input
                            type="number"
                            className="outline-none focus:outline-none text-center  bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 rounded-lg py-2 w-min"
                            value={boardSize}
                            min={3}
                            onChange={(e) => setBoardSize(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <label>VS AI : </label>
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            value={vsAi}
                            onChange={(e) => setVsAi(e.target.checked)}
                        />
                    </div>
                </div>
            )}
            {gameState && (
                <div className="flex flex-row gap-2">
                    <label>Current Player : </label>
                    <div className="flex flex-row items-center gap-2">
                        <label>{gameState.currentPlayer}</label>
                    </div>
                </div>
            )}
            <hr className="dark:bg-gray-500 bg-gray-800 w-full" />
            <div>
                <button
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={() => onStartGame(boardSize, vsAi, firstPlayer)}
                >
                    Start Game
                </button>
                {gameState && (
                    <button
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        onClick={onCancelGame}
                    >
                        Cancel Game
                    </button>
                )}
            </div>
        </div>
    );
}

export default GameControls;
