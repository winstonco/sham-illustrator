// https://socket.io/docs/v4/typescript/

import { Socket } from 'socket.io-client';

import IGlobalGameEvents from './GlobalGameEvents.js';
import { GameRole } from './GameRole.js';

type ResponseType = boolean;

interface ServerToClientEvents extends IGlobalGameEvents {
  readyCheck: (
    callback: (err: Error | null, res: { response: 'ok' }) => void
  ) => void;
  playersInLobby: (playerNames: string[]) => void;
  role: (role: GameRole) => void;
  prompt: (prompt: string) => void;
  startTurnAll: (currentPlayerName: string) => void;
  startTurn: (turnTime: number) => void;
  endTurn: () => void;
  startGame: () => void;
  guessImposter: (
    guessTime: number,
    callback: (err: Error | null, res: { guess: string }) => void
  ) => void;
  votingFinished: (majorityVote: { name: string; count: number }) => void;
  endGame: (imposterWasFound: boolean) => void;
}

interface ClientToServerEvents extends IGlobalGameEvents {
  namePlayer: (
    lobbyName: string,
    name: string,
    callback: (response: ResponseType) => void
  ) => void;
  createLobby: (
    lobbyName: string,
    callback: (response: ResponseType) => void,
    lobbySize?: number
  ) => void;
  joinLobby: (
    lobbyName: string,
    callback: (response: ResponseType) => void
  ) => void;
  leaveLobby: (callback: (response: ResponseType) => void) => void;
  startGame: (
    lobbyName: string,
    callback: (response: ResponseType) => void
  ) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  lobbyName: string;
  lobbyIndex: number;
  canDraw: boolean;
  name: string;
}

export type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
};

export interface GameSocket
  extends Socket<ServerToClientEvents, ClientToServerEvents> {}
