import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { TravelsEntity } from './travels.entity';
import { UserEntity } from './user.entity';

@Entity('TravelList')
export class TravelListEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  travelName: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: UserEntity;

  @OneToMany(() => TravelsEntity, (travelList) => travelList.travelListId)
  travels: TravelsEntity[];
}
