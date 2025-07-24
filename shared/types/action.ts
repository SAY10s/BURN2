import { Weapon } from "./weapon";

export interface Action {
  /**
   * Action diagram can be found in readme.md
   */
  type:
    | "ATTACK"
    | "DEFENCE_REQUEST"
    | "GAME_MASTERS_VERIFICATION"
    | "EXECUTE_ACTION";
  /**
   * Actor is given as it's socket id rather than whole Character type, because we want to keep gamestate on server side
   * @example "ojIckSD2jqNzOqIrAGzL"
   */
  actorSocketID: string;
  /**
   * Target is given as it's socket id rather than whole Character type, because we want to keep gamestate on server side
   * @example "ojIckSD2jqNzOqIrAGzL"
   */
  targetSocketID: string;
  actionName: string;
  /**
   * Damage given by the attack written in standard notation
   * @example "2d6+2";
   * @example "1d10";
   * @example "4d4";
   */
  weapon: Weapon;
}
