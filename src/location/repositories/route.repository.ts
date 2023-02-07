import { EntityRepository, Repository } from 'typeorm';
import { Route } from '../entities/location.entity';

@EntityRepository(Route)
export class RouteRepository extends Repository<Route> {}
