import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Diary')
export class DiaryEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 300 })
  body: string;
}
