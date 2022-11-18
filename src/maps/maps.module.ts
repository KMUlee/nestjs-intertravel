import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mapsController } from './maps.controller';
import { MapsService } from './maps.service';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [mapsController],
    providers: [MapsService],
})
export class MapsModule {}