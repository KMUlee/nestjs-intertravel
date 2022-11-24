import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryEntity } from 'src/entities/diary.entity';
import { TravelListEntity } from 'src/entities/travelList.entity';
import { TravelsEntity } from 'src/entities/travels.entity';
import { UserEntity } from '../entities/user.entity';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([TravelListEntity]),
    TypeOrmModule.forFeature([TravelsEntity]),
    TypeOrmModule.forFeature([DiaryEntity]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
