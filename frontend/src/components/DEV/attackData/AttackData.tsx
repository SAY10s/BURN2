import type { AttackData } from "../../../shared/types/attackData";

const fieldLabels: Record<keyof AttackData, string> = {
  attackStage: "Attack Stage",
  actorCharacterID: "Actor Character ID",
  targetCharacterID: "Target Character ID",
  targetWeapon: "Target Weapon",
  actorWeapon: "Actor Weapon",
  offensiveStat: "Offensive Stat",
  offensiveSkill: "Offensive Skill",
  offensiveRoll: "Offensive Roll",
  offensiveModifier: "Offensive Modifier",
  typeOfDamage: "Type of Damage",
  typeOfAttack: "Type of Attack",
  typeOfDefence: "Type of Defence",
  appliedStatuses: "Applied Statuses",
  defensiveStat: "Defensive Stat",
  defensiveSkill: "Defensive Skill",
  defensiveRoll: "Defensive Roll",
  defensiveModifier: "Defensive Modifier",
  damageRoll: "Damage Roll",
  locationRoll: "Location Roll",
  isTargetHit: "Is Target Hit",
};
import { TypesOfStatus } from "../../../shared/types/typesOfStatus";
import type { DiceRoll } from "@dice-roller/rpg-dice-roller";
import type { Weapon } from "../../../shared/types/weapon";
import type { TypesOfAttack } from "../../../shared/types/TypesOfAttack";
import type { TypesOfDamage } from "../../../shared/types/typesOfDamage";
import type { TypesOfDefence } from "../../../shared/types/typesOfDefence";
import { useGameStore } from "../../../hooks/useGameStore";

function renderValue(
  key: keyof AttackData,
  value:
    | string
    | number
    | boolean
    | DiceRoll
    | Weapon
    | TypesOfAttack
    | TypesOfDamage
    | TypesOfDefence
    | TypesOfStatus[]
    | undefined,
) {
  if ((key === "targetWeapon" || key === "actorWeapon") && value) {
    // Show weapon name or id if available
    return (
      (value as Weapon).name || (value as Weapon).id || JSON.stringify(value)
    );
  }
  if (
    key === "typeOfAttack" ||
    key === "typeOfDamage" ||
    key === "typeOfDefence"
  ) {
    return typeof value === "string" ? value : JSON.stringify(value);
  }
  if (key === "appliedStatuses" && Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "None";
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (value && typeof value === "object" && "notation" in value) {
    // Handle DiceRoll objects
    return (value as DiceRoll).output;
  }
  return value as string | number | undefined;
}

export default function AttackDataTable() {
  const attackData = useGameStore((state) => state.attackData);
  return (
    <details className="">
      <summary className="cursor-pointer px-4 py-3 text-center text-2xl uppercase">
        Attack Data
      </summary>
      <div className="border-border w-full border-4 border-double">
        <div className="border-border grid grid-cols-2 border-b-4 border-double px-4 py-3 pl-6">
          <div className="text-left font-bold">Field</div>
          <div className="text-center font-bold">Value</div>
        </div>
        {(Object.keys(fieldLabels) as (keyof AttackData)[]).map((key) => (
          <div
            key={key}
            className={`${key.toLowerCase().includes("defensive") || key.toLowerCase().includes("target") || key.toLowerCase().includes("defence") ? "from-witcher-green" : "from-witcher-orange"} to-transparent-special m-2 grid grid-cols-2 bg-gradient-to-r to-50% px-4 py-3`}
          >
            <div>{fieldLabels[key]}</div>
            <div className="text-center font-mono break-all">
              {renderValue(key, attackData[key])}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
