import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import AuthCredentialsDto from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(dto);
  }

  async login({ username, password }: AuthCredentialsDto): Promise<string> {
    const user = await this.usersRepository.findUser(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    }

    throw new UnauthorizedException('Please check your login credentials');
  }
}
