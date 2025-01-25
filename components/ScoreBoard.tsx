"use clinet";

import Image from "next/image";
import circle from "@/public/circle.svg";
import x from "@/public/x.svg";
import { Scores } from "@/types/ticTacToeTypes";

type ScoreBoardProps = {
  scores: Scores;
};

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  if (scores)
    return (
      <div className="flex gap-4 py-4 rounded-lg px-4 justify-around items-center mx-auto md:w-[460px] mt-4 p-2 shadow-custom mb-8">
        <div className="flex-center">
          <Image src={x} alt="x" className="cursor-pointer h-12" />
          <h3 className="text-sm text-black">
            Player X&apos;s Wins: {scores.x}
          </h3>
        </div>
        <div className="transition-colors flex-center">
          <Image src={circle} alt="circle" className="cursor-pointer h-12" />
          <h3 className="text-sm text-black">
            Player O&apos;s Wins: {scores.o}
          </h3>
        </div>
        <div className="flex-center gap-4">
          <div className="text-[#FCD015] text-3xl">Draw</div>
          <h3 className="text-sm">Ties: {scores.tie}</h3>
        </div>
      </div>
    );
}
