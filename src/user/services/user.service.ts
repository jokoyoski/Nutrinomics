import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  createUser(data) {
    return this.userModel.create(data);
  }

  getUser(filterQuery: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filterQuery);
  }
}
