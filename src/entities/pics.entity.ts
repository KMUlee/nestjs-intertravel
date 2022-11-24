import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TravelsEntity } from './travels.entity';

@Entity('Pics')
export class PicsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'mediumblob' })
  image: string;

  @ManyToOne(() => TravelsEntity, (travel) => travel.id)
  travelId: TravelsEntity;
}
