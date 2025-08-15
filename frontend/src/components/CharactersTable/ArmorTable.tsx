import type { Character } from "../../../../shared/types/character";
import ArmorPiece from "./ArmorPiece";

interface ArmorTableProps {
  characterArmor: Character["characterArmor"];
  className?: string;
  isPlayer: boolean;
  gameMasterView: boolean;
}

export default function ArmorTable({
  characterArmor,
  className = "",
  isPlayer,
  gameMasterView,
}: ArmorTableProps) {
  if (!gameMasterView && !isPlayer) {
    return null;
  }

  return (
    <div
      className={`border-border m-2 flex flex-col items-center border-4 border-double p-4 ${className}`}
    >
      <div className="mb-1 flex justify-center">
        <ArmorPiece armorPiece={characterArmor.head} armorPart={"head"} />
      </div>
      <div className="mb-1 flex flex-row items-start justify-center gap-1">
        <ArmorPiece armorPiece={characterArmor.leftArm} armorPart={"leftArm"} />
        <ArmorPiece armorPiece={characterArmor.torso} armorPart={"torso"} />
        <ArmorPiece
          armorPiece={characterArmor.rightArm}
          armorPart={"rightArm"}
        />
      </div>
      <div className="mb-1 flex flex-row justify-center gap-1">
        <ArmorPiece armorPiece={characterArmor.leftLeg} armorPart={"leftLeg"} />
        <ArmorPiece
          armorPiece={characterArmor.rightLeg}
          armorPart={"rightLeg"}
        />
      </div>
    </div>
  );
}
