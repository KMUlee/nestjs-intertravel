import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TravelsEntity } from './travels.entity';

@Entity('Diary')
export class DiaryEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 300 })
  body: string;

  @ManyToOne(() => TravelsEntity, (travel) => travel.id)
  travelId: TravelsEntity;
}
