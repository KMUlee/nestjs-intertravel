import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TravelListEntity } from './travelList.entity';

@Entity('Pics')
export class PicsEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'mediumblob' })
  image: string;

  @ManyToOne(() => TravelListEntity, (travelList) => travelList.id)
  travelId: TravelListEntity;
}
