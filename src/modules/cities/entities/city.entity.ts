import { Exclude } from 'class-transformer';
import { FederalUnit } from 'src/modules/federal-units/entities/federal-unit.entity';
import { DefaultBaseEntity } from 'src/typeorm-base/entities/base.entity';
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
