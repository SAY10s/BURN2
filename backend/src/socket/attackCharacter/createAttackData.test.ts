import { createAttackData } from "./createAttackData";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";
import { TypesOfDamage } from "../../shared/types/typesOfDamage";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { MOCK_CHARACTERS } from "../../shared/consts/mockCharacters";

beforeEach(() => {
  GameStateSingleton.reset();
  GameStateSingleton.getInstance().characters = MOCK_CHARACTERS;
});
describe("createAttackData", () => {
  it("should use swordsmanship skill for offensiveSkill and reflex for offensiveStat", () => {
    const attackDataProp = {
      actorCharacterID: "actor",
      targetCharacterID: "target",
      weapon: {
        improvedArmorPiercing: false,
        armorShreding: false,
        armorPiercing: false,
        damage: "1d10",
        id: "w1",
        name: "Test Sword",
        weaponAccuracy: 3,
        typesOfDamage: [TypesOfDamage.FIRE],
        statusChances: { BURN: 100, BLEEDING: 0, POISON: 0, CHOKE: 0, STUN: 0 },
        associatedSkill: "swordsmanship",
      },
      typeOfAttack: "REGULAR_STRIKE",
      typeOfDamage: TypesOfDamage.FIRE,
    } as any;

    const attackData = createAttackData(attackDataProp);

    expect(attackData.offensiveSkill).toBe(
      MOCK_CHARACTERS[0].skills.reflexSkills.swordsmanship
    );
    expect(attackData.offensiveStat).toBe(MOCK_CHARACTERS[0].stats.reflex);
    expect(attackData.weapon.name).toBe("Test Sword");
    expect(attackData.damageRoll.total).toBeGreaterThan(0);
    expect(attackData.damageRoll.total).toBeLessThanOrEqual(10);
  });
  it("should use staffSpear skill for offensiveSkill and reflex for offensiveStat", () => {
    const attackDataProp = {
      actorCharacterID: "actor",
      targetCharacterID: "target",
      weapon: {
        improvedArmorPiercing: false,
        armorShreding: false,
        armorPiercing: false,
        damage: "1d10",
        id: "w3",
        name: "Test Halabard",
        weaponAccuracy: 5,
        typesOfDamage: [TypesOfDamage.FIRE],
        statusChances: { BURN: 100, BLEEDING: 0, POISON: 0, CHOKE: 0, STUN: 0 },
        associatedSkill: "staffSpear",
      },
      typeOfAttack: "REGULAR_STRIKE",
      typeOfDamage: TypesOfDamage.FIRE,
    } as any;

    const attackData = createAttackData(attackDataProp);

    expect(attackData.offensiveSkill).toBe(
      MOCK_CHARACTERS[0].skills.reflexSkills.staffSpear
    );
    expect(attackData.offensiveStat).toBe(MOCK_CHARACTERS[0].stats.reflex);
    expect(attackData.weapon.associatedSkill).toBe("staffSpear");
    expect(attackData.weapon.name).toBe("Test Halabard");
    expect(attackData.damageRoll.total).toBeGreaterThan(0);
    expect(attackData.damageRoll.total).toBeLessThanOrEqual(10);
  });
});
