import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    const user = this.dataSource.create({ username, password: hashed });

    try {
      await this.dataSource.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUser(username: AuthCredentialsDto['username']): Promise<User> {
    return this.dataSource.findOne({ where: { username } });
  }
}
