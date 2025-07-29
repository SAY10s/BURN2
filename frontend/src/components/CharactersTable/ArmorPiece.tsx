import type { ArmorPiece as ArmorPieceType } from "../../../../shared/types/character";
import ValueBar from "./ValueBar";

interface ArmorPieceProps {
  armorPiece: ArmorPieceType;
  armorPart: string;
}

export default function ArmorPiece({ armorPiece, armorPart }: ArmorPieceProps) {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium text-gray-800">
        {armorPart}
        {Object.entries(armorPiece.reductions).map(
          ([damageType, reduction]) => {
            if (reduction) {
              return (
                <span key={damageType} className="text-sm text-gray-600 px-4">
                  <span className="text-gray-800">{damageType}:</span>{" "}
                  <span>{reduction}%</span>
                </span>
              );
            }
          }
        )}
      </h3>
      <div className="mt-2 space-y-1">
        <ValueBar
          current={armorPiece.currentSP}
          max={armorPiece.maxSP}
          gamemasterView={true}
          isPlayer={true}
        />
        {/* <p className="text-sm text-gray-600">
          <strong className="text-gray-800">Encumbrance Value:</strong>{" "}
          {armorPiece.encumbranceValue}
        </p> */}
      </div>
    </div>
  );
}
