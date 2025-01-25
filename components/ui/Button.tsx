import React, { useEffect, useState } from "react";
interface ButtonProps {
  id: string | undefined;
  value: string | undefined;
  onClick: (id: string | number) => void;
  playing: boolean;
  playAgainClicked: boolean;
  gameOver: boolean;
  isRestricted: boolean;
  choosePlayerIcon: string;
}

export default function Button({
  id,
  value,
  onClick,
  playing,
  playAgainClicked,
  gameOver,
  isRestricted,
  choosePlayerIcon,
}: ButtonProps) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
  }, [playAgainClicked]);

  const handleClick = () => {
    if (!isRestricted) {
      setClicked(true);
      onClick(null);
    } else {
    }
  };

  return (
    <button
      className={`border-0 w-full h-full leading-none bg-[#c9f9fc] text-[5rem] hover:cursor-pointer  text-[#fcd015] ${
        !clicked && !value && !gameOver
          ? playing && choosePlayerIcon === "cross"
            ? "xHover"
            : "oHover"
          : ""
      } ${value === null ? "" : "animate-font"}`}
      id={id}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
