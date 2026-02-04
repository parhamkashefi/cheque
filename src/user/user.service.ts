import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';
import { UserRo } from './dto/user.ro';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(CreateUserDto: CreateUserDto): Promise<UserRo> {
    const user = new this.userModel(CreateUserDto);
    const savedUser = await user.save();
    return plainToInstance(UserRo, savedUser.toObject(), {
      excludeExtraneousValues: true,
    });
  }

  async getAllUser(): Promise<UserRo[]> {
    const user = await this.userModel.find();
    return user.map((d) => plainToInstance(UserRo, d));
  }

  async getUserById(id: string): Promise<UserRo> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user id');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return plainToInstance(UserRo, user, {
      excludeExtraneousValues: true,
    });
  }

  async deleteUserById(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user id');
    }
    await this.userModel.findByIdAndDelete(id);
  }
}
