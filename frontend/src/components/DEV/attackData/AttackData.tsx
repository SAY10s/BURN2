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
  defensiveStat: "Defensive Stat",
  defensiveSkill: "Defensive Skill",
  defensiveRoll: "Defensive Roll",
  defensiveModifier: "Defensive Modifier",
  damageRoll: "Damage Roll",
  location: "Location",
  isTargetHit: "Is Target Hit",
};

function renderValue(key: keyof AttackData, value: any) {
  if (key === "weapon" && value) {
    // Show weapon name or id if available
    return value.name || value.id || JSON.stringify(value);
  }
  if (
    key === "typeOfAttack" ||
    key === "typeOfDamage" ||
    key === "typeOfDefence"
  ) {
    return typeof value === "string" ? value : JSON.stringify(value);
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return value;
}

export default function AttackDataTable({ attackData }: AttackDataTableProps) {
  return (
    <table className="w-full max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-3 text-left">Field</th>
          <th className="px-4 py-3 text-left">Value</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {(Object.keys(fieldLabels) as (keyof AttackData)[]).map((key) => (
          <tr key={key} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-700">
              {fieldLabels[key]}
            </td>
            <td className="px-4 py-3 text-sm font-mono text-gray-700 break-all">
              {renderValue(key, attackData[key])}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
