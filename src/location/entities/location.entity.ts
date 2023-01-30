import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('locations')
export class Location extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  data: Object;
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
