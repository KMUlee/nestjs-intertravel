import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DiaryEntity } from './diary.entity';
import { PicsEntity } from './pics.entity';
import { TravelListEntity } from './travelList.entity';

@Entity('Travels')
export class TravelsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  travelName: string;

  @ManyToOne(() => TravelListEntity, (travelList) => travelList.id)
  travelListId: TravelListEntity;

  @OneToMany(() => DiaryEntity, (diary) => diary.travelId)
  diaris: DiaryEntity[];

  @OneToMany(() => PicsEntity, (pic) => pic.travelId)
  pics: PicsEntity[];

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'double' })
  latitude: number;
}
