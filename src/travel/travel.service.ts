import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { TravelsEntity } from '../entities/travels.entity';
import { DiaryEntity } from '../entities/diary.entity';
import { PicsEntity } from 'src/entities/pics.entity';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private connection: Connection,
    @InjectRepository(TravelsEntity)
    private travelsRepository: Repository<TravelsEntity>,
    @InjectRepository(DiaryEntity)
    private diaryRepository: Repository<DiaryEntity>,
    @InjectRepository(PicsEntity)
    private picsRepository: Repository<PicsEntity>,
    ) {}

  async travelList(usertoken) {
    //not implement
    const user = await this.userRepository.findOneBy({ id: usertoken });
    //const user = await this.userRepository.findOne({where: {id: userToken}});
    if (!user) {
      console.log("throw");
      throw new UnprocessableEntityException('해당 유저가 존재하지 않습니다.');
    } else {
      console.log("pass user");
      const travelList  = await this.travelsRepository.find({where: {userId: user}});
      console.log("travelList ->",travelList);
      const returnBody =[];
      for (const tmp of travelList) {
        returnBody.push(tmp);
      }
      
      console.log("travle Content ->",returnBody);
      return returnBody;
    }
  }

  async getMapsTravelList(userToken:string) {
    const user = await this.userRepository.findOne({where: {id: userToken}, relations: ['travelList']});
    if (!user) {
      throw new UnprocessableEntityException('해당 유저가 존재하지 않습니다.');
    } else {
      const returnBody =[];
      for (const tmp of user.travelList) {
        returnBody.push({
          logitude: tmp.longitude,
          latitude: tmp.latitude,
          travelName: tmp.travelName,
        });
      }
      return returnBody;
    }
  }
  
  async createTravel(
    userToken: string,
    longitude: number,
    latitude: number,
    travelName: string,
    travelBody: string,
    createdAt:string,mainImage:string
  ) {
    const user = await this.userRepository.findOne({ where: { id: userToken}, relations: ['travelList'] });
    if (!user) {
      throw new UnprocessableEntityException('해당 유저가 존재하지 않습니다.');
    } else {
      await this.saveTravelListUsingTransaction(user, travelName,
        longitude,
        latitude,
        travelBody,mainImage,createdAt);
      
    }
  }

  private async saveTravelListUsingTransaction(user: UserEntity,travelName: string,
    longitude: number,
    latitude: number,
    travelBody: string,mainImage:string,createdAt:string) {
    await this.connection.transaction(async (manager) => {
      const travels = new TravelsEntity();
      travels.travelName = travelName;
      travels.longitude = longitude;
      travels.latitude = latitude;
      travels.travelBody = travelBody;
      travels.createdAt = createdAt;

      console.log(user.travelList);
      if (user.travelList === undefined) {
        user.travelList = [travels];
        this.travelsRepository.save(travels);

      } else {
        user.travelList.push(travels);
        this.travelsRepository.save(travels);
      }
      travels.userId=user;
      console.log('After', user.travelList);
      await this.travelsRepository.save(travels);
      await this.userRepository.save(user);
      await manager.save(user);

    });
  }

  
}
