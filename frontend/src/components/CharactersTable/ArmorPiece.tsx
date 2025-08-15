import type { ArmorPiece as ArmorPieceType } from "../../../../shared/types/character";
import ValueBar from "./ValueBar";
import { TYPES_OF_DAMAGE_TRANSLATION } from "../../shared/types/typesOfDamage";

import armLeft from "../../assets/armor/arm-left.svg";
import armRight from "../../assets/armor/arm-right.svg";
import head from "../../assets/armor/head.svg";
import legLeft from "../../assets/armor/leg-left.svg";
import legRight from "../../assets/armor/leg-right.svg";
import torso from "../../assets/armor/torso.svg";

interface ArmorPieceProps {
  armorPiece: ArmorPieceType;
  armorPart: string;
}

const armorIcons: Record<string, string> = {
  head,
  leftArm: armLeft,
  rightArm: armRight,
  torso,
  leftLeg: legLeft,
  rightLeg: legRight,
};

export default function ArmorPiece({ armorPiece, armorPart }: ArmorPieceProps) {
  return (
    <div className="border-border flex flex-col items-center border-4 border-double p-3">
      <div
        className={`mb-2 flex flex-col items-center ${armorPiece.maxSP ? "" : "opacity-30"}`}
      >
        <div className="group relative">
          <img
            src={armorIcons[armorPart] || ""}
            alt={armorPart}
            className="mb-1 h-10 w-10"
          />

          <div className="bg-smoke border-border text-secondary pointer-events-none absolute top-full left-1/2 z-10 mt-2 flex w-max -translate-x-1/2 flex-col gap-1 border p-2 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            <span className="font-medium">Redukcje obrażeń:</span>
            {armorPiece.reductions.length > 0 ? (
              armorPiece.reductions.map((damageType) => (
                <span
                  key={damageType}
                  title={`Redukcja obrażeń typu ${TYPES_OF_DAMAGE_TRANSLATION[damageType] || damageType} o 50%`}
                >
                  {TYPES_OF_DAMAGE_TRANSLATION[damageType] || damageType}
                </span>
              ))
            ) : (
              <span>Brak</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className={`w-14 ${armorPiece.maxSP ? "" : "opacity-0"}`}>
          <ValueBar
            current={armorPiece.currentSP}
            max={armorPiece.maxSP}
            gamemasterView={true}
            isPlayer={true}
          />
        </div>
      </div>
    </div>
  );
}
