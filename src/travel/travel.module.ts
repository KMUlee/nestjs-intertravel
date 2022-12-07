import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelsEntity } from 'src/entities/travels.entity';
import { UserEntity } from '../entities/user.entity';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([TravelsEntity]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
