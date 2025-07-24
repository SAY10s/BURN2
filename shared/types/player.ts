export interface Player {
  /**
   * Id of a client, managed by socket.io
   * @example "ojIckSD2jqNzOqIrAGzL"
   */
  socketID: string;
  isGameMaster: boolean;
  /**
   * String of 7 characters that are a uniqe id of a Character
   * @example "4f7d2e9"
   */
  controlledCharacterID: string;
}
