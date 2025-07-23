export interface Character {
  socketID: string;
  name: string;
  //TODO: write actual formula for calculating max hp
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
