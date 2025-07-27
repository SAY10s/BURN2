import { Server, Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import { insertCharacter, getAllCharacters } from "../db/character.repository";
import { generateRandomCharacter } from "../shared/helpers/generateRandomCharacter";
import {
  getCharacterByCharactersId,
  getGameMasterPlayer,
  getPlayerByCharactersId,
  getPlayerByPlayersSocketId,
  isPlayerAdmin,
} from "../shared/helpers/characterGetters";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { AttackData } from "../shared/types/attackData";

export function registerSocketHandlers(io: Server, gameState: GameState) {
  io.on("connection", (socket: Socket) => {
    const updateGameState = () => {
      io.emit("updateGameState", gameState);
    };

    gameState.players.push({
      socketID: socket.id,
      controlledCharacterID: "none",
      isGameMaster: gameState.players.length === 0 ? true : false,
    });

    updateGameState();

    socket.on("chooseCharacter", (characterID) => {
      gameState.players = gameState.players.map((player) =>
        player.socketID === socket.id
          ? { ...player, controlledCharacterID: characterID }
          : player
      );
      updateGameState();
    });

    socket.on("changeGameMaster", (socketID: string) => {
      if (isPlayerAdmin(socket.id, gameState.players))
        gameState.players = gameState.players.map((player) =>
          player.socketID === socketID
            ? { ...player, isGameMaster: true }
            : { ...player, isGameMaster: false }
        );
      updateGameState();
    });

    socket.on("createCharacter", async () => {
      const newChar = generateRandomCharacter();
      await insertCharacter(newChar);
      const characters = await getAllCharacters();
      gameState.characters = characters;
      updateGameState();
    });

    socket.on("attackCharacter", async (targetCharacterID) => {
      const actorPlayer = getPlayerByPlayersSocketId(
        socket.id,
        gameState.players
      );
      const actorCharacter = getCharacterByCharactersId(
        actorPlayer.controlledCharacterID,
        gameState.characters
      );
      const targetPlayer = getPlayerByCharactersId(
        targetCharacterID,
        gameState.players
      );
      const targetCharacter = getCharacterByCharactersId(
        targetCharacterID,
        gameState.characters
      );

      const gameMasterPlayer = getGameMasterPlayer(gameState.players);

      let attackData: AttackData = {
        offensiveStat: actorCharacter.skills.reflexSkills.swordsmanship,
        offensiveSkill: actorCharacter.stats.reflex,
        offensiveRoll: new DiceRoll("1d10!").total,

        defensiveStat: 0,
        defensiveSkill: 0,
        defensiveRoll: new DiceRoll("1d10!").total,

        damageRoll: new DiceRoll("3d6").total,

        isTargetHit: false,
      };

      gameState.debugMessage = `${actorCharacter.name}(${actorPlayer.socketID}) zaatakował ${targetCharacter.name}(${targetPlayer.socketID}).`;
      updateGameState();

      // --- DEFENCE ---
      io.to(targetPlayer.socketID).emit("requestDefence", actorCharacter);

      const targetSocket = io.sockets.sockets.get(targetPlayer.socketID);
      if (!targetSocket) {
        throw new Error(`Target socket (${targetSocket}) not found`);
      }

      targetSocket.once("defend", (typeOfDefence: "DODGE" | "REPOSITION") => {
        switch (typeOfDefence) {
          case "DODGE":
            gameState.debugMessage += ` ${targetCharacter.name} próbuje uniknąć.`;
            attackData.defensiveStat = targetCharacter.stats.reflex;
            attackData.defensiveSkill =
              targetCharacter.skills.reflexSkills.dodgeEscape;
            break;

          case "REPOSITION":
            gameState.debugMessage += ` ${targetCharacter.name} próbuje zejść z linii.`;
            attackData.defensiveStat = targetCharacter.stats.dexterity;
            attackData.defensiveSkill =
              targetCharacter.skills.dexteritySkills.athletics;
            break;

          default:
            gameState.debugMessage = "Error occured while getting defence info";
        }
        updateGameState();
        // --- FIRST ROUND OF CALCULATIONS ---
        if (
          attackData.offensiveRoll +
            attackData.offensiveSkill +
            attackData.offensiveStat >
          attackData.defensiveRoll +
            attackData.defensiveSkill +
            attackData.defensiveStat
        ) {
          attackData.isTargetHit = true;
        } else {
          attackData.isTargetHit = false;
        }
        // --- GM APPROVAL ---
        io.to(gameMasterPlayer.socketID).emit(
          "requestGameMastersApproval",
          attackData
        );

        const gameMasterSocket = io.sockets.sockets.get(
          gameMasterPlayer.socketID
        );
        if (!gameMasterSocket) {
          throw new Error(`Target socket (${gameMasterSocket}) not found`);
        }

        gameMasterSocket.once(
          "executeAttack",
          (finalAttackData: AttackData) => {
            if (finalAttackData.isTargetHit) {
              gameState.characters = gameState.characters.map((character) => {
                if (character.id === targetCharacterID) {
                  return {
                    ...character,
                    currentHP: character.currentHP - finalAttackData.damageRoll,
                  };
                } else return character;
              });
              gameState.debugMessage += ` Trafienie za ${finalAttackData.damageRoll}`;
            } else {
              gameState.debugMessage += ` Atak nie trafia`;
            }
            updateGameState();
          }
        );
      });
    });

    socket.on("disconnect", () => {
      gameState.players = gameState.players.filter(
        (player) => player.socketID !== socket.id
      );
      if (gameState.players[0]) gameState.players[0].isGameMaster = true;
      updateGameState();
    });
  });
}
