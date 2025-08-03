export enum TypesOfAttack {
  /**
   * (pol. szybki cios), attack two times, otherwise just like regular strike, ALWAYS WITH THE SAME WEAPON, CAN BE USED ON TWO PEOPLE!
   */
  FAST_STRIKE = "FAST_STRIKE",
  /**
   * (pol. zwykły cios)
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
   * (pol. finta), 2 step attack. First step is a feint, second step is a regular strike.
   * Deceit (pol. oszustwo) + Empathy (pol. empatia) vs Awarness (pol. czujność) + Intelligence (pol. inteligencja), if successful, second ste has +3 mod.
   */
  FEINT = "FEINT",
  /**
   * (pol. zaklęcie)
   */
  SPELL = "SPELL",
}
