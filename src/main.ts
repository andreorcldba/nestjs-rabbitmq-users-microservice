import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const environments = {
    rabbitMqUser: configService.get('RABBITMQ_USER'),
    rabbitMqPassword: configService.get('RABBITMQ_PASSWORD'),
    rabbitMqHost: configService.get('RABBITMQ_HOST'),
    rabbitMqPort: configService.get('RABBITMQ_PORT'),
    queueName: configService.get('RABBITMQ_QUEUE_NAME'),
    port: configService.get('PORT'),
  };

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${environments.rabbitMqUser}:${environments.rabbitMqPassword}@${environments.rabbitMqHost}:${environments.rabbitMqPort}`,
      ],
      queue: environments.queueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(environments.port, () => {
    console.log(`Users microservice running on port ${environments.port}`);
  });
}
bootstrap();
