import { Exclude } from 'class-transformer';
import { DefaultBaseEntity } from 'src/modules/base/entities/base.entity';
import { FederalUnit } from 'src/modules/federal_units/entities/federal_unit.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('cities')
export class City extends DefaultBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  public description: string;

  @Column({ type: 'varchar', length: 3, nullable: false, unique: true })
  public acronym: string;

  @Column({ type: 'integer', nullable: false, unique: false })
  public federalUnitId: number;

  @ManyToOne(() => FederalUnit, (federalUnit) => federalUnit.cities)
  federalUnit: FederalUnit;
}
