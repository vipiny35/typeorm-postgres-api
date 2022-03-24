import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source';
import { User } from '../entity/User.entity';

export class UserRepository {
  private userRepo: Repository<User> = AppDataSource.getRepository(User);

  async createUser(user: User) {
    return this.userRepo.manager.insert(User, user);
  }

  async findUser(id: number) {
    return await this.userRepo.manager.findOneBy(User, { id });
  }

}
