import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AuthCredentialsDto from './dto/auth-credentials.dto';

import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private dataSource: Repository<User>,
  ) {}

  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = this.dataSource.create({ username, password });

    await this.dataSource.save(user);
  }
}
