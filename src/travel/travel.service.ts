import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { UserEntity } from '../entities/user.entity';
import { TravelListEntity } from '../entities/travelList.entity';
import { TravelsEntity } from 'src/entities/travels.entity';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TravelListEntity)
    private travelListRepository: Repository<TravelListEntity>,
    private connection: Connection,
  ) {}

  async travelList(userToken: string) {
    //not implement
    const user = await this.userRepository.findOneBy({ id: userToken });
    if (!user) {
      throw new UnprocessableEntityException('해당 유저가 존재하지 않습니다.');
    } else {
      return user.travelList;
    }
  }
}
