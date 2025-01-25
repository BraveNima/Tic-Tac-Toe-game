"use client";

import useTicTacToeState from "@/hooks/useGameState";
import { useTicTacToeLogic } from "@/hooks/useTicTacToeLogic";
import ButtonGroup from "../ButtonGroup";
import MoveHistory from "../MoveHistory";
import Board from "../board/Board";
import Modal from "../modal/Modal";
import ScoreBoard from "../scoreBoard/ScoreBoard";

export default function OfflineMode() {
  const {
    board,
    isXPlaying,
    xScore,
    oScore,
    tieScore,
    gameOver,
    playAgainClicked,
    showModal,
    modalMessage,
    moveHistory,
    setBoard,
    setIsXPlaying,
    resetGame,
    handlePlayAgain,
    handleSelectMove,
    handlePlayerMove,
    setMoveHistory,
    redo,
    undo,
    currentStep,
  } = useTicTacToeLogic();

  useTicTacToeState(
    board,
    moveHistory,
    isXPlaying,
    setBoard,
    setMoveHistory,
    setIsXPlaying
  );

  return (
    <div className="w-full">
      <div className="flex flex-col-reverse md:flex-row items-start">
        <div className="flex flex-col md:pl-20 items-center gap-3 mt-10 mx-auto md:mt-20 px-10 md:px-0">
          <ButtonGroup
            onReset={resetGame}
            onUndo={undo}
            onRedu={redo}
            currentStep={currentStep}
          />
          <MoveHistory history={moveHistory} onSelectMove={handleSelectMove} />
        </div>
        <div className="flex flex-col md:w-[70%] ">
          <ScoreBoard xScore={xScore} oScore={oScore} tieScore={tieScore} />
          <Board
            board={board}
            onClick={gameOver ? () => {} : handlePlayerMove}
            playing={isXPlaying}
            playAgainClicked={playAgainClicked}
            gameOver={gameOver}
            isRestricted={false}
            choosePlayerIcon={"cross"}
          />
        </div>
        {showModal && (
          <Modal message={modalMessage} onPlayAgain={handlePlayAgain} />
        )}
      </div>
    </div>
  );
}
