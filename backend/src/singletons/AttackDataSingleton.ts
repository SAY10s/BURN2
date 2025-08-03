import { AttackData } from "../shared/types/attackData";
import { INITIAL_ATTACK_DATA } from "../shared/consts/initialAttackData";

export class AttackDataSingleton {
  private static instance: AttackData;

  private constructor() {}

  public static getInstance(): AttackData {
    if (!AttackDataSingleton.instance) {
      AttackDataSingleton.instance = { ...INITIAL_ATTACK_DATA };
    }
    return AttackDataSingleton.instance;
  }

  public static reset(): void {
    AttackDataSingleton.instance = { ...INITIAL_ATTACK_DATA };
  }
}
