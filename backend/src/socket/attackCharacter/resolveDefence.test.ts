import { resolveDefence } from "./resolveDefence";
import { TypesOfDefence } from "../../shared/types/typesOfDefence";
import { AttackData } from "../../shared/types/attackData";
import { Character } from "../../shared/types/character";
import { MOCK_CHARACTERS } from "../../shared/consts/mockCharacters";
import { MOCK_WEAPON } from "../../shared/consts/mockWeapon";

describe("resolveDefence", () => {
  const mockCharacter: Character = MOCK_CHARACTERS[1];

  it("should set defensiveStat and defensiveSkill for DODGE", () => {
    const attackData: AttackData = {} as AttackData;
    const result = resolveDefence(
      TypesOfDefence.DODGE,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(6);
    expect(result.defensiveSkill).toBe(3);
  });
  it("should set defensiveStat and defensiveSkill for REPOSITION", () => {
    const attackData: AttackData = {} as AttackData;
    const result = resolveDefence(
      TypesOfDefence.REPOSITION,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(mockCharacter.stats.dexterity);
    expect(result.defensiveSkill).toBe(
      mockCharacter.skills.dexteritySkills.athletics
    );
  });
  it("should set defensiveStat and defensiveSkill for BLOCK", () => {
    const attackData: AttackData = {
      targetWeapon: MOCK_WEAPON,
    } as AttackData;
    const result = resolveDefence(
      TypesOfDefence.BLOCK,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(mockCharacter.stats.reflex);
    expect(result.defensiveSkill).toBe(
      mockCharacter.skills.reflexSkills.swordsmanship
    );
  });
  it("should set defensiveStat and defensiveSkill for PARRY", () => {
    const attackData: AttackData = {
      targetWeapon: MOCK_WEAPON,
    } as AttackData;
    const result = resolveDefence(
      TypesOfDefence.BLOCK,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(mockCharacter.stats.reflex);
    expect(result.defensiveSkill).toBe(
      mockCharacter.skills.reflexSkills.swordsmanship
    );
  });
  it("should set defensiveStat and defensiveSkill for BODY_BLOCK", () => {
    const attackData: AttackData = {} as AttackData;
    const result = resolveDefence(
      TypesOfDefence.BODY_BLOCK,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(mockCharacter.stats.reflex);
    expect(result.defensiveSkill).toBe(
      mockCharacter.skills.reflexSkills.brawling
    );
  });
  it("should set defensiveStat and defensiveSkill for NONE", () => {
    const attackData: AttackData = {} as AttackData;
    const result = resolveDefence(
      TypesOfDefence.NONE,
      mockCharacter,
      attackData
    );
    expect(result.defensiveStat).toBe(mockCharacter.stats.dexterity);
    expect(result.defensiveSkill).toBe(0);
    expect(result.defensiveRoll.total).toBe(0);
  });
});
