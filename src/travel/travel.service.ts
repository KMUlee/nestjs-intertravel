import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { TravelListEntity } from '../entities/travelList.entity';
import { TravelsEntity } from '../entities/travels.entity';
import { DiaryEntity } from '../entities/diary.entity';

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
    // const user = await this.userRepository.findOneBy({ id: userToken });
    const user = await this.userRepository.findOne({where: {id: userToken}, relations: ['travelList']});
    if (!user) {
      throw new UnprocessableEntityException('해당 유저가 존재하지 않습니다.');
    } else {
      console.log(user.travelList);
      return user.travelList;
    }
  }

  async createTravel(
    userToken: string,
    longitude: number,
    latitude: number,
    travelName: string,
    travelBody: string,
  ) {
    const user = await this.userRepository.findOneBy({ id: userToken });
    if (!user) {
      throw new UnprocessableEntityException('해당 유저가 존재하지 않습니다.');
    } else {
      await this.saveTravelListUsingTransaction(user);
      await this.saveTravelUsingTransaction(
        travelName,
        longitude,
        latitude,
        travelBody,
      );
    }
  }

  private async saveTravelListUsingTransaction(user: UserEntity) {
    await this.connection.transaction(async (manager) => {
      const travelList = new TravelListEntity();
      travelList.userId = user;
      
      console.log(travelList);

      console.log(user.travelList);
      if (user.travelList === undefined) {
        await this.travelListRepository.save(travelList);
        user.travelList = [travelList];
      } else {
        await this.travelListRepository.save(travelList);
        user.travelList.push(travelList);
      }
      console.log('After', user.travelList);
      await manager.save(user);
      
      console.log(travelList.id);
    });
  }

  private async saveTravelUsingTransaction(
    travelName: string,
    longitude: number,
    latitude: number,
    travelBody: string,
  ) {
    await this.connection.transaction(async (manager) => {
      const travels = new TravelsEntity();
      travels.travelName = travelName;
      travels.longitude = longitude;
      travels.latitude = latitude;
      const diary = new DiaryEntity();
      diary.body = travelBody;
      travels.diaris = [diary];
      await this.travelListRepository.save(travels);
      await manager.save(travels);
    });
  }
}
