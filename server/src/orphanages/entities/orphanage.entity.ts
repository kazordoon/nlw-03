import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Geolocation } from '../../contracts/Geolocation';
import { Image } from './image.entity';

@Entity({ name: 'orphanages' })
export class Orphanage {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'point' })
  public geolocation: Geolocation | string;

  @Column()
  public about: string;

  @Column()
  public instructions: string;

  @Column()
  public open_on_weekends: boolean;

  @Column()
  public opening_hours: string;

  @OneToMany(
    () => Image,
    image => image.orphanage,
    { cascade: ['insert', 'update'], eager: true },
  )
  @JoinColumn({ name: 'orphanage_id' })
  public images: Image[];
}
