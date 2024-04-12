import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => this.toDto(user));
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // 检查是否已经被注册
    const existingUser = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (existingUser) {
      throw new HttpException(
        'User already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 创建用户
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    return this.toDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return this.toDto(user);
  }

  async findOneByParams(params: Partial<CreateUserDto>): Promise<User> {
    return this.userModel.findOne(params);
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not exists');
    }
    return this.toDto(user);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    return this.toDto(user);
  }

  private toDto(user: User) {
    return plainToClass(UserEntity, user.toJSON());
  }
}
