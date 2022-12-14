import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateLibrayDto } from './dto/CreateLibrayDto.dto';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { LoginUserDto } from './dto/LoginUserDto.dto';
import { UserTokenDto } from './dto/UserTokenDto.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(readonly userService: UsersService) {}

  @Post('/login')
  async login(@Body() loginData: LoginUserDto): Promise<object> {
    console.log('users/login Post ->', loginData);
    const { email, password } = loginData;

    return this.userService.login(email, password);
  }

  @Post('/logout')
  async logout(@Body() logoutData) {
    console.log('users/logout Post ->', logoutData);
    //not implement
    return;
  }

  @Get(':id')
  async getUserInfo(@Param('id') email: string): Promise<string> {
    console.log('users/ Get ->', email);

    return this.userService.testFunction(email);
  }

  @Post('/diary')
  async listDiary(@Body() userData: UserTokenDto) {
    console.log('users/diary Post ->', userData);
    const { userToken } = userData;

    //not implement
    return this.userService.travelList(userToken);
  }

  @Get()
  async getProfile() {
    return this.userService.getProfile();
  }

  @Post()
  async createUser(@Body() registData: CreateUserDto): Promise<object> {
    console.log('users/ Post -> ', registData);
    const { email, name, password } = registData;
    return this.userService.createUser(name, email, password);
  }

  @Post('/userpage')
  async getUserPage(@Body() userData: UserTokenDto):Promise<object> {
    console.log('users/userpage Post ->', userData);
    const { userToken } = userData;

    //not implement
    return this.userService.getUserPage(userToken);
  }
}
