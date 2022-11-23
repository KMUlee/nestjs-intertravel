import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private connection: Connection,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);

    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입하실 수 없습니다.',
      );
    }
    await this.saveUserUsingTransaction(name, email, password);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ email: emailAddress });

    return user !== null;
  }

  private async saveUserUsingTransaction(
    name: string,
    email: string,
    password: string,
  ) {
    await this.connection.transaction(async (manager) => {
      const user = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.travelList = [];

      await manager.save(user);
    });
  }

  async travelList(userToken: string) {
    //not implement
    const user = await this.usersRepository.findOneBy({ id: userToken });
    console.log('travel list -> ', user.travelList);

    return user.travelList;
  }

  async testFunction(email: string): Promise<string> {
    const user = await this.usersRepository.findOneBy({ email: email });
    if (!user) {
      throw new UnprocessableEntityException('해당 유저를 찾을 수 없습니다.');
    } else {
      return user.id;
    }
  }

  async login(emailAddress: string, password: string): Promise<string> {
    const userExist = await this.checkUserExists(emailAddress);
    if (!userExist) {
      throw new UnprocessableEntityException('해당 이메일을 찾을 수 없습니다.');
    }
    const userLogin = await this.usersRepository.findOneBy({
      email: emailAddress,
      password: password,
    });
    if (!userLogin) {
      throw new UnprocessableEntityException('비밀번호를 다시 확인하십시오');
    }

    return userLogin.id;
  }

  async getProfile() {
    return this.connection.query('select id, name, email from User');
  }
}
