import { BoardType } from "@/types/ticTacToeTypes";
import Button from "../ui/Button";

interface GameBoardProps {
  board: BoardType;
  onClick: (index: number) => void;
  playing: boolean;
  playAgainClicked: boolean;
  gameOver: boolean;
  isRestricted: boolean;
  choosePlayerIcon: string;
}

export default function Board({
  board,
  onClick,
  playing,
  playAgainClicked,
  gameOver,
  isRestricted,
  choosePlayerIcon,
}: GameBoardProps) {
  return (
    <div className="border-black border-[20px] p-8 md:p-[50px] md:w-[470px] mx-auto rounded-3xl">
      <div className="board">
        {board.map((item, id) => (
          <div className="w-full h-full border-8 border-black" key={id}>
            <Button
              value={item}
              onClick={() => item === null && onClick(id)}
              playing={playing}
              playAgainClicked={playAgainClicked}
              gameOver={gameOver}
              isRestricted={isRestricted}
              choosePlayerIcon={choosePlayerIcon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
