import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Geolocation } from 'src/contracts/Geolocation';

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
}
