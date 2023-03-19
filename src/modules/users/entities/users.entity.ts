import { DefaultBaseEntity } from 'src/modules/base/entities/base.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('users')
export class Users extends DefaultBaseEntity {
  constructor(partial: Partial<Users>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public password: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;
}
