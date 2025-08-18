import { applyAttackResults } from "./applyAttackResults";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";
import { AttackData } from "../../shared/types/attackData";
import { Socket } from "socket.io";
import { TypesOfDamage } from "../../shared/types/typesOfDamage";

const mockSocket = { id: "test-socket" } as unknown as Socket;

describe("applyAttackResults", () => {
  beforeEach(() => {
    GameStateSingleton.reset();
    GameStateSingleton.getInstance().characters = [
      {
        id: "char1",
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
        controlledCharacterID: "char1",
        isGameMaster: true,
      },
    ];
  });

  it("should not deal ANY damage if type of damage is fire and character is immune to fire", () => {
    GameStateSingleton.getInstance().characters[0].immunities = [
      TypesOfDamage.FIRE,
    ];

    const attackData = {
      isTargetHit: true,
      targetCharacterID: "char1",
      damageRoll: { total: 25 },
      typeOfAttack: "REGULAR_STRIKE",
      locationRoll: { total: 2 },
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
      typeOfDamage: TypesOfDamage.FIRE,
      offensiveRoll: { total: 50 },
      offensiveSkill: 50,
      offensiveStat: 50,
      offensiveModifier: 50,
      defensiveRoll: { total: 0 },
      defensiveSkill: 0,
      defensiveStat: 0,
      defensiveModifier: 0,
      appliedStatuses: [],
    } as unknown as AttackData;

    applyAttackResults(mockSocket, attackData);

    const updatedChar = GameStateSingleton.getInstance().characters[0];
    expect(updatedChar.currentHP).toBe(20);
  });
});
