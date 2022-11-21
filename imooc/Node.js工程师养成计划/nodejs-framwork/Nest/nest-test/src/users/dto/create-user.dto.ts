import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  // 使用 swagger 和 TS 配合进行参数约束说明
  @ApiProperty({description:'邮箱'})
  // TS 约束只读属性
  readonly email:string
  @ApiProperty({description:'密码',default:'123456'})
  password:string
  @ApiProperty({description:'用户名',default:'monica'})
  username:string
}
