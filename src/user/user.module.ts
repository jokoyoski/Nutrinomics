import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema';
import { UserService } from './services';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserProvider, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
