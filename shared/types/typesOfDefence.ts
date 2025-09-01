export enum TypesOfDefence {
  DODGE = "dodge",
  REPOSITION = "reposition",
  BLOCK = "block",
  BODY_BLOCK = "body_block",
  PARRY = "parry",
  NONE = "none",
}

export const TYPES_OF_DEFENCE_TRANSLATION: Record<TypesOfDefence, string> = {
  [TypesOfDefence.DODGE]: "Unik",
  [TypesOfDefence.REPOSITION]: "Zmiana pozycji",
  [TypesOfDefence.BLOCK]: "Blok",
  [TypesOfDefence.BODY_BLOCK]: "Blok ciałem",
  [TypesOfDefence.PARRY]: "Parada",
  [TypesOfDefence.NONE]: "Brak obrony",
};
