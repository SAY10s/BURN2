import { connectToDB } from "./mongo";
import { Character } from "../shared/types/character";

export async function getAllCharacters(): Promise<Character[]> {
  const db = await connectToDB();
  return db.collection<Character>("characters").find().toArray();
}

export async function insertCharacter(character: Character): Promise<void> {
  const db = await connectToDB();
  await db.collection<Character>("characters").insertOne(character);
}
