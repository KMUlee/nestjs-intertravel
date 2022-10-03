import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TravelListEntity } from './travelList.entity';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 30 })
  password: string;

  @OneToMany(() => TravelListEntity, (travelList) => travelList.userId)
  travelList: TravelListEntity[];
}
