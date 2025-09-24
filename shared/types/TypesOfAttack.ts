export enum TypesOfAttack {
  /**
   * (pol. szybki cios), attack two times, otherwise just like regular strike, ALWAYS WITH THE SAME WEAPON, CAN BE USED ON TWO PEOPLE!
   */
  FAST_STRIKE = "FAST_STRIKE",
  /**
   * (pol. zwykły cios), used only by ranged weapons
   */
  REGULAR_STRIKE = "REGULAR_STRIKE",
  /**
   * (pol. podwójny cios), attack two times, otherwise just like regular strike, ALWAYS WITH TWO DIFFERENT WEAPONS, ONLY ONE PERSON!
   */
  DOUBLE_STRIKE = "DOUBLE_STRIKE",
  /**
   * (pol. silne uderzenie), damage 2x
   */
  STRONG_STRIKE = "STRONG_STRIKE",
  /**
   * (pol. rozbrojenie), deals no damage and disarms the target
   */
  DISARM = "DISARM",
  /**
   * (pol. podcięcie), deals no damage and tries to trip the target
   */
  TRIP = "TRIP",
  /**
   * (pol. szarża), damage 2x, -3 mod, quicker initiative.
   */
  CHARGE = "CHARGE",
  /**
   * (pol. płazowanie), deals 50% damage as non-lethal damage
   */
  POMMEL_STRIKE = "POMMEL_STRIKE",
  /**
   * (pol. finta), 2 step attack. First step is a feint, second step is a fast strike.
   * Deceit (pol. oszustwo) + Empathy (pol. empatia) vs Awarness (pol. czujność) + Intelligence (pol. inteligencja), if successful, second ste has +3 mod.
   */
  FEINT = "FEINT",
  /**
   * (pol. zaklęcie)
   */
  SPELL = "SPELL",
}

export const TYPES_OF_ATTACK_TRANSLATION: Record<TypesOfAttack, string> = {
  [TypesOfAttack.FAST_STRIKE]: "Szybki cios",
  [TypesOfAttack.REGULAR_STRIKE]: "Zwykły cios",
  [TypesOfAttack.DOUBLE_STRIKE]: "Podwójny cios",
  [TypesOfAttack.STRONG_STRIKE]: "Silne uderzenie",
  [TypesOfAttack.DISARM]: "Rozbrojenie",
  [TypesOfAttack.TRIP]: "Podcięcie",
  [TypesOfAttack.CHARGE]: "Szarża",
  [TypesOfAttack.POMMEL_STRIKE]: "Płazowanie",
  [TypesOfAttack.FEINT]: "Finta",
  [TypesOfAttack.SPELL]: "Zaklęcie",
};
