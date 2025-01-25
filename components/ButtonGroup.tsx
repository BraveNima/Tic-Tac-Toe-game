import Link from "next/link";

type ButtonGroupProps = {
  onReset: VoidFunction;
  onUndo: VoidFunction;
  onRedu: VoidFunction;
  currentStep: number;
};

export default function ButtonGroup({
  onReset,
  onRedu,
  onUndo,
  currentStep,
}: ButtonGroupProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3">
      <button
        onClick={onUndo}
        disabled={currentStep === 0}
        className="btn-primary"
      >
        Undo
      </button>
      <button className="btn-primary" onClick={onRedu}>
        Redo
      </button>
      <Link href={"/"} className="btn-primary">
        Home
      </Link>
      <button onClick={onReset} className="btn-primary">
        Reset
      </button>
    </div>
  );
}
