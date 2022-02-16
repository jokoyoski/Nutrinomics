import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/services';
import { AuthService } from '../services';
import { SignInSchema } from '../validator-schemas';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const { error } = SignInSchema.validate({ email, password });
    if (error) {
      throw new BadRequestException(error.message);
    }
    const user = await this.userService.getUser({
      email,
    });
    if (!user) {
      throw new NotFoundException('Email not registered');
    }

    const isSame = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (!isSame) {
      throw new BadRequestException('Incorrect password or email');
    }

    return omit(user, ['password']);
  }
}
