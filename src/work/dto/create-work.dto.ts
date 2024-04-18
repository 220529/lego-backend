import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateWorkDto {
  // 标题
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  // 描述
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly desc: string;

  // 封面图
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly coverImg: string;

  // 内容
  @ApiProperty({ required: false })
  @IsOptional()
  readonly content: { [key: string]: any };

  // 是否是模板
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  readonly isTemplate: boolean;

  // 是否公开
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  readonly isPublic: boolean;
}
