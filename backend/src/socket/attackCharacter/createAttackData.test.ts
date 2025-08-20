import { createAttackData } from "./createAttackData";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";
import { TypesOfDamage } from "../../shared/types/typesOfDamage";
import { MOCK_CHARACTERS } from "../../shared/consts/mockCharacters";
import { MOCK_WEAPON } from "../../shared/consts/mockWeapon";

beforeEach(() => {
  GameStateSingleton.reset();
  GameStateSingleton.getInstance().characters = MOCK_CHARACTERS;
});
describe("createAttackData", () => {
  it("should use swordsmanship skill for offensiveSkill and reflex for offensiveStat", () => {
    const attackDataProp = {
      actorCharacterID: "actor",
      targetCharacterID: "target",
      actorWeapon: MOCK_WEAPON,
      typeOfAttack: "REGULAR_STRIKE",
      typeOfDamage: TypesOfDamage.SLASHING,
    } as any;

    const attackData = createAttackData(attackDataProp);

    expect(attackData.offensiveSkill).toBe(
      MOCK_CHARACTERS[0].skills.reflexSkills.swordsmanship
    );
    expect(attackData.offensiveStat).toBe(MOCK_CHARACTERS[0].stats.reflex);
    expect(attackData.actorWeapon.name).toBe("Test Sword");
    expect(attackData.damageRoll.total).toBeGreaterThan(0);
    expect(attackData.damageRoll.total).toBeLessThanOrEqual(10);
  });
  it("should use staffSpear skill for offensiveSkill and reflex for offensiveStat", () => {
    const attackDataProp = {
      actorCharacterID: "actor",
      targetCharacterID: "target",
      actorWeapon: {
        ...MOCK_WEAPON,
        associatedSkill: "staffSpear",
        name: "Test Halabard",
      },
      typeOfAttack: "REGULAR_STRIKE",
      typeOfDamage: TypesOfDamage.SLASHING,
    } as any;

    const attackData = createAttackData(attackDataProp);

    expect(attackData.offensiveSkill).toBe(
      MOCK_CHARACTERS[0].skills.reflexSkills.staffSpear
    );
    expect(attackData.offensiveStat).toBe(MOCK_CHARACTERS[0].stats.reflex);
    expect(attackData.actorWeapon.associatedSkill).toBe("staffSpear");
    expect(attackData.actorWeapon.name).toBe("Test Halabard");
    expect(attackData.damageRoll.total).toBeGreaterThan(0);
    expect(attackData.damageRoll.total).toBeLessThanOrEqual(10);
  });
  it("should apply burning status when there's 100% burning chance", () => {
    const attackDataProp = {
      actorCharacterID: "actor",
      targetCharacterID: "target",
      actorWeapon: {
        ...MOCK_WEAPON,
        statusChances: { BURN: 100, BLEEDING: 0, POISON: 0, CHOKE: 0, STUN: 0 },
      },
      typeOfAttack: "REGULAR_STRIKE",
      typeOfDamage: TypesOfDamage.SLASHING,
    } as any;

    const attackData = createAttackData(attackDataProp);

    expect(attackData.appliedStatuses).toContain("BURN");
  });
});
