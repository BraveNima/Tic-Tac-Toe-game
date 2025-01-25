import { WIN_CONDITIONS } from "@/constants/ticTacToeToe";
import { BoardType } from "@/types/ticTacToeTypes";

export const checkWinner = (updatedBoard: BoardType) => {
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [x, y, z] = WIN_CONDITIONS[i];

    if (
      updatedBoard[x] &&
      updatedBoard[x] === updatedBoard[y] &&
      updatedBoard[y] === updatedBoard[z]
    ) {
      return updatedBoard[x];
    }
  }
};
