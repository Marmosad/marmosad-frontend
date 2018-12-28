import {WhiteCard} from './white-card';

export interface Player {
  playerName: string;
  playerId: string;
  hand: WhiteCard[];
  isJudge: boolean;
  score: number;
}

export interface Score {
  playerName: string;
  score: number;
  isJudge: boolean;
}
