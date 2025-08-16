type SpecialGameMastersActionsModalProps = {
  onClose: () => void;
};

export default function SpecialGameMastersActionsModal({
  onClose,
}: SpecialGameMastersActionsModalProps) {
  return (
    <div className="bg-opacity-40 k fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="border-border bg-smoke w-full max-w-xl rounded-lg border-4 border-double p-8 shadow-lg">
        <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
          Specjalne Akcje Mistrza Gry
        </h2>
        {/* Content goes here */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border-witcher-yellow k bg-witcher-yellow text-secondary hover:bg-witcher-orange cursor-pointer border-4 border-double px-8 py-2 font-bold transition-colors"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
