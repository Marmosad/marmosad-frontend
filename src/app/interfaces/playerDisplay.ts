import {Score} from './player';
import {WhiteCard} from './white-card';
import {BlackCard} from './black-card';


export interface PlayerDisplay {
  blackCard: BlackCard; // This should be a black card object
  submissions: Array<WhiteCard>;
  currentJudge: string; // The player ID of the person who is the judge
  playerHand: Array<WhiteCard>;
  score: Array<Score>;
}
