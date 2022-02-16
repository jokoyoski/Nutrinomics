import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/typings';
import { UserDocument } from './schema';
import { UserService } from './services';

@Injectable()
export class UserProvider {
  constructor(private readonly userService: UserService) {}

  async getUser(user: UserDocument): Promise<IResponse> {
    return {
      success: true,
      data: {
        user,
      },
    };
  }
}
