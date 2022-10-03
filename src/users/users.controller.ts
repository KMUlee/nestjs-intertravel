import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { LoginUserDto } from './dto/LoginUserDto.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly userService: UsersService) {}

  @Post('/login')
  async login(@Body() loginData: LoginUserDto, @Res() res) {
    console.log(loginData);
    const { email, password } = loginData;
    this.userService.login(email, password);
    return res.status(200).send();
  }

  @Post('/logout')
  async logout(@Body() logoutData, @Res() res) {
    console.log(logoutData);
    //not implement
    return;
  }

  @Post()
  async createUser(@Body() registData: CreateUserDto): Promise<void> {
    console.log(registData);
    const { email, name, password } = registData;
    return this.userService.createUser(name, email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<void> {
    console.log(userId);
    return;
  }
}
