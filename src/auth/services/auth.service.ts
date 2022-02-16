import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, genSalt, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Env, JWT_EXPIRES_IN } from '../../constants';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  async hashPwd(pwd: string) {
    const salt = await genSalt();
    return hash(pwd, salt);
  }

  async getToken(data) {
    return new Promise<string>((resolve) => {
      const token = sign(data, this.configService.get(Env.JSON_TOKEN_SECRET), {
        expiresIn: JWT_EXPIRES_IN,
      });
      resolve(token);
    });
  }

  comparePassword(pwd, hashPwd) {
    return compare(pwd, hashPwd);
  }
}
