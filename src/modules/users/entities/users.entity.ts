import { DefaultBaseEntity } from 'src/typeorm-base/entities/base.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

@Entity('users')
export class User extends DefaultBaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public password: string;

  @Index()
  @OneToOne(() => Profile, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  profile: Profile;
}
