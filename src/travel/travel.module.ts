import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryEntity } from 'src/entities/diary.entity';
import { TravelsEntity } from 'src/entities/travels.entity';
import { UserEntity } from '../entities/user.entity';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';
import {  PicsEntity } from 'src/entities/pics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([TravelsEntity]),
    TypeOrmModule.forFeature([DiaryEntity]),
    TypeOrmModule.forFeature([PicsEntity]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
