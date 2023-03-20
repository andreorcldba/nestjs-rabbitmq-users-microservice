import { DefaultBaseEntity } from 'src/modules/base/entities/base.entity';
import { City } from 'src/modules/cities/entities/city.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('federal_units')
export class FederalUnit extends DefaultBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  public description: string;

  @Column({ type: 'varchar', length: 3, nullable: false, unique: true })
  public acronym: string;

  @OneToMany(() => City, (city) => city.federalUnit)
  cities: City[];
}
