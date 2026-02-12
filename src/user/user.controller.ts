import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRo } from './dto/user.ro';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: `Create user` })
  @ApiCreatedResponse({ type: UserRo })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserRo> {
    return this.userService.createUser(createUserDto);
  }

  @Get('find')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: `Get all users` })
  @ApiCreatedResponse({ type: [UserRo] })
  async getAllUsers(): Promise<UserRo[]> {
    return this.userService.getAllUsers();
  }

  @Get('find/byId:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: `Get user by id` })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiCreatedResponse({ type: UserRo })
  async getUserById(@Param('id') id: string): Promise<UserRo> {
    return this.userService.getUserById(id);
  }

  @Delete('delete:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: `Delete user by id` })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  async deleteUserById(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
