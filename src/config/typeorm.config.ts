import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Location } from 'src/location/entities/location.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      useNewUrlParser: true,
      database: 'gps',
      entities: [Location],
      ssl: true,
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
      useUnifiedTopology: true,
    };
  },
};
