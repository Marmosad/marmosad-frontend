import {User} from './user';
import {Action} from './action.enum';

export interface Message {
  from?: User;
  content?: any;
  action?: Action;
}
