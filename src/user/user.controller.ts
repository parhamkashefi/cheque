import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRo } from './dto/user.ro';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  @ApiOperation({ summary: `Create user` })
  @ApiCreatedResponse({ type: UserRo })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserRo> {
    return this.userService.createUser(createUserDto);
  }

  @Get("all")
  @ApiOperation({ summary: `Get all users` })
  @ApiCreatedResponse({ type: [UserRo] })
  async getAllUsers(): Promise<UserRo[]> {
    return this.userService.getAllUser();
  }

  @Get(':id')
  @ApiOperation({ summary: `Get user by id` })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiCreatedResponse({ type: UserRo })
  async getUserById(@Param('id') id: string): Promise<UserRo> {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete user by id` })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  async deleteUserById(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
