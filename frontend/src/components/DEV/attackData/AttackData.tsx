import type { AttackData } from "../../../shared/types/attackData";

interface AttackDataTableProps {
  attackData: AttackData;
}

const fieldLabels: Record<keyof AttackData, string> = {
  actorCharacterID: "Actor Character ID",
  targetCharacterID: "Target Character ID",
  weapon: "Weapon",
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
  if (key === "weapon" && value) {
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

export default function AttackDataTable({ attackData }: AttackDataTableProps) {
  return (
    <details className="mx-auto mt-6 w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-md">
      <summary className="cursor-pointer rounded-t-lg bg-gray-800 px-4 py-3 text-white select-none">
        Attack Data
      </summary>
      <table className="w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Field</th>
            <th className="px-4 py-3 text-left">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {(Object.keys(fieldLabels) as (keyof AttackData)[]).map((key) => (
            <tr key={key} className="transition-colors hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-700">
                {fieldLabels[key]}
              </td>
              <td className="px-4 py-3 font-mono text-sm break-all text-gray-700">
                {renderValue(key, attackData[key])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
