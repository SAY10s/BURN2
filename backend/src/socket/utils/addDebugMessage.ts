import { GameStateSingleton } from "../../singletons/GameStateSingleton";

export function addDebugMessage(message: string) {
  GameStateSingleton.getInstance().debugMessage += " " + message;
}
export function resetDebugMessages() {
  GameStateSingleton.getInstance().debugMessage = "";
}
