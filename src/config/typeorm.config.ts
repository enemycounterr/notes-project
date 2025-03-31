import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import UserEntity from 'src/users/entities/user.entity';
config();
console.log("TEST");
console.log(__dirname);

    // "typeorm": "ts-node ./node_modules/typeorm/cli",
    // "migration:run": "npm run typeorm migration:run -- -d ./src/config/typeorm.config.ts",
    // "migration:generate": "npm run typeorm -- -d ./src/config/typeorm.config.ts migration:generate ./src/database/migrations/%npm_config_name%",
    // "migration:create": "npm run typeorm -- migration:create ./src/database/migrations/%npm_config_name%",
    // "migration:revert": "npm run typeorm -- -d ./src/config/typeorm.config.ts migration:revert",

// entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
// migrations: [__dirname + '/../database/migrations/*-migration{.ts,.js}']

const configService = new ConfigService();
//npm run migration:generate --name=init-migration
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