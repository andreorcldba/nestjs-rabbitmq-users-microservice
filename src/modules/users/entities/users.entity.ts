import { DefaultBaseEntity } from 'src/modules/base/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class Users extends DefaultBaseEntity {
  constructor(partial: Partial<Users>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'varchar', length: 255, nullable: true })
  public name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public password: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  public status: boolean;
}
