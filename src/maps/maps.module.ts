import { Module } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mapsController } from './maps.controller';
import { MapsService } from './maps.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [mapsController],
    providers: [MapsService],
})
export class MapsModule {}