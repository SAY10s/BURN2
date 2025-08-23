import { resolveDefence } from "./resolveDefence";
import { TypesOfDefence } from "../../shared/types/typesOfDefence";
import { AttackData } from "../../shared/types/attackData";
import { Character } from "../../shared/types/character";
import { MOCK_CHARACTERS } from "../../shared/consts/mockCharacters";
import { MOCK_WEAPON } from "../../shared/consts/mockWeapon";
import { deepCopy } from "../utils/deepCopy";

describe("resolveDefence", () => {
  let mockCharacter: Character;
  let attackData: AttackData;

  beforeEach(() => {
    attackData = {} as AttackData;
    mockCharacter = deepCopy(MOCK_CHARACTERS[1]);
  });

  it("should set defensiveStat to reflex and defensiveSkill to dodgeEscape for DODGE", () => {
    mockCharacter.stats.reflex = 8;
    mockCharacter.skills.reflexSkills.dodgeEscape = 6;
    const result = resolveDefence(
      TypesOfDefence.DODGE,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(8);
    expect(result.defensiveSkill).toBe(6);
  });
  it("should set defensiveStat to dexterity and defensiveSkill to athletics for REPOSITION", () => {
    mockCharacter.stats.dexterity = 5;
    mockCharacter.skills.dexteritySkills.athletics = 4;
    const result = resolveDefence(
      TypesOfDefence.REPOSITION,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(5);
    expect(result.defensiveSkill).toBe(4);
  });
  it("should set defensiveStat to reflex and defensiveSkill to staffSpear for BLOCK for when blocking with staffSpear weapon", () => {
    mockCharacter.stats.reflex = 3;
    mockCharacter.skills.reflexSkills.staffSpear = 6;

    attackData = deepCopy(attackData);
    attackData.targetWeapon = deepCopy(MOCK_WEAPON);
    attackData.targetWeapon.associatedSkill = "staffSpear";
    const result = resolveDefence(
      TypesOfDefence.BLOCK,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(3);
    expect(result.defensiveSkill).toBe(6);
  });
  it("should set defensiveStat to reflex and defensiveSkill to smallBlades for PARRY when parrying with smallBlades weapon", () => {
    mockCharacter.stats.reflex = 7;
    mockCharacter.skills.reflexSkills.smallBlades = 5;
    attackData = deepCopy(attackData);
    attackData.targetWeapon = deepCopy(MOCK_WEAPON);
    attackData.targetWeapon.associatedSkill = "smallBlades";

    const result = resolveDefence(
      TypesOfDefence.PARRY,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(7);
    expect(result.defensiveSkill).toBe(5);
  });
  it("should set defensiveStat to reflex and defensiveSkill to brawling for BODY_BLOCK", () => {
    mockCharacter.stats.reflex = 2;
    mockCharacter.skills.reflexSkills.brawling = 4;
    const result = resolveDefence(
      TypesOfDefence.BODY_BLOCK,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(2);
    expect(result.defensiveSkill).toBe(4);
  });
  it("should set defensiveStat and defensiveSkill for NONE", () => {
    mockCharacter.stats.dexterity = 5;
    const result = resolveDefence(
      TypesOfDefence.NONE,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(mockCharacter.stats.dexterity);
    expect(result.defensiveSkill).toBe(0);
    expect(result.defensiveRoll.total).toBe(0);
  });
  it("should use affected by deep wound status values (if hp<50 divide reflex, will, dexterity and inteligence by 2) ;swordsmanship skill for defensiveStat and reflex for defensiveStat", () => {
    mockCharacter.maxHP = 10;
    mockCharacter.currentHP = 3;
    const result = resolveDefence(
      TypesOfDefence.DODGE,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(3);
    expect(result.defensiveSkill).toBe(3);
  });
  it("should use affected by dying status values (if hp<0; divide all stats by 3) ;swordsmanship skill for defensiveStat and reflex for defensiveStat", () => {
    mockCharacter.maxHP = 10;
    mockCharacter.currentHP = -2;
    const result = resolveDefence(
      TypesOfDefence.DODGE,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(2);
    expect(result.defensiveSkill).toBe(3);
  });
});
