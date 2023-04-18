import { User} from '../entities';
import { IGenericAbstract } from './IGenericRepository.abstract';

export abstract class IDataServices {
  abstract users: IGenericAbstract<User>;
}