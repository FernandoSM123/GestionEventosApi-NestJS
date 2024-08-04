import { NestFactory } from '@nestjs/core';
import { SeedersModule } from './seeders.module';
import { SeedersService } from './seeders.service';
import { AppDataSource } from 'data-source';

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    const app = await NestFactory.createApplicationContext(SeedersModule);
    const seeder = app.get(SeedersService);
    await seeder.seed();
    await app.close();
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed!', error);
  } finally {
    await AppDataSource.destroy();
  }
}

bootstrap();
