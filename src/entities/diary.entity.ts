import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TravelListEntity } from './travelList.entity';

@Entity('Diary')
export class DiaryEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 300 })
  body: string;

  @ManyToOne(() => TravelListEntity, (travelList) => travelList.id)
  travelId: TravelListEntity;
}
