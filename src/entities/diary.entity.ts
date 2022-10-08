import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { TravelsEntity } from './travels.entity';

@Entity('Diary')
export class DiaryEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 300 })
  body: string;

  @ManyToOne(() => TravelsEntity, (travel) => travel.id)
  travelId: TravelsEntity;
}
