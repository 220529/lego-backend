import { Exclude } from 'class-transformer';

/**
 * 定义用户实体类
 * 只需添加需要处理的字段
 */
export class UserEntity {
  // 密码
  @Exclude() // 排除密码属性
  password: string;

  @Exclude()
  __v: number;
}
