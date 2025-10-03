import Board from "./components/Board";
import GameControls from "./components/GameControls";
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
                <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold mb-20">
                        Tic Tac Toe Game
                    </div>
                    {gameState && (
                        <Board gameState={gameState} onCellClick={makeMove} />
                    )}
                    <GameControls
                        gameState={gameState}
                        onStartGame={startGame}
                        onCancelGame={cancelGame}
                        onGetHistory={getHistory}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
