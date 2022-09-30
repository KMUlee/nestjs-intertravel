import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TravelList')
export class TravelListEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  travelName: string;
}
