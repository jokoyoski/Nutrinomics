import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards';
import { UserDocument } from './schema';
import { UserProvider } from './user.provider';

@Controller('user')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: Request) {
    const data = this.userProvider.getUser(req.user as UserDocument);
    return data;
  }
}
