import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DiaryEntity } from './diary.entity';
import { PicsEntity } from './pics.entity';
import { UserEntity } from './user.entity';

@Entity('Travels')
export class TravelsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 30 })
  travelName: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: UserEntity;

  @OneToMany(() => DiaryEntity, (diary) => diary.travelId)
  diaris: DiaryEntity[];

  @OneToMany(() => PicsEntity, (pic) => pic.travelId)
  pics: PicsEntity[];

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'double' })
  latitude: number;

  @Column({ length: 30 })
  createdAt: string;
}
