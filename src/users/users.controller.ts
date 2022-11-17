import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { LoginUserDto } from './dto/LoginUserDto.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly userService: UsersService) {}

  @Post('/login')
  async login(@Body() loginData: LoginUserDto): Promise<string> {
    console.log(loginData);
    const { email, password } = loginData;

    return this.userService.login(email, password);
  }

  @Post('/logout')
  async logout(@Body() logoutData) {
    console.log(logoutData);
    //not implement
    return;
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<string> {
    console.log(userId);
    
    return this.userService.testFunction(userId);
  }

  @Post()
  async createUser(@Body() registData: CreateUserDto): Promise<void> {
    console.log(registData);
    const { email, name, password } = registData;
    return this.userService.createUser(name, email, password);
  }
}
