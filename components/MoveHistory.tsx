import { Move } from "@/types/ticTacToeTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
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
          <FontAwesomeIcon size="sm" icon={faArrowDown} className="md:hidden" />
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {history.map((move, index) => (
            <li
              className="border-[5px] cursor-pointer text-sm border-black rounded-md px-4 py-1 bg-[#FBB500]"
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
