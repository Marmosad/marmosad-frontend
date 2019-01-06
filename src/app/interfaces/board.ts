export interface Board {
  boardName: string;
  numberOfPlayers: number;
  socketUrl: string;
  playerLimitReached: boolean;
  playerLimit: number;
}
