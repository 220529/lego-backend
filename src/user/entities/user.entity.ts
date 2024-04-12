import { Exclude } from 'class-transformer';

// 定义用户实体类
export class UserEntity {
  // 用户名
  username: string;

  // 密码
  @Exclude() // 排除密码属性
  password: string;

  // 电子邮件（可选）
  email?: string;
}
