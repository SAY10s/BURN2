import { applyAttackResults } from "./applyAttackResults";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";
import { AttackData } from "../../shared/types/attackData";
import { Socket } from "socket.io";
import { TypesOfDamage } from "../../shared/types/typesOfDamage";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";
import { MOCK_CHARACTERS } from "../../shared/consts/mockCharacters";
import { MOCK_WEAPON } from "../../shared/consts/mockWeapon";
import { MOCK_ATTACK_DATA } from "../../shared/consts/mockAttackData";
import { TypesOfAttack } from "../../shared/types/TypesOfAttack";
import { TypesOfDefence } from "../../shared/types/typesOfDefence";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";

const mockSocket = { id: "actor-socket" } as unknown as Socket;
let mockAttackData = MOCK_ATTACK_DATA;

const total = (totalValue: number) => {
  return { total: totalValue } as unknown as DiceRoll;
};

describe("applyAttackResults", () => {
  beforeEach(() => {
    GameStateSingleton.reset();
    /**
     * By default every character has 30 HP, has no armor, no immunities etc., 6 in every Stat, 3 in every Skill
     * MOCK_CHARACTERS[0] is an actor
     * MOCK_CHARACTERS[1] is a target
     */
    GameStateSingleton.getInstance().characters = MOCK_CHARACTERS;
    GameStateSingleton.getInstance().players = [
      {
        socketID: "actor-socket",
        controlledCharacterID: "actor",
        isGameMaster: true,
      },
      {
        socketID: "target-socket",
        controlledCharacterID: "target",
        isGameMaster: false,
      },
    ];
    mockAttackData = {
      actorCharacterID: "actor",
      targetCharacterID: "target",

      targetWeapon: MOCK_WEAPON,
      actorWeapon: MOCK_WEAPON,

      offensiveStat: 6,
      offensiveSkill: 3,
      offensiveRoll: { total: 5 },
      offensiveModifier: 0,

      typeOfDamage: TypesOfDamage.SLASHING,
      typeOfDefence: TypesOfDefence.DODGE,
      typeOfAttack: TypesOfAttack.FAST_STRIKE,
      appliedStatuses: [],

      defensiveStat: 6,
      defensiveSkill: 3,
      defensiveRoll: { total: 5 },
      defensiveModifier: 0,

      damageRoll: { total: 5 },
      locationRoll: { total: 5 },
      isTargetHit: true,
    } as unknown as AttackData;
  });
  it("should not deal damage if attack missed", () => {
    mockAttackData.isTargetHit = false;
    applyAttackResults(mockSocket, mockAttackData);

    const target = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );
    expect(target.currentHP).toBe(30);
  });

  it("should not deal damage if character is immune to the attack's damage type", () => {
    GameStateSingleton.getInstance().characters[0].immunities = [
      TypesOfDamage.FIRE,
    ];

    applyAttackResults(mockSocket, mockAttackData);

    const target = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );
    expect(target.currentHP).toBe(30);
  });

  it("should deal damage if character is not immune to the attack's damage type", () => {
    applyAttackResults(mockSocket, mockAttackData);

    const target = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );
    expect(target.currentHP).toBe(15);
  });
});
