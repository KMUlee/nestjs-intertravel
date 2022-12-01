import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Travels')
export class TravelsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 30 })
  travelName: string;

  @Column()
  travelBody: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: UserEntity;

  @Column()
  image: string;

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'double' })
  latitude: number;

  @Column({ length: 30 })
  createdAt: string;
}
