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
import { deepCopy } from "../utils/deepCopy";

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
    GameStateSingleton.getInstance().characters = deepCopy(MOCK_CHARACTERS);
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
      locationRoll: { total: 4 },
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

  /* 
    attack-hits
    location: head;
    base-damage 10;

    //bonus meele damage
    none
    //type of attack
    10 * 2 = 20
    //immunities and vulnerabilities
    none
    //armor points
    none
    //reductions
    none
    //location multiplayer
    20 * 3 = 60
    //critical wound
    none

    summary-damage = 60;
    target-hp = 30 - 60 = -30;
  */
  it("should deal damage to head with 3x multiplayer (heavy strike, no armor)", () => {
    mockAttackData.locationRoll = total(1);
    mockAttackData.typeOfAttack = TypesOfAttack.STRONG_STRIKE;
    mockAttackData.damageRoll = total(10);

    applyAttackResults(mockSocket, mockAttackData);

    const target = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );

    expect(target.currentHP).toBe(-30);
  });

  /* 
    attack-hits
    location: body;
    base-damage 8;

    //bonus meele damage
    8 + 2 = 10;
    //type of attack
    10 * 2 = 20;
    //immunities and vulnerabilities
    none
    //armor points
    none
    //reductions
    none
    //location multiplayer
    20 * 1 = 20;
    //critical wound
    none

    summary-damage = 20;
    target-hp = 30 - 20 = 10;
  */
  it("should deal damage to body with 1x multiplayer (heavy strike, no armor, with meele bonus +2)", () => {
    mockAttackData.locationRoll = total(4);
    mockAttackData.typeOfAttack = TypesOfAttack.STRONG_STRIKE;
    mockAttackData.damageRoll = total(8);
    GameStateSingleton.getInstance().characters[0].stats.body = 8;

    applyAttackResults(mockSocket, mockAttackData);

    const target = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );

    expect(target.currentHP).toBe(10);
  });

  /* 
    attack-hits
    location: left Leg;
    base-damage 12;

    //bonus meele damage
    12 + 4 = 16;
    //type of attack
    16 * 2 = 32;
    //immunities and vulnerabilities
    none
    //armor points
    32 - 5 = 27;
    //reductions
    none
    //location multiplayer
    27 * 0,5 = 13;
    //critical wound
    none

    summary-damage = 13;
    target-hp = 30 - 13 = 17;
  */
  it("should deal damage to leftLeg with 0.5x multiplayer (heavy strike, armor 5/5, with meele bonus +4)", () => {
    mockAttackData.locationRoll = total(9);
    mockAttackData.typeOfAttack = TypesOfAttack.STRONG_STRIKE;
    mockAttackData.damageRoll = total(12);
    GameStateSingleton.getInstance().characters[0].stats.body = 10;
    GameStateSingleton.getInstance().characters[1].characterArmor.leftLeg = {
      maxSP: 5,
      currentSP: 5,
      reductions: [],
      encumbranceValue: 0,
    };

    applyAttackResults(mockSocket, mockAttackData);

    const target = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );

    expect(target.characterArmor.leftLeg.currentSP).toBe(4);
    expect(target.currentHP).toBe(17);
  });

  /* 
    attack-hits
    location: right Arm;
    base-damage 8;

    //bonus meele damage
    8 + 0 = 8
    //type of attack
    8 * 2 = 16
    //armor points
    16 - 8 = 8;
    //reductions
    8 / 2 = 4
    //immunities and vulnerabilities
    none
    //location multiplayer
    4 * 0,5 = 2;
    //critical wound
    none

    summary-damage = 2;
    target-hp = 30 - 2 = 28;
  */
  it("should deal damage to rightArm with 0.5x multiplayer (heavy strike, armor 8/8, reduction slashing)", () => {
    mockAttackData.locationRoll = total(5);
    mockAttackData.damageRoll = total(8);
    GameStateSingleton.getInstance().characters[0].stats.body = 6;
    mockAttackData.typeOfDamage = TypesOfDamage.SLASHING;
    mockAttackData.typeOfAttack = TypesOfAttack.STRONG_STRIKE;

    GameStateSingleton.getInstance().characters[1].characterArmor.rightArm = {
      maxSP: 8,
      currentSP: 8,
      reductions: [TypesOfDamage.SLASHING],
      encumbranceValue: 0,
    };

    applyAttackResults(mockSocket, mockAttackData);

    const target = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );

    expect(target.characterArmor.rightArm.currentSP).toBe(7);
    expect(target.currentHP).toBe(28);
  });

  it("should not deal damage if character is immune to the attack's damage type", () => {
    GameStateSingleton.getInstance().characters[1].immunities = [
      TypesOfDamage.FIRE,
    ];
    mockAttackData.typeOfDamage = TypesOfDamage.FIRE;

    applyAttackResults(mockSocket, mockAttackData);

    const target = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );
    expect(target.currentHP).toBe(30);
  });
});
