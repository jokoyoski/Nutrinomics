import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from '../typings';
import { UserService } from '../user/services';
import { SignUpDto } from './dtos';
import { AuthService } from './services';

@Injectable()
export class AuthProvider {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<IResponse> {
    if (
      await this.userService.getUser({
        email: signupDto.email,
      })
    ) {
      throw new BadRequestException('Email already exists');
    }

    const pwd = await this.authService.hashPwd(signupDto.password);
    const user = await this.userService.createUser({
      ...signupDto,
      password: pwd,
    });

    return {
      success: true,
      data: {
        accessToken: await this.authService.getToken({
          sub: user.id,
          email: user.email,
        }),
        user,
      },
    };
  }

  async signin(data: { sub: string; email: string ,firstname:string,language:string}): Promise<IResponse> {
    const token = await this.authService.getToken(data);
    return {
      success: true,
      data: {
        accessToken: token,
      },
    };
  }
}
