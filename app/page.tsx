import Image from "next/image";
import Link from "next/link";
import tikTakToeIcon from "@/public/tic-tac-toe.svg";

export default function Home() {
  return (
    <div className="h-screen overflow-x-hidden bg-contain md:bg-cover bg-game-cover">
      <div className="flex h-full md:h-auto items-center justify-center pt-28 gap-10">
        <Link href={"/tic-tac-toe"} type="button" className="btn-secondary">
          <Image
            alt="tik tak toe logo"
            src={tikTakToeIcon}
            width={25}
            height={25}
            className="rounded-full bg-cover"
          />
          Tap to Play
        </Link>
      </div>
    </div>
  );
}
