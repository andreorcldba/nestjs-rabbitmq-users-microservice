import { DefaultBaseEntity } from 'src/typeorm-base/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('profiles')
export class Profile extends DefaultBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  public firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public lastName: string;

  @Column({ type: 'integer', nullable: false })
  public age: number;
}
