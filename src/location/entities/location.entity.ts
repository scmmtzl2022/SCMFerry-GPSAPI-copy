import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { locationDataDto } from '../dto/location-data.dto';
@Entity('locations')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    comment: 'The route unique identifier',
  })
  id: number;
  @Column({ type: 'json'})
  data: locationDataDto;
  @Column()
  imeiNumber: string;
  @Column()
  ferryNumber: string;
  @Column()
  dateTime: string;
  @Column({ type: 'boolean', default: 1 })
  isActive: boolean;
  @Column({ type: 'boolean', default: 0 })
  isFullLimit: boolean;
}
