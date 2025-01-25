interface ModalProps {
  message: string;
  onPlayAgain: VoidFunction;
}

export default function Modal({ message, onPlayAgain }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80  flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-2.5 max-w-[19rem] w-full animate-[popUp_0.3s_ease-out]">
        <div className="text-center border-2 p-2.5">
          {message === "tie" ? (
            <h6 className="text-4xl">Draw!</h6>
          ) : (
            <h6 className="text-4xl">Winner!</h6>
          )}
          <div>
            <button className="border-3 rounded bg-white text-Saffron p-0.75 px-4.5 text-[3.2rem] mt-2 mb-5 mx-2">
              {message}
            </button>
          </div>

          <button
            className="btn-secondary bg-black text-white"
            onClick={onPlayAgain}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}
