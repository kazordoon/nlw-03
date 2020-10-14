import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orphanage } from './orphanage.entity';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public path: string;

  @ManyToOne(
    () => Orphanage,
    orphanage => orphanage.images,
    { cascade: ['insert', 'update'] },
  )
  @JoinColumn({ name: 'orphanage_id' })
  public orphanage: Orphanage;
}
