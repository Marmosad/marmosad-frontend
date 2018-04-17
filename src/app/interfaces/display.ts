import { Player } from './player';
import { WhiteCard } from './white-card';
import { BlackCard } from './black-card';


export interface Display {
  blackCard?: BlackCard;
  submissions?: WhiteCard[];
  currentJudge?: string;
  players?: Player[];
}
