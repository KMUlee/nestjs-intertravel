import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TravelListEntity } from 'src/entities/travelList.entity';
import { CreateLibrayDto } from './dto/CreateLibrayDto.dto';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { LoginUserDto } from './dto/LoginUserDto.dto';
import { UserTokenDto } from './dto/UserTokenDto.dto';
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
  async getUserInfo(@Param('id') email: string): Promise<string> {
    console.log(email);

    return this.userService.testFunction(email);
  }

  @Post('/diary')
  async listDiary(@Body() userData: UserTokenDto) {
    console.log(userData);
    const { token } = userData;

    //not implement
    return this.userService.travelList(token);
  }

  @Get()
  async getProfile() {
    return this.userService.getProfile();
  }

  @Post()
  async createUser(@Body() registData: CreateUserDto): Promise<void> {
    console.log(registData);
    const { email, name, password } = registData;
    return this.userService.createUser(name, email, password);
  }
}
