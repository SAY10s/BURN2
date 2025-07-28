type DefenceModalProps = {
  message: string;
  onDefend: (type: "DODGE" | "REPOSITION") => void;
};

export default function DefenceModal({ message, onDefend }: DefenceModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
          En garde!
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onDefend("DODGE")}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors font-medium"
          >
            Dodge
          </button>
          <button
            onClick={() => onDefend("REPOSITION")}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors font-medium"
          >
            Reposition
          </button>
        </div>
      </div>
    </div>
  );
}
