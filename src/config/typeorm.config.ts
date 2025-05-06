import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import UserEntity from 'src/users/entities/user.entity';
config();
console.log("TEST");
console.log(__dirname);


const configService = new ConfigService();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: parseInt(configService.get<string>('POSTGRES_PORT')!, 5432),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  synchronize: false,
  // entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  // migrations: [__dirname + '/../database/migrations/*-migration{.ts,.js}'],
  entities: [
    'dist/**/**/*.entity{.ts,.js}'
    // UserEntity
  ],
  migrations: [
    // __dirname + '/../database/migrations/*-migration{.ts,.js}'
    'dist/database/migrations/*-migration{.ts,.js}'
  ],
  migrationsRun: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false, // if using a self-signed certificate or untrusted certs
  }
  
});

export default AppDataSource;