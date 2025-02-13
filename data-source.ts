import 'dotenv/config';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // Usando __dirname para asegurarte de que las rutas sean correctas en cualquier entorno
  entities: [join(__dirname, 'src/modules/**/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
  synchronize: false,
});
