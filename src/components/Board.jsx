import React from "react";
import Cell from "./Cell";

function Board({ gameState, onCellClick, disabled }) {
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
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
