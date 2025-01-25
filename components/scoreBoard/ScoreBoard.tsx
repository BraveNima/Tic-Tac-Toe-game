"use clinet";

import Image from "next/image";
import circle from "@/public/circle.svg";
import x from "@/public/x.svg";

type ScoreBoardProps = {
  xScore: number;
  oScore: number;
  tieScore: number;
};

export default function ScoreBoard({
  xScore,
  oScore,
  tieScore,
}: ScoreBoardProps) {
  return (
    <div className="flex gap-4 py-4 rounded-lg px-4 justify-around items-center mx-auto md:w-[460px] mt-2 p-2 shadow-[2px_2px_6px_rgba(206,204,204,1),-1px_-1px_5px_rgba(206,204,204,1)] mb-8">
      <div className="flex flex-col items-center justify-center">
        <Image src={x} alt="x" className="cursor-pointer h-12" />
        <h3 className="text-sm text-black">Player X&apos;s Wins: {xScore}</h3>
      </div>
      <div className="transition-colors flex flex-col items-center justify-center">
        <Image src={circle} alt="circle" className="cursor-pointer h-12" />
        <h3 className="text-sm text-black">Player O&apos;s Wins: {oScore}</h3>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-[#FCD015] text-3xl">Draw</div>
        <h3 className="text-sm">Ties: {tieScore}</h3>
      </div>
    </div>
  );
}
