"use clinet";

import { useState } from "react";
import { initialBoardState, WIN_CONDITIONS } from "@/constants/ticTacToeToe";
import { BoardType, Move } from "@/types/ticTacToeTypes";
import usePersist from "./usePersist";
import { checkWinner } from "@/utils/gameLogic";

const useTicTacToeLogic = () => {
  const [board, setBoard] = useState<BoardType>(initialBoardState);
  const [moveHistory, setMoveHistory] = useState<Move[] | []>([]);
  const [history, setHistory] = useState([initialBoardState]);
  const [xScore, setXScore] = usePersist<number>("xScore", 0);
  const [oScore, setOScore] = usePersist<number>("oScore", 0);
  const [tieScore, setTieScore] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [isXPlaying, setIsXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [playAgainClicked, setPlayAgainClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Function to reset the game after a win or tie
  const reset = (currentWinner: "O" | "X" | "tie") => {
    setModalMessage(currentWinner);
    setIsXPlaying(isXPlaying);
    setTimeout(() => {
      setShowModal(true);
    }, 1200);
  };

  const handlePlayAgain = () => {
    setShowModal(false);
    setBoard(Array(9).fill(null));
    setHistory([initialBoardState]);
    setGameOver(false);
    setPlayAgainClicked(true);
    setMoveHistory([]);
    setTimeout(() => {
      setPlayAgainClicked(false);
    }, 500);
  };

  // Function to handle the result of the game (win/tie)
  const handleGameResult = (updatedBoard: BoardType) => {
    const winner = checkWinner(updatedBoard);

    const animateWinningCells = (winningCells: number[] | undefined) => {
      const resultArray = Array(updatedBoard.length).fill(null);

      winningCells?.forEach((cell) => {
        resultArray[cell] = updatedBoard[cell];
      });

      setBoard(resultArray);
    };

    if (winner) {
      const winningCells = WIN_CONDITIONS.find(([x, y, z]) => {
        return (
          updatedBoard[x] &&
          updatedBoard[x] === updatedBoard[y] &&
          updatedBoard[y] === updatedBoard[z]
        );
      });
      animateWinningCells(winningCells);
      if (winner === "X") {
        setXScore(xScore + 1);
        setGameOver(true);
        reset("X");
      } else {
        setOScore(oScore + 1);

        setGameOver(true);
        reset("O");
      }
    }
    let allFilled = true;

    updatedBoard.forEach((item) => {
      if (item === null) {
        allFilled = false;
      }
    });

    if (allFilled && winner !== "X" && winner !== "O") {
      setTieScore(tieScore + 1);
      setGameOver(true);
      reset("tie");
    }
  };

  // Function to handle the button click for a player's move
  const handlePlayerMove = (clickedBtnId: number) => {
    const updatedBoard = board.map((value, id) => {
      if (id === clickedBtnId) {
        return isXPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    });

    const player = isXPlaying ? "X" : "O";
    const newHistory = history.slice(0, currentStep + 1);
    setHistory([...newHistory, updatedBoard]);
    setCurrentStep(newHistory.length);
    setMoveHistory([...moveHistory, { player, position: clickedBtnId }]);
    setBoard(updatedBoard);
    setIsXPlaying(!isXPlaying);
    handleGameResult(updatedBoard);

    return updatedBoard;
  };

  // Function to handle selecting a move from history
  const handleSelectMove = (index: number) => {
    const selectedMoves: Move[] = moveHistory.slice(0, index + 1);

    const newBoard: (string | undefined)[] = Array(9).fill(null);
    selectedMoves.forEach((move) => {
      newBoard[move.position] = move.player;
    });
    setBoard(newBoard);
    setIsXPlaying(selectedMoves.length % 2 === 0);
  };

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    setBoard(history[newStep]);
    setIsXPlaying(newStep % 2 === 0);
  };

  const undo = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      updateStep(currentStep - 1);
      setMoveHistory(moveHistory.slice(0, newStep)); // Update move history
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const newStep = currentStep + 1;
      updateStep(newStep);
      const player: "X" | "O" = newStep % 2 === 0 ? "X" : "O";
      const lastMove = history[newStep];
      const position = lastMove.findIndex((cell) => cell !== null);
      const newMove: Move = { player, position };
      setMoveHistory((prevMoves) => [...prevMoves, newMove]);
    }
  };

  // Function to reset scores
  const resetScores = () => {
    setXScore(0);
    setOScore(0);
    setTieScore(0);
  };

  // Function to reset the board and game state
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setMoveHistory([]);
    setHistory([initialBoardState]);
    setGameOver(false);
    setIsXPlaying(true);
    setShowModal(false);
    setPlayAgainClicked(false);
    setModalMessage("");
  };

  // Function to reset everything (board + scores)
  const resetGame = () => {
    resetBoard();
    resetScores();
  };

  return {
    board,
    setBoard,
    resetGame,
    isXPlaying,
    setIsXPlaying,
    xScore,
    oScore,
    tieScore,
    gameOver,
    playAgainClicked,
    showModal,
    modalMessage,
    setMoveHistory,
    handlePlayAgain,
    handleGameResult,
    moveHistory,
    handleSelectMove,
    handlePlayerMove,
    currentStep,
    redo,
    undo,
  };
};

export { useTicTacToeLogic };
