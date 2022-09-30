import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Pics')
export class PicsEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'mediumblob' })
  image: string;
}
