import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from 'src/modules/users/entities/users.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { FederalUnit } from 'src/modules/federal_units/entities/federal_unit.entity';
import { City } from 'src/modules/cities/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Users, Profile, FederalUnit, City],
        synchronize: true,
        migrations: [],
        migrationsTableName: 'migrations',
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
