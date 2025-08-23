import { AttackData } from "../../../shared/types/attackData";

export function checkHit(attackData: AttackData): boolean {
  const attackTotal =
    attackData.offensiveRoll.total +
    attackData.offensiveStat +
    attackData.offensiveSkill +
    attackData.offensiveModifier;
  const defenceTotal =
    attackData.defensiveRoll.total +
    attackData.defensiveStat +
    attackData.defensiveSkill +
    attackData.defensiveModifier;
  return attackTotal > defenceTotal;
}
