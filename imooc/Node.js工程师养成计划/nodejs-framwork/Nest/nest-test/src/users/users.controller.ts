import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// swagger 标签分类
@ApiTags('用户')
// 使用装饰器修饰类(路由)
@Controller('users')
export class UsersController {
  // 依赖注入的方式，引入 service 
  constructor(private readonly usersService: UsersService) {}
  // 使用装饰器修饰方法，表示使用post 请求(路由)
  @Post('/create')
  // swagger 接口描述
  @ApiOperation({summary:'添加用户'})
  // @Body() 使用装饰器修饰 http 请求体参数
  // : CreateUserDto 使用 TS 进行参数类型约束
  create(@Body() createUserDto: CreateUserDto) {
    // return createUserDto
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
