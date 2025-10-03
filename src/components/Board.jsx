import React from "react";
import Cell from "./Cell";

function Board({ gameState, onCellClick }) {
    const isWinningCell = (rowIndex, cellIndex) => {
        if (gameState.status !== "X_WIN" && gameState.status !== "O_WIN") {
            return false;
        }
        return gameState.winningLine?.some(
            ([row, col]) => row === rowIndex && col === cellIndex
        );
    };
    return (
        <div>
            {gameState.board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-row">
                    {row.map((cell, cellIndex) => (
                        <Cell
                            key={cellIndex}
                            value={cell}
                            onClick={() => onCellClick(cellIndex, rowIndex)}
                            finish={gameState.status !== "IN_PROGRESS"}
                            winning={isWinningCell(rowIndex, cellIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
