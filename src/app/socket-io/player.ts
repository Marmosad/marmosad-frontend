import { WhiteCard } from './white-card';

export interface Player {
    playerName: string;
    playerId: string;
    hand: WhiteCard[];
    isJudge: boolean;
    score: number;
}
