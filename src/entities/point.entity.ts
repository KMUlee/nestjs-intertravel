import { Column, Double, Entity, PrimaryColumn } from 'typeorm';

@Entity('Point')
export class PointEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'double' })
  latitude: number;
}
