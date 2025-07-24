export interface Weapon {
  name: string;
  /**
   * Damage given by the attack written in standard notation
   * @example "2d6+2";
   * @example "1d10";
   * @example "4d4";
   */
  damage: string;
}
