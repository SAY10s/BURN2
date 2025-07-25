export interface Stats {
  /**
   * (pol. **Tempo**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  speed: number;
  /**
   * (pol. **Fach**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  craft: number;
  /**
   * (pol. **Fart**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  luck: number;
  /**
   * (pol. **Emocje**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  empathy: number;
  /**
   * (pol. **Rozum**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  intelligence: number;
  /**
   * (pol. **Rozum**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  reflex: number;
  /**
   * (pol. **Gracja**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  dexterity: number;
  /**
   * (pol. **ciało**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  body: number;
  /**
   * (pol. **Wola**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  will: number;
}

export interface Skills {
  reflexSkills: {
    /**
     * (pol. **Broń krótka**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    smallBlades: number;
    /**
     * (pol. **Broń drzewcowa**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    staffSpear: number;
    /**
     * (pol. **Broń bitewna**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    swordsmanship: number;
    /**
     * (pol. **Zwinność**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    dodgeEscape: number;
  };
  dexteritySkills: {
    /**
     * (pol. **Atletyka**) + **Dexterity** (pol.  **Gracja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    athletics: number;
  };
}

export interface Character {
  /**
   * States if given Character is playable by player. If it is, then it's value is `true`, if not, then it's NPC controlled by GameMaster, and therefore it's value is `false`.
   * @default false
   */
  isPlayer: boolean;
  /**
   * Random string of 7 characters that allows to identify Character
   * @formula Math.random().toString(36).substring(2, 9);
   * @example "4f7d2e9"
   */
  id: string;
  name: string;
  /**
   * @Formula Math.floor(Body + Will / 2 ) * 5
   * @min 10
   * @max 65
   */
  maxHP: number;
  currentHP: number;
  stats: Stats;
  skills: Skills;
}
