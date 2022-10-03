import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { DiaryEntity } from './diary.entity';
import { PicsEntity } from './pics.entity';
import { UserEntity } from './user.entity';

@Entity('TravelList')
export class TravelListEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  travelName: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: UserEntity;

  @OneToMany(() => DiaryEntity, (diary) => diary.travelId)
  diaries: DiaryEntity[];

  @OneToMany(() => PicsEntity, (pics) => pics.travelId)
  pics: PicsEntity[];

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'double' })
  latitude: number;
}
