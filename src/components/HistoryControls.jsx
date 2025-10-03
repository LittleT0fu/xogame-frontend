import React from "react";
import { useState } from "react";
import { FormatDate } from "../utils/FormatDate";
import { STATUS_MAP } from "../utils/Constant";
import Board from "./Board";

function HistoryControls({ history, onGetHistory }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => {
                    setIsPopupOpen(true);
                    if (history.length === 0) {
                        onGetHistory();
                    }
                }}
                className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
                History
            </button>
            {isPopupOpen && (
                <HistoryPopup
                    history={history}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </>
    );
}

export default HistoryControls;

function HistoryPopup({ history, onClose }) {
    const [selectedGame, setSelectedGame] = useState(null);
    return (
        <div className="absolute top-0 left-0 w-full h-full dark:bg-black bg-white bg-opacity-50 flex flex-col items-center justify-center gap-5">
            <h1>History</h1>
            <button
                onClick={onClose}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
                Close
            </button>
            <div className="max-h-96 overflow-y-auto w-fit border-[1px] dark:border-gray-500 border-gray-300 rounded-lg flex flex-col">
                {history.map((game, index) => (
                    <div
                        key={index}
                        className="dark:text-gray-300 text-gray-800 px-10 py-3 flex justify-between gap-16 border-b-[1px] dark:border-gray-500 border-gray-300 cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200"
                        onClick={() => setSelectedGame(game)}
                    >
                        <div className="flex flex-col gap-2 items-start">
                            <label
                                className={`text-lg font-medium ${
                                    game.status === "X_WIN"
                                        ? "text-green-500"
                                        : game.status === "O_WIN"
                                        ? "text-red-500"
                                        : game.status === "DRAW"
                                        ? "text-blue-500"
                                        : "text-gray-500"
                                }`}
                            >
                                {STATUS_MAP[game.status]}
                            </label>
                            <label className="text-sm text-gray-500">
                                {game.vsAI ? "VS AI" : "VS Player"}
                            </label>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <div>
                                {" "}
                                <label>board size : </label>
                                <label>{game.boardSize}</label>
                            </div>
                            <label>{FormatDate(game.createdAt)}</label>
                        </div>
                    </div>
                ))}
            </div>
            {selectedGame && (
                <DetailGamePopup
                    game={selectedGame}
                    onClose={() => setSelectedGame(null)}
                />
            )}
        </div>
    );
}

function DetailGamePopup({ game, onClose }) {
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-2xl flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <label className="text-2xl font-bold">Detail Game</label>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-600 hover:ring-1 ring-red-600"
                    >
                        Close
                    </button>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-5">
                    <Board gameState={game} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2 items-start">
                        <label
                            className={`text-lg font-medium ${
                                game.status === "X_WIN"
                                    ? "text-green-500"
                                    : game.status === "O_WIN"
                                    ? "text-red-500"
                                    : game.status === "DRAW"
                                    ? "text-blue-500"
                                    : "text-gray-500"
                            }`}
                        >
                            {STATUS_MAP[game.status]}
                        </label>
                        <label className="text-sm text-gray-500">
                            {game.vsAI ? "VS AI" : "VS Player"}
                        </label>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        <div>
                            {" "}
                            <label>board size : </label>
                            <label>{game.boardSize}</label>
                        </div>
                        <label>{FormatDate(game.createdAt)}</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
