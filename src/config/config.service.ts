import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';

require('dotenv').config();

class ConfigService {
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: process.env['POSTGRES_HOST'],
      port: parseInt(process.env['POSTGRES_PORT']),
      username: process.env['POSTGRES_USER'],
      password: process.env['POSTGRES_PASSWORD'],
      database: process.env['POSTGRES_DATABASE'],

      entities: [UserEntity],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      synchronize: true,
    };
  }
}

const configService = new ConfigService()

export { configService };