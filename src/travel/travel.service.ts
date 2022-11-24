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
    @InjectRepository(TravelsEntity)
    private travelsRepository: Repository<TravelsEntity>,
    @InjectRepository(DiaryEntity)
    private diaryRepository: Repository<DiaryEntity>,
    ) {}

  async travelList(userToken: string) {
    //not implement
    // const user = await this.userRepository.findOneBy({ id: userToken });
    const user = await this.userRepository.findOne({where: {id: userToken}, relations: ['travelList']});
    if (!user) {
      throw new UnprocessableEntityException('해당 유저가 존재하지 않습니다.');
    } else {
      console.log("travle List ->",user.travelList);
      
      const travelOne  = await this.travelListRepository.find({relations: ['travels']});
      console.log("travle One ->",travelOne);
      const travelContent = await this.travelsRepository.findOne({where: {id: travelOne[0].id}, relations: ['diaris']});
      console.log("travle Content ->",travelContent);
      return travelContent;
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
      await this.saveTravelListUsingTransaction(user, travelName,
        longitude,
        latitude,
        travelBody);
      
    }
  }

  private async saveTravelListUsingTransaction(user: UserEntity,travelName: string,
    longitude: number,
    latitude: number,
    travelBody: string,) {
    await this.connection.transaction(async (manager) => {
      const travelList = new TravelListEntity();
      travelList.userId = user;
      
      const travels = new TravelsEntity();
      travels.travelName = travelName;
      travels.longitude = longitude;
      travels.latitude = latitude;
      travels.travelListId = travelList;
      const diary = new DiaryEntity();
      diary.body = travelBody;
      travels.diaris = [diary];
      diary.travelId = travels;
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
      await this.travelListRepository.save(travelList);
      await this.travelsRepository.save(travels);
      await this.diaryRepository.save(diary);
      
      console.log(travelList.id);
    });
  }


}
