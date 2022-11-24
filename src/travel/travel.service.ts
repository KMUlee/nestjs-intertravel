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

  async travelList(userToken: string) {
    //not implement
    // const user = await this.userRepository.findOneBy({ id: userToken });
    const user = await this.userRepository.findOne({where: {id: userToken}, relations: ['travelList']});
    if (!user) {
      throw new UnprocessableEntityException('해당 유저가 존재하지 않습니다.');
    } else {
      console.log("travle List ->",user.travelList);
      
      const travelList  = await this.userRepository.find({relations: ['travels']});
      console.log("travelList ->",travelList);
      const returnBody =[];
      for (const tmp of travelList) {
        const travelContent = await this.travelsRepository.findOne({where: {id: tmp.id}, relations: ['diaris']});
        returnBody.push(travelContent);
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
      const travelOne  = await this.userRepository.find({relations: ['travels']});
      const returnBody =[];
      for (const tmp of travelOne) {
        returnBody.push([]);
      }
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
    const user = await this.userRepository.findOneBy({ id: userToken });
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
      
      const pics = new PicsEntity();
      pics.image = mainImage;
      
      
      const travels = new TravelsEntity();
      travels.travelName = travelName;
      travels.longitude = longitude;
      travels.latitude = latitude;
      const diary = new DiaryEntity();
      diary.body = travelBody;
      travels.diaris = [diary];
      diary.travelId = travels;
      pics.travelId = travels;
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
      await manager.save(user);
      await this.travelsRepository.save(travels);
      await this.diaryRepository.save(diary);
      await this.picsRepository.save(pics);
    });
  }

  
}
