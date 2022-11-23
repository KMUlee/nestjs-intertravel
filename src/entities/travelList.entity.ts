import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TravelsEntity } from './travels.entity';
import { UserEntity } from './user.entity';

@Entity('TravelList')
export class TravelListEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: UserEntity;

  @OneToMany(() => TravelsEntity, (travelList) => travelList.travelListId)
  travels: TravelsEntity[];
}
