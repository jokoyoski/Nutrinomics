import {
  Body,
  Controller,
  Post,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthProvider } from './auth.provider';
import { SignUpDto } from './dtos';
import { JoiValidator } from '../utils/joi-validation.pipe';
import { SignUpSchema } from './validator-schemas';
import { LocalAuthGuard } from 'src/guards';
import { UserDocument } from 'src/user/schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authProvider: AuthProvider) {}

  @Post('sign-up')
  @UsePipes(new JoiValidator(SignUpSchema))
  async signup(@Body() signupDto: SignUpDto) {
    const data = await this.authProvider.signup(signupDto);
    return data;
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signin(@Req() req: Request) {
    const user = req.user as UserDocument;
    const data = await this.authProvider.signin({
      sub: user.id,
      firstname:user.firstname,
      email: user.email,
      language:user.language
    });
    return data;
  }
}
