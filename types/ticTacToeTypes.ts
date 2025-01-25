export type Move = {
  player: "X" | "O";
  position: number;
};

export type BoardType = (string | null)[];

export type Scores = {
  x: number;
  o: number;
  tie: number;
};
