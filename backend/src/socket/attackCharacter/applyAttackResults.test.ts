import { applyAttackResults } from "./applyAttackResults";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";
import { AttackData } from "../../shared/types/attackData";
import { Socket } from "socket.io";
import { TypesOfDamage } from "../../shared/types/typesOfDamage";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";

const mockSocket = { id: "test-socket" } as unknown as Socket;

describe("applyAttackResults", () => {
  beforeEach(() => {
    GameStateSingleton.reset();
    GameStateSingleton.getInstance().characters = [
      {
        id: "actor",
        name: "Test",
        isPlayer: true,
        isAlive: true,
        deathRollAdditionalDC: 0,
        maxHP: 20,
        currentHP: 20,
        maxStamina: 20,
        currentStamina: 20,
        maxStunScore: 40,
        currentStunScore: 40,
        stats: {
          speed: 5,
          craft: 5,
          luck: 5,
          empathy: 5,
          intelligence: 5,
          reflex: 5,
          dexterity: 5,
          body: 5,
          will: 5,
        },
        skills: {
          reflexSkills: {
            brawling: 1,
            smallBlades: 1,
            staffSpear: 1,
            swordsmanship: 1,
            dodgeEscape: 1,
            melee: 1,
          },
          dexteritySkills: {
            athletics: 1,
            archery: 1,
            crossbow: 1,
          },
          willSkills: {
            spellCasting: 1,
          },
        },
        status: [],
        characterArmor: {
          head: { reductions: [], maxSP: 0, currentSP: 0, encumbranceValue: 0 },
          torso: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
          rightArm: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
          leftArm: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
          rightLeg: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
          leftLeg: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
        },
        weapons: [],
        susceptibilities: [],
        immunities: [],
      },
      {
        id: "target",
        name: "Test",
        isPlayer: true,
        isAlive: true,
        deathRollAdditionalDC: 0,
        maxHP: 20,
        currentHP: 20,
        maxStamina: 20,
        currentStamina: 20,
        maxStunScore: 40,
        currentStunScore: 40,
        stats: {
          speed: 5,
          craft: 5,
          luck: 5,
          empathy: 5,
          intelligence: 5,
          reflex: 5,
          dexterity: 5,
          body: 5,
          will: 5,
        },
        skills: {
          reflexSkills: {
            brawling: 1,
            smallBlades: 1,
            staffSpear: 1,
            swordsmanship: 1,
            dodgeEscape: 1,
            melee: 1,
          },
          dexteritySkills: {
            athletics: 1,
            archery: 1,
            crossbow: 1,
          },
          willSkills: {
            spellCasting: 1,
          },
        },
        status: [],
        characterArmor: {
          head: { reductions: [], maxSP: 0, currentSP: 0, encumbranceValue: 0 },
          torso: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
          rightArm: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
          leftArm: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
          rightLeg: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
          leftLeg: {
            reductions: [],
            maxSP: 0,
            currentSP: 0,
            encumbranceValue: 0,
          },
        },
        weapons: [],
        susceptibilities: [],
        immunities: [],
      },
    ];
    GameStateSingleton.getInstance().players = [
      {
        socketID: "test-socket",
        controlledCharacterID: "actor",
        isGameMaster: true,
      },
    ];
  });

  it("should not deal damage if character is immune to the attack's damage type", () => {
    GameStateSingleton.getInstance().characters[0].immunities = [
      TypesOfDamage.FIRE,
    ];

    const actorCharacter = getCharacterByCharactersId(
      "actor",
      GameStateSingleton.getInstance().characters
    );

    const targetCharacter = getCharacterByCharactersId(
      "target",
      GameStateSingleton.getInstance().characters
    );

    const attackData = {
      actorCharacterID: "actor",
      targetCharacterID: "target",

      weapon: {
        improvedArmorPiercing: false,
        armorShreding: false,
        armorPiercing: false,
        damage: "1d10",
        id: "w1",
        name: "Test Sword",
        weaponAccuracy: 0,
        typesOfDamage: [TypesOfDamage.FIRE],
        statusChances: { BURN: 0, BLEEDING: 0, POISON: 0, CHOKE: 0, STUN: 0 },
        associatedSkill: "swordsmanship",
      },

      offensiveStat: 50,
      offensiveSkill: 50,
      offensiveRoll: { total: 50 },
      offensiveModifier: 50,

      typeOfDamage: TypesOfDamage.FIRE,
      typeOfAttack: "REGULAR_STRIKE",
      typeOfDefence: undefined,
      appliedStatuses: [],

      defensiveStat: 0,
      defensiveSkill: 0,
      defensiveRoll: { total: 0 },
      defensiveModifier: 0,

      damageRoll: { total: 25 },
      locationRoll: { total: 2 },
      isTargetHit: true,
    } as unknown as AttackData;

    applyAttackResults(mockSocket, attackData);

    const target = getCharacterByCharactersId(
      attackData.targetCharacterID,
      GameStateSingleton.getInstance().characters
    );
    expect(target.currentHP).toBe(20);
  });
});
