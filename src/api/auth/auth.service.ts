import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ModelClass, transaction } from 'objection';
import { User } from 'src/models';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('User') private modelClass: ModelClass<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: AuthDTO) {
    const user = await this.modelClass
      .query()
      .findOne({ email: payload.email });

    if (!user) throw new ForbiddenException('invalid credentials');

    const match = await argon.verify(user.password, payload.password);

    if (!match) throw new ForbiddenException('invalid credentials');

    return this.createToken(user);
  }

  async register(payload: any) {
    payload.password = await argon.hash(payload.password);
    const user: User = payload;

    return this.modelClass.query().insert(user).returning('*');
  }

  async createToken(payload: User): Promise<{ access_token: string }> {
    const sig = {
      sub: payload.username,
      email: payload.email,
      role: payload.role,
    };

    const token = await this.jwtService.signAsync(sig);

    return {
      access_token: token,
    };
  }
}
