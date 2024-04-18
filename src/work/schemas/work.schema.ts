import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

/**
 * 定义作品文档
 */
@Schema({ timestamps: true })
export class Work extends Document {
  // UUID
  @Prop()
  uuid: string;

  // 作者
  @Prop()
  author: string;

  // 用户ID，引用了 User 模型中的 _id
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  // @Prop()
  userId: string; // 指定引用类型

  // 标题
  @Prop()
  title: string;

  // 描述
  @Prop()
  desc: string;

  // 封面图
  @Prop()
  coverImg: string;

  // 内容，混合类型
  @Prop({ type: 'Mixed' })
  content: Record<string, any>;

  // 是否是模板
  @Prop()
  isTemplate: boolean;

  // 是否公开
  @Prop()
  isPublic: boolean;
}

// 创建 Work 模型
export type WorkDocument = Work & Document;

// 创建用户模式
export const WorkSchema = SchemaFactory.createForClass(Work);
