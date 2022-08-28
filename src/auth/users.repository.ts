import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import AuthCredentialsDto from './dto/auth-credentials.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private dataSource: Repository<User>,
  ) {}

  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = this.dataSource.create({ username, password });

    try {
      await this.dataSource.save(user);
    } catch (error) {
      // dup username
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
