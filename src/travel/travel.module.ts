import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
