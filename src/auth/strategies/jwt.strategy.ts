import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Env } from 'src/constants';
import { UserService } from 'src/user/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env[Env.JSON_TOKEN_SECRET],
    });
  }

  async validate(payload) {
    const { sub } = payload;
    const user = await this.userService.getUser({ _id: sub });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
