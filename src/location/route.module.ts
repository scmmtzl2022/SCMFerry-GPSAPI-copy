import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  exports: [RouteService],
  providers: [RouteService],
  controllers: [RouteController],
})
export class RouteModule {}
