import { Move } from "@/types/ticTacToeTypes";

type MoveHistoryProps = {
  history: Move[];
  onSelectMove: (index: number) => void;
};

const MoveHistory = ({ history, onSelectMove }: MoveHistoryProps) => {
  if (history?.length > 0)
    return (
      <div>
        <div className="text-center flex items-center justify-center gap-2 md:text-2xl md-6 md:mt-10 mb-6">
          Move History
          <span className="md:hidden size-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g id="Circle_Down-2" data-name="Circle Down">
                <circle cx="12" cy="12" r="10" style={{ fill: "#ece4b7" }} />
                <path
                  d="M14.293,13.293,13,14.586V7a1,1,0,0,0-2,0v7.586L9.707,13.293a1,1,0,0,0-1.414,1.414l3,3a1,1,0,0,0,1.414,0l3-3a1,1,0,0,0-1.414-1.414Z"
                  style={{ fill: "#ff8e31" }}
                />
              </g>
            </svg>
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {history.map((move, index) => (
            <li
              className="border-[5px] cursor-pointer text-sm border-black rounded-md px-4 py-1 bg-Saffron"
              key={index}
              onClick={() => onSelectMove(index)}
            >
              Player {move.player}: Row {Math.floor(move.position / 3) + 1},
              Column {(move.position % 3) + 1}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default MoveHistory;
