"use client";

import { useCallback, Dispatch, SetStateAction, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BoardType, Move } from "@/types/ticTacToeTypes";

const useTicTacToeState = (
  board: BoardType,
  moveHistory: Move[] | [],
  isXPlaying: boolean,
  setBoard: (board: BoardType) => void,
  setMoveHistory: Dispatch<SetStateAction<Move[]>>,
  setIsXPlaying: (isXPlaying: boolean) => void
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const encodeGameState = useCallback(() => {
    const boardQuery = JSON.stringify(board);
    const player = isXPlaying ? "X" : "O";
    const history = JSON.stringify(moveHistory);

    const queryParams = new URLSearchParams({
      board: boardQuery,
      player,
      history,
    });

    router.replace(`?${queryParams.toString()}`);

    localStorage.setItem(
      "ticTacToeState",
      JSON.stringify({
        board: board,
        player: isXPlaying ? "X" : "O",
        history: moveHistory,
      })
    );
  }, [board, isXPlaying, moveHistory, router]);

  // Restore state

  useEffect(() => {
    const boardParam = searchParams.get("board");
    const playerParam = searchParams.get("player");
    const historyParam = searchParams.get("history");

    if (boardParam && playerParam && historyParam) {
      try {
        const parsedBoard = JSON.parse(boardParam) as BoardType;
        const parsedHistory = JSON.parse(historyParam) as Move[];

        setBoard(parsedBoard);
        setIsXPlaying(playerParam === "X");
        setMoveHistory(parsedHistory);
      } catch (error) {
        console.log(error);
        setBoard(Array(9).fill(null));
        setIsXPlaying(true);
        setMoveHistory([]);
      }
    } else {
      const localStorageState = localStorage.getItem("ticTacToeState");
      if (localStorageState) {
        try {
          const { board, player, history } = JSON.parse(localStorageState);
          setBoard(board);
          setIsXPlaying(player === "X");
          setMoveHistory(history);
        } catch (error) {
          console.error(error);
          setBoard(Array(9).fill(null));
          setIsXPlaying(true);
          setMoveHistory([]);
        }
      } else {
        setBoard(Array(9).fill(null));
        setIsXPlaying(true);
        setMoveHistory([]);
      }
    }
  }, [searchParams, setBoard, setIsXPlaying, setMoveHistory]);

  useEffect(() => {
    encodeGameState();
  }, [encodeGameState]);
};

export default useTicTacToeState;
