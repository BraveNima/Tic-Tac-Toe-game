"use clinet";

import { useState } from "react";
import { initialBoardState, WIN_CONDITIONS } from "@/constants/ticTacToeToe";
import { BoardType, Move, Scores } from "@/types/ticTacToeTypes";
import usePersist from "./usePersist";
import { checkWinner } from "@/utils/gameLogic";

const useTicTacToeLogic = () => {
  const [board, setBoard] = useState<BoardType>(initialBoardState);
  const [moveHistory, setMoveHistory] = useState<Move[] | []>([]);
  const [history, setHistory] = useState([initialBoardState]);
  const [currentStep, setCurrentStep] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [isXPlaying, setIsXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [playAgainClicked, setPlayAgainClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scores, setScores] = usePersist<Scores>("scores", {
    x: 0,
    o: 0,
    tie: 0,
  });

  const reset = (currentWinner: "O" | "X" | "tie") => {
    setModalMessage(currentWinner);
    setIsXPlaying(isXPlaying);
    setTimeout(() => {
      setShowModal(true);
    }, 600);
  };

  const handlePlayAgain = () => {
    setShowModal(false);
    setBoard(Array(9).fill(null));
    setHistory([initialBoardState]);
    setGameOver(false);
    setCurrentStep(0);
    setPlayAgainClicked(true);
    setMoveHistory([]);
    setTimeout(() => {
      setPlayAgainClicked(false);
    }, 500);
  };

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
        setScores((prevScores) => ({ ...prevScores, x: prevScores.x + 1 }));
        setGameOver(true);
        reset("X");
      } else {
        setScores((prevScores) => ({ ...prevScores, o: prevScores.o + 1 }));
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
      setScores((prevScores) => ({ ...prevScores, tie: prevScores.tie + 1 }));
      setGameOver(true);
      reset("tie");
    }
  };

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

  const handleSelectMove = (index: number) => {
    const selectedMoves: Move[] = moveHistory.slice(0, index + 1);

    const newBoard: BoardType = Array(9).fill(null);
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
      setMoveHistory(moveHistory.slice(0, newStep));
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const newStep = currentStep + 1;
      updateStep(newStep);
      const player = isXPlaying ? "X" : "O";
      const lastMove = history[newStep];
      const position = lastMove.findIndex((cell) => cell !== null);
      const newMove: Move = { player, position };
      setMoveHistory((prevMoves) => [...prevMoves, newMove]);
    }
  };

  const resetScores = () => {
    setScores({ x: 0, o: 0, tie: 0 });
  };

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
    scores,
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
