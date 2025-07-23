export interface Character {
  socketID: string;
  name: string;
  /**
   * @Formula Math.floor(Body + Will / 2 ) * 5
   * @min 10
   * @max 65
   */
  maxHP: number;
  currentHP: number;
  stats: {
    /**
     * (pol. **Reakcja**)
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
  };
  skills: {
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
  };
}
