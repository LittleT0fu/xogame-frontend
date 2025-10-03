import Board from "./components/Board";
import GameControls from "./components/GameControls";
import HistoryControls from "./components/HistoryControls";
import "./App.css";
import { useGame } from "./hooks/useGame";

function App() {
    const {
        gameState,
        loading,
        error,
        history,
        startGame,
        makeMove,
        cancelGame,
        getHistory,
        clearError,
    } = useGame();
    return (
        <>
            <div>
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-2xl font-bold mb-20">
                        <h1>XO Game</h1>
                        <label className=" text-gray-500">Tic-Tac-Toe</label>
                    </div>
                    {gameState && (
                        <Board gameState={gameState} onCellClick={makeMove} />
                    )}
                    <GameControls
                        gameState={gameState}
                        onStartGame={startGame}
                        onCancelGame={cancelGame}
                        loading={loading}
                    />
                    <HistoryControls
                        history={history}
                        onGetHistory={getHistory}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
