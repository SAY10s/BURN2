import { AttackData } from "../../shared/types/attackData";

export function checkHit(attackData: AttackData): boolean {
  const attackTotal =
    attackData.offensiveRoll +
    attackData.offensiveStat +
    attackData.offensiveSkill;
  const defenceTotal =
    attackData.defensiveRoll +
    attackData.defensiveStat +
    attackData.defensiveSkill;
  return attackTotal > defenceTotal;
}
