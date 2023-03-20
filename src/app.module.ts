import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import * as Joi from 'joi';
import { AuthenticationsModule } from './modules/authentications/authentications.module';
import { ProfileModule } from './modules/profile/profile.module';
import { FederalUnitsModule } from './modules/federal_units/federal_units.module';
import { CitiesModule } from './modules/cities/cities.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    UsersModule,
    AuthenticationsModule,
    ProfileModule,
    FederalUnitsModule,
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
