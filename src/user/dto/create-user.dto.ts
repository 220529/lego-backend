import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsEmail,
} from 'class-validator';

// 用户 创建 DTO，定义用于创建的数据传输对象
export class CreateUserDto {
  // 用户名
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 8, {
    message:
      'the name must be between $constraint1 and $constraint2 characters.',
  })
  readonly username: string;

  // 密码
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  // 邮箱（可选）
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;
}
