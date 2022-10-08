import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { TravelsEntity } from './travels.entity';

@Entity('Pics')
export class PicsEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'mediumblob' })
  image: string;

  @ManyToOne(() => TravelsEntity, (travel) => travel.id)
  travelId: TravelsEntity;
}
