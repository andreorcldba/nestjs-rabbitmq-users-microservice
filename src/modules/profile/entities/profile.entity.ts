import { DefaultBaseEntity } from 'src/modules/base/entities/base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity('profiles')
export class Profile extends DefaultBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  public description: string;
}
